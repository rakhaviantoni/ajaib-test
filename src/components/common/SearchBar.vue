<template>
  <div class="search-bar">
    <slot name="before"></slot>
    <div class="my-3 row">
      <slot name="row-before"></slot>
      <div class="col col-sm-6 col-md-3 mb-2" :key="i" v-for="(field, i) of fields">
        <label :for="field.name" class="mr-2">{{ field.label }}</label>
        <date-picker
          v-if="field.type && field.type === 'date'"
          :input-class="{
            'form-control': true,
            'is-valid': field.value !== null,
          }"
          v-model="field.value"
          :placeholder="field.label"
          value-type="format"
          format="YYYY-MM-DD"
          @change="
            (value) => {
              onChangeInput({
                name: field.name,
                value,
              });
            }
          "
        ></date-picker>
        <date-picker
          v-else-if="field.type && field.type === 'date-range'"
          :input-class="{
            'form-control': true,
            'is-valid': field.value !== null && field.value[0] && field.value[1],
          }"
          v-model="field.value"
          :placeholder="field.label"
          value-type="format"
          format="YYYY-MM-DD"
          range
          @change="
            (value) => {
              onChangeInput({
                name: field.name,
                type: field.type,
                value,
              });
            }
          "
        ></date-picker>
        <select
          v-else-if="field.type && field.type === 'select'"
          :name="field.name"
          :id="`select-${field.name}`"
          v-model="field.value"
          class="form-control"
          @change="
            onChangeInput({
              name: field.name,
              value: $event.target.value,
            })
          "
        >
          <option
            :key="iOpt"
            v-for="(opt, iOpt) of field.options"
            :value="opt.value"
            :selected="opt.value === field.value"
          >
            {{ opt.label }}
          </option>
        </select>
        <input
          v-else
          class="form-control"
          :style="field.inputStyle"
          :class="{
            ...field.inputClass,
            'is-valid': field.value && field.value !== null,
          }"
          :name="field.name"
          :value="field.value"
          :placeholder="field.label"
          @change="
            onChangeInput({
              name: field.name,
              value: $event.target.value.trim(),
            })
          "
        />
      </div>
      <div class="col col-sm-6 col-md-3">
        <label class="mr-2 d-block" for="action">Search</label>
        <button name="action" @click="onSearchClick" class="btn btn-search">
          <b-icon icon="search" :style="{ width: '1rem' }"></b-icon>
          Search
        </button>
        <button
          v-if="showClearBtn"
          name="action"
          @click="onClearSearchClick"
          class="btn btn-outline-secondary ml-2"
        >
          <b-icon icon="x" :style="{ width: '1rem' }"></b-icon>
          Clear
        </button>
      </div>
      <slot name="row-after"></slot>
    </div>
    <slot name="after"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SearchBar',
  props: {
    fields: {
      type: Array,
      required: true,
    },
    datatableMeta: {
      type: Object,
      default: () => null,
    },
    showClearBtn: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    onChangeInput({ name, type, value }: any) {
      /* eslint-disable no-param-reassign */
      const self = this as any;

      if (type === 'date-range') {
        const result: Array<string> = [];
        value.forEach((v: string) => {
          if (v !== null) {
            result.push(v);
          }
        });
        value = result;
      }

      const fields = [...self.fields];
      const meta = self.datatableMeta ? { ...self.datatableMeta } : null;
      let isSearchDiff = false;

      fields.forEach((field: any) => {
        if (name === field.name && field.value !== value) {
          if (field.type === 'date-range') {
            field.value = value[0] && value[1] ? value : null;
          } else {
            field.value = value;
          }
          isSearchDiff = true;
        }
        // bind to meta
        if (name && field.value !== null && field.value !== '') {
          meta[field.name] = field.value;
        } else {
          delete meta[field.name];
        }
      });

      self.$emit('onChangeInput', {
        name,
        value,
        fields,
        datatableMeta: meta,
        isSearchDiff,
      });
      /* eslint-disable no-param-reassign */
    },
    onSearchClick() {
      (this as any).$emit('onSearchClick');
    },
    onClearSearchClick() {
      /* eslint-disable no-param-reassign */
      const self = this as any;

      const fields = [...self.fields];
      const meta = self.datatableMeta ? { ...self.datatableMeta } : null;
      let isSearchDiff = false;

      fields.forEach((field: any) => {
        const initialValue = typeof field.initialValue === 'undefined' ? null : field.initialValue;
        if (field.value !== initialValue) {
          field.value = field.initialValue;
          isSearchDiff = true;
        }

        // bind to meta
        if (meta && field.value !== null && field.value !== '') {
          meta[field.name] = field.value;
        } else {
          delete meta[field.name];
        }
      });

      self.$emit('onClearSearchClick', { fields, datatableMeta: meta, isSearchDiff });
      /* eslint-disable no-param-reassign */
    },
  },
});
</script>

<style scoped lang="scss">
.form-control {
  height: 2.25rem !important;
  font-size: 0.875rem !important;
}
label {
  font-size: 0.875rem;
}
.btn {
  height: 2.25rem;
  font-size: 0.875rem;
}
.btn-search {
  color: #ffffff;
  background-color: #079435;
  border-color: #079435;
}
.btn-search:hover {
  color: #079435;
  background-color: transparent;
  border-color: #079435;
}
</style>
