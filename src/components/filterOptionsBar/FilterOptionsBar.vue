<template>
  <div>
    <h6 v-if="title" class="m-0">
      <strong>
        {{ title }}
      </strong>
    </h6>
    <div class="options">
      <div class="options__left">
        <div class="options__item" v-for="(opt, i) of options" :key="i">
          <!-- # label(s) -->
          <div class="top-label">
            {{ opt.label }}
          </div>
          <div v-if="opt.type === DATE">
            <date-picker
              :input-class="{
                'form-control': true,
                'date-input': true,
              }"
              :value="filterInputs[opt.name]"
              :placeholder="opt.label"
              value-type="format"
              format="YYYY-MM-DD"
              @change="
                (value) => {
                  onInputChange(opt, value);
                }
              "
            ></date-picker>
          </div>
          <div v-else-if="opt.type === DATE_RANGE">
            <date-picker
              :input-class="{
                'form-control': true,
                'date-input': true,
              }"
              :value="filterInputs[opt.name]"
              :placeholder="opt.label"
              value-type="format"
              format="YYYY-MM-DD"
              range
              @change="
                (value) => {
                  onInputChange(opt, value);
                }
              "
            ></date-picker>
          </div>
          <div
            v-else
            class="box btn btn-sm w-100"
            :class="{
              'is-active': activeFilterName === opt.name,
              'is-valid': isFilterFieldValid(opt) && activeFilterName !== opt.name,
            }"
            @click="setActiveFilterName(opt)"
          >
            <!-- DYNAMIC_INPUT label -->
            <template v-if="opt.type === DYNAMIC_INPUT && filterInputs[opt.name]">
              <b>
                {{ filterInputs[opt.name] }}
              </b>
            </template>
            <!-- end of DYNAMIC_INPUT label -->

            <!-- DYNAMIC_MULTIPLE_INPUT label -->
            <template v-else-if="opt.type === DYNAMIC_MULTIPLE_INPUT">
              <span class="text-muted">
                {{ opt.label }}
              </span>
              <span v-if="getInsertedMultipleInputsCount(opt.name) > 0" class="ml-1">
                <b>({{ getInsertedMultipleInputsCount(opt.name) }})</b>
              </span>
            </template>
            <!-- end of DYNAMIC_MULTIPLE_INPUT label -->

            <!-- SINGLE OPTION -->
            <template v-else-if="opt.type === SINGLE_OPTION">
              <template v-if="selectedFilterResults[opt.name]">
                <span class="text-success">
                  {{ selectedFilterResults[opt.name].label }}
                </span>
              </template>
              <template v-else>
                <span class="text-muted">
                  {{ opt.label }}
                </span>
              </template>
            </template>
            <!-- end of SINGLE OPTION -->

            <template v-else>
              <span class="text-muted">
                {{ opt.label }}
              </span>
            </template>

            <!-- additional label badge(s) -->
            <span
              v-if="
                [DYNAMIC_OPTIONS, STATIC_OPTIONS].indexOf(opt.type) >= 0 &&
                getSelectedFilterItemsCount(opt.name) > 0
              "
              class="ml-1"
            >
              <b>({{ getSelectedFilterItemsCount(opt.name) }})</b>
            </span>
            <template
              v-if="
                activeFilterName !== opt.name &&
                ((opt.type === CHECKBOX && selectedFilterResults[opt.name] === true) ||
                  (opt.type === DYNAMIC_INPUT && filterInputs[opt.name]))
              "
              class="ml-1"
            >
              <b-icon icon="check"></b-icon>
            </template>
            <!-- end of additional label badge(s) -->
          </div>
          <!-- # end of label(s) -->

          <!-- # dropdown(s) -->
          <!-- DYNAMIC_OPTIONS dropdown -->
          <div
            class="dropdown"
            v-if="activeFilterName === opt.name && opt.type === DYNAMIC_OPTIONS"
          >
            <div class="dropdown__input d-flex align-item-center">
              <input
                :ref="'dropdownInput'"
                type="text"
                @input="onDebounceInputChange(opt, $event.target.value)"
                class="form-control"
                :placeholder="`Type in ${opt.label}`"
                :value="filterInputs[opt.name]"
              />
              <button
                class="btn btn-sm btn-outline-danger ml-2 px-2"
                @click="clearSelectedFilterItems(opt.name)"
                :disabled="getSelectedFilterItemsCount(opt.name) === 0 && !filterInputs[opt.name]"
              >
                Reset
              </button>
            </div>

            <div class="dropdown__selected-pageSize" v-if="getSelectedFilterItemsCount(opt.name) > 0">
              <span
                v-for="(item, key, idx) of selectedFilterResults[opt.name]"
                :key="idx"
                class="badge badge-success selected-pageSize-item"
                @click="removeSelectedFilterItem(opt.name, key)"
              >
                <slot name="selected-item" v-bind="{ opt, item, idx, key }" />
              </span>
            </div>

            <div class="dropdown__pageSize">
              <template v-if="filterFetchingState[opt.name]">
                <div class="my-4 text-center">
                  <div class="spinner-border text-danger text-center mb-3" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  <h6 class="text-muted">Please Wait...</h6>
                </div>
              </template>
              <template v-else-if="getFilterItemsCount(opt.name) === 0">
                <div class="text-center my-4">
                  <h6 class="text-muted">No {{ opt.label }} Found...</h6>
                </div>
              </template>
              <ol v-else>
                <li v-for="(item, idx) of filterResults[opt.name]" :key="idx">
                  <label
                    :class="{
                      selected: selectedFilterResults[opt.name]
                        ? selectedFilterResults[opt.name][item.id || item._id]
                        : false,
                    }"
                    class="d-flex align-items-center"
                    @click="addSelectedFilterItem(opt.name, item)"
                  >
                    <slot name="item" v-bind="{ opt, item, idx }" />
                  </label>
                </li>
              </ol>
            </div>
          </div>
          <!-- end of DYNAMIC_OPTIONS dropdown -->

          <!-- SINGLE_OPTION dropdown -->
          <div
            class="dropdown dropdown__single-option"
            v-if="activeFilterName === opt.name && opt.type === SINGLE_OPTION"
          >
            <div class="dropdown__pageSize mt-0">
              <ol>
                <li v-for="(item, idx) of opt.options" :key="idx">
                  <label
                    :class="{
                      selected:
                        selectedFilterResults[opt.name] &&
                        selectedFilterResults[opt.name].value === item.value,
                      'm-0': idx === opt.options.length - 1,
                    }"
                    class="d-flex align-items-center justify-content-between"
                    @click="selectSingleOption(opt.name, item)"
                  >
                    <slot name="item" v-bind="{ opt, item, idx }" />
                    <b-icon
                      @click.stop="clearSingleOption(opt.name)"
                      class="single-option-clear-btn"
                      icon="x"
                      v-if="
                        selectedFilterResults[opt.name] &&
                        selectedFilterResults[opt.name].value === item.value
                      "
                    >
                    </b-icon>
                  </label>
                </li>
              </ol>
            </div>
          </div>
          <!-- end of SINGLE_OPTION dropdown -->

          <!-- STATIC_OPTIONS dropdown -->
          <div
            class="dropdown dropdown__static-options"
            v-if="activeFilterName === opt.name && opt.type === STATIC_OPTIONS"
          >
            <div
              class="dropdown__selected-pageSize mt-0 mb-2"
              v-if="getSelectedFilterItemsCount(opt.name) > 0"
            >
              <span
                v-for="(item, key, idx) of selectedFilterResults[opt.name]"
                :key="idx"
                class="badge badge-success selected-pageSize-item"
                @click="removeSelectedFilterItem(opt.name, key)"
              >
                <slot name="selected-item" v-bind="{ opt, item, idx, key }" />
              </span>
            </div>
            <div class="dropdown__pageSize mt-0">
              <ol>
                <li v-for="(item, idx) of opt.options" :key="idx">
                  <label
                    :class="{
                      selected: selectedFilterResults[opt.name]
                        ? selectedFilterResults[opt.name][item.id]
                        : false,
                      'm-0': idx === opt.options.length - 1,
                    }"
                    class="d-flex align-items-center"
                    @click="addSelectedFilterItem(opt.name, item)"
                  >
                    <slot name="item" v-bind="{ opt, item, idx }" />
                  </label>
                </li>
              </ol>
            </div>
          </div>
          <!-- end of STATIC_OPTIONS dropdown -->

          <!-- DYNAMIC_INPUT dropdown -->
          <div class="dropdown" v-if="activeFilterName === opt.name && opt.type === DYNAMIC_INPUT">
            <div class="dropdown__input d-flex align-item-center">
              <input
                :ref="'dropdownInput'"
                type="text"
                @input="onInputChange(opt, $event.target.value)"
                class="form-control"
                :placeholder="`Type in ${opt.label}`"
                :value="filterInputs[opt.name]"
              />
              <button
                class="btn btn-sm btn-outline-danger ml-2 px-2"
                @click="clearSelectedFilterItems(opt.name)"
              >
                Clear
              </button>
            </div>
          </div>
          <!-- end of DYNAMIC_INPUT dropdown -->

          <!-- DYNAMIC_MULTIPLE_INPUT dropdown -->
          <div
            class="dropdown"
            v-if="activeFilterName === opt.name && opt.type === DYNAMIC_MULTIPLE_INPUT"
          >
            <div class="dropdown__input d-flex align-item-center">
              <input
                :ref="'dropdownInput'"
                type="text"
                @input="onInputChange(opt, $event.target.value)"
                class="form-control"
                :placeholder="`Type in ${opt.label}`"
                :value="filterInputs[opt.name]"
              />
              <button
                class="btn btn-sm btn-info ml-2 px-3"
                @click="addToInsertedMultipleInputs(opt.name)"
                :style="{
                  fontSize: '1rem',
                }"
              >
                <b-icon icon="plus"></b-icon>
              </button>
              <button
                class="btn btn-sm btn-outline-danger ml-2 px-2"
                @click="clearInsertedMultipleInputs(opt.name)"
              >
                Clear
              </button>
            </div>
            <div
              class="dropdown__selected-pageSize"
              v-if="getInsertedMultipleInputsCount(opt.name) > 0"
            >
              <span
                v-for="(item, key, idx) of insertedMultipleInputs[opt.name]"
                :key="idx"
                class="badge badge-success selected-pageSize-item"
                @click="removeInsertedMultipleInput(opt.name, key)"
              >
                <slot name="selected-item" v-bind="{ opt, item, idx, key }" />
              </span>
            </div>
          </div>
          <!-- end of DYNAMIC_MULTIPLE_INPUT dropdown -->
          <!-- # end of dropdown(s) -->
        </div>
        <div class="options__item">
          <slot name="trailing-items" />
        </div>
      </div>
      <div class="options__right">
        <slot name="right-items" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import debounce from 'debounce';
import {
  FilterTypes,
  FilterResultItem,
  SelectedFilterResults,
  SelectedFilterResultItem,
} from '@/types/filterOptions.types';

export default Vue.extend({
  name: 'FilterOptionsBar',
  props: {
    options: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: () => '',
    },
  },
  data(): {
    CHECKBOX: FilterTypes;
    DYNAMIC_INPUT: FilterTypes;
    DYNAMIC_OPTIONS: FilterTypes;
    DYNAMIC_MULTIPLE_INPUT: FilterTypes;
    STATIC_OPTIONS: FilterTypes;
    SINGLE_OPTION: FilterTypes;
    DATE: FilterTypes;
    DATE_RANGE: FilterTypes;
  } {
    return {
      CHECKBOX: 'CHECKBOX',
      DYNAMIC_INPUT: 'DYNAMIC_INPUT',
      DYNAMIC_OPTIONS: 'DYNAMIC_OPTIONS',
      DYNAMIC_MULTIPLE_INPUT: 'DYNAMIC_MULTIPLE_INPUT',
      STATIC_OPTIONS: 'STATIC_OPTIONS',
      SINGLE_OPTION: 'SINGLE_OPTION',
      DATE: 'DATE',
      DATE_RANGE: 'DATE_RANGE',
    };
  },
  computed: {
    ...mapState({
      searchParams: (state: any) => state.filterOptions.searchParams,
      activeFilterName: (state: any) => state.filterOptions.activeFilterName,
      filterInputs: (state: any) => state.filterOptions.filterInputs,
      filterFetchingState: (state: any) => state.filterOptions.filterFetchingState,
      filterResults: (state: any) => state.filterOptions.filterResults,
      selectedFilterResults: (state: any) => state.filterOptions.selectedFilterResults,
      insertedMultipleInputs: (state: any) => state.filterOptions.insertedMultipleInputs,
    }),
    ...mapGetters({
      getFilterItemsCount: 'filterOptions/getFilterItemsCount',
      getSelectedFilterItemsCount: 'filterOptions/getSelectedFilterItemsCount',
      getInsertedMultipleInputsCount: 'filterOptions/getInsertedMultipleInputsCount',
    }),
  },
  methods: {
    setActiveFilterName(opt: any) {
      const self = this as any;

      if (opt.type === self.CHECKBOX) {
        self.SET_SELECTED_FILTER_RESULTS({
          ...self.selectedFilterResults,
          [opt.name]: Object.prototype.hasOwnProperty.call(self.selectedFilterResults, opt.name)
            ? !self.selectedFilterResults[opt.name]
            : true,
        });
      }

      if (opt.type === self.DYNAMIC_OPTIONS) {
        // if (!self.filterResults[opt.name]) return undefined;
        this.SET_ACTIVE_FILTER_NAME(opt.name);
      }

      if (
        [
          self.STATIC_OPTIONS,
          self.DYNAMIC_INPUT,
          self.DYNAMIC_MULTIPLE_INPUT,
          self.SINGLE_OPTION,
        ].indexOf(opt.type) >= 0
      ) {
        this.SET_ACTIVE_FILTER_NAME(opt.name);
      }

      if (
        [self.DYNAMIC_OPTIONS, self.DYNAMIC_INPUT, self.DYNAMIC_MULTIPLE_INPUT].indexOf(opt.type) >=
        0
      ) {
        self.$nextTick(() => {
          if (opt.name) {
            self.$refs.dropdownInput[0].focus();
          }
        });
      }
    },
    addSelectedFilterItem(name: string, item: FilterResultItem) {
      const self = this as any;
      self.ADD_SELECTED_FILTER_ITEM({
        name,
        item,
      });
      self.$emit('onAddSelectedFilterItem', name, item);
    },
    removeSelectedFilterItem(name: string, itemId: string | number) {
      const self = this as any;
      self.REMOVE_SELECTED_FILTER_ITEM({
        name,
        itemId: String(itemId),
      });
      self.$emit('onRemoveSelectedFilterItem', name, itemId);
    },
    clearSelectedFilterItems(name: string) {
      const self = this as any;
      self.CLEAR_SELECTED_FILTER_ITEMS_BY_NAME(name);
      self.SET_FILTER_INPUTS_BY_NAME({
        name,
        value: '',
      });
      self.SET_ACTIVE_FILTER_NAME('');
      self.$emit('onClearSelectedFilterItems', name);
    },
    onDebounceInputChange: debounce(function exec(this: any, opt: any, value: string) {
      const self = this as any;
      self.SET_FILTER_INPUTS_BY_NAME({
        name: opt.name,
        value: value ? value.trim() : value,
      });
      self.$emit('onDebounceInputChange', opt, value);
    }, 500),
    onInputChange(opt: any, value: string) {
      const self = this as any;
      self.SET_FILTER_INPUTS_BY_NAME({
        name: opt.name,
        value,
      });
      self.$emit('onInputChange', opt, value);
    },
    isFilterFieldValid(opt: any) {
      const self = this as any;
      return (
        ([self.DYNAMIC_OPTIONS, self.STATIC_OPTIONS].indexOf(opt.type) >= 0 &&
          self.getSelectedFilterItemsCount(opt.name) > 0) ||
        (self.DYNAMIC_MULTIPLE_INPUT && self.getInsertedMultipleInputsCount(opt.name) > 0) ||
        (opt.type === self.CHECKBOX && self.selectedFilterResults[opt.name] === true) ||
        (opt.type === self.DYNAMIC_INPUT && self.filterInputs[opt.name]) ||
        (opt.type === self.SINGLE_OPTION && self.selectedFilterResults[opt.name])
      );
    },
    addToInsertedMultipleInputs(name: string) {
      const self = this as any;
      const value = self.filterInputs[name].trim();
      if (value) {
        self.ADD_TO_INSERTED_MULTIPLE_INPUTS({
          name,
          itemId: Date.now().toString(),
          value,
        });
        self.SET_FILTER_INPUTS_BY_NAME({
          name,
          value: '',
        });
      }
      self.$nextTick(() => {
        self.$refs.dropdownInput[0].focus();
      });
    },
    removeInsertedMultipleInput(name: string, itemId: string | number) {
      const self = this as any;
      self.REMOVE_INSERTED_MULTIPLE_INPUT({
        name,
        itemId: String(itemId),
      });
      self.$emit('onRemoveInsertedMultipleInput', name, itemId);
    },
    clearInsertedMultipleInputs(name: string) {
      const self = this as any;
      self.CLEAR_INSERTED_MULTIPLE_INPUTS_BY_NAME(name);
      self.SET_FILTER_INPUTS_BY_NAME({
        name,
        value: '',
      });
      self.SET_ACTIVE_FILTER_NAME('');
      self.$emit('onClearInsertedMultipleInputs', name);
    },
    selectSingleOption(name: string, item: any) {
      const self = this as any;
      self.SET_SELECTED_FILTER_RESULTS({
        ...self.selectedFilterResults,
        [name]: item,
      });
      self.SET_ACTIVE_FILTER_NAME('');
    },
    clearSingleOption(name: string) {
      const self = this as any;
      self.CLEAR_SELECTED_FILTER_ITEMS_BY_NAME(name);
      self.SET_ACTIVE_FILTER_NAME('');
    },
    ...mapMutations({
      SET_ACTIVE_FILTER_NAME: 'filterOptions/SET_ACTIVE_FILTER_NAME',
      ADD_SELECTED_FILTER_ITEM: 'filterOptions/ADD_SELECTED_FILTER_ITEM',
      REMOVE_SELECTED_FILTER_ITEM: 'filterOptions/REMOVE_SELECTED_FILTER_ITEM',
      SET_SELECTED_FILTER_RESULTS: 'filterOptions/SET_SELECTED_FILTER_RESULTS',
      CLEAR_SELECTED_FILTER_ITEMS_BY_NAME: 'filterOptions/CLEAR_SELECTED_FILTER_ITEMS_BY_NAME',
      SET_FILTER_INPUTS_BY_NAME: 'filterOptions/SET_FILTER_INPUTS_BY_NAME',
      ADD_TO_INSERTED_MULTIPLE_INPUTS: 'filterOptions/ADD_TO_INSERTED_MULTIPLE_INPUTS',
      REMOVE_INSERTED_MULTIPLE_INPUT: 'filterOptions/REMOVE_INSERTED_MULTIPLE_INPUT',
      CLEAR_INSERTED_MULTIPLE_INPUTS: 'filterOptions/CLEAR_INSERTED_MULTIPLE_INPUTS',
      CLEAR_INSERTED_MULTIPLE_INPUTS_BY_NAME:
        'filterOptions/CLEAR_INSERTED_MULTIPLE_INPUTS_BY_NAME',
    }),
  },
});
</script>
<style lang="scss" scoped>
@import '@/scss/_variables.scss';
.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__item {
    display: inline-block;
    padding: 10px 15px 10px 0;
    position: relative;
    vertical-align: bottom;

    .top-label {
      font-size: 0.9rem;
      padding: 0 0 6px;
    }

    .box {
      border: 1px solid $gray;
      border-radius: 4px;
      text-align: center;
      height: 38px;
      display: flex;
      align-items: center;
      padding: 6px 15px;
      transition: unset;
      cursor: pointer;

      &.is-active {
        position: relative;
        z-index: 99999;
        background-color: #fff;
        border-bottom: 0;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }

      &.is-valid {
        border: 1px solid $green;
        color: $green;
      }
    }

    .dropdown {
      position: absolute;
      z-index: 99999;
      background-color: #fff;
      border: 1px solid $gray;
      border-radius: 4px;
      border-top-left-radius: 0;
      padding: 10px;
      min-width: 350px;

      &__static-options,
      &__single-option {
        min-width: 200px;

        .label {
          cursor: pointer;
        }
      }

      .single-option-clear-btn {
        cursor: pointer;
      }

      &__selected-pageSize {
        margin-top: 10px;

        .selected-pageSize-item {
          margin: 0 4px 0 0;
          cursor: pointer;
          vertical-align: top;
        }
      }

      &__pageSize {
        max-height: 400px;
        overflow-y: scroll;
        margin-top: 10px;

        ol {
          list-style-type: none;
          padding: 0;
          margin: 0;

          li {
            label {
              cursor: pointer;
              border-radius: 4px;
              line-height: 16pt;
              padding: 4px 10px;
              width: 100%;

              &.selected {
                cursor: initial;
                color: #999;
                background-color: #eee;
              }

              &:hover {
                background-color: #eee;
              }
            }
          }
        }
      }
    }
  }
}
</style>
