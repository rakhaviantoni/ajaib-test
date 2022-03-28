<template>
  <div class="datatable">
    <div class="mb-2 h5 d-block d-md-none" v-if="title">
      <strong>
        {{ title }}
      </strong>
    </div>
    <div class="d-flex m-0 justify-content-between align-items-center">
      <div class="m-0 h5 d-none d-md-block" v-if="title">
        <strong>
          {{ title }}
        </strong>
      </div>
      <slot name="top-content" />
      <control-bar
        v-if="!hideControlBar"
        :current-page="currentPage"
        :total-data-count="totalDataCount"
        :page-size="pageSize"
        :initial-per-page="pageSize"
        @onPageChange="onPageChange"
        @onPerPageChange="onPerPageChange"
      />
    </div>
    <div class="table-wrapper">
      <slot name="table-top" />
      <table class="table table-hover table-bordered table-fsize my-3">
        <thead>
          <th v-if="!hideIndex" :style="{ width: '1px' }">No</th>
          <th
            v-for="(col, colIdx) of columns"
            :key="colIdx"
            :style="{ ...col.thStyle, cursor: col.sortable === true ? 'pointer' : 'initial' }"
            :class="col.thClass"
            v-on="{
              click: !isFetching && col.sortable ? () => onClickTh(col, colIdx) : () => {},
            }"
          >
            {{ col.label }}
            <template v-if="col.sortable === true && sortBy === col.name">
              <template v-if="sortOrder === 'ascend'">
                <b-icon icon="arrow-up" />
              </template>
              <template v-if="sortOrder === 'descend'">
                <b-icon icon="arrow-down" />
              </template>
            </template>
            <template v-if="col.info">
              <b-icon
                :id="`col-tooltip-${colIdx}`"
                class="text-secondary"
                icon="info-circle-fill"
              ></b-icon>
              <b-tooltip :target="`col-tooltip-${colIdx}`" variant="secondary" triggers="hover">
                {{ col.info }}
              </b-tooltip>
            </template>
          </th>
        </thead>
        <tbody>
          <template v-if="hideData">
            <tr>
              <td class="hidden-data-td" :colspan="colsCount">
                <div
                  class="hidden-data-box d-flex align-items-center justify-content-center text-muted"
                >
                  <b-icon class="mr-1" icon="info-circle" :style="{ width: '1rem' }"></b-icon>
                  Data is Hidden
                </div>
              </td>
            </tr>
          </template>
          <template v-else-if="isFetching">
            <tr>
              <td :colspan="colsCount" :style="{ textAlign: 'center' }">
                <div class="mt-5 mb-4">
                  <div class="spinner-border text-primary text-center" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  <br /><br /><span class="text-muted">{{ fetchingText }}</span
                  ><br />
                </div>
              </td>
            </tr>
          </template>
          <template v-else-if="!isFetching && data.length === 0">
            <tr>
              <td :colspan="colsCount" :style="{ textAlign: 'center' }">
                <div class="my-4 text-center">
                  <b-icon class="mr-1" icon="info-circle" :style="{ width: '1rem' }"></b-icon>
                  {{ emptyDataText }}
                </div>
              </td>
            </tr>
          </template>
          <template v-else-if="!isFetching && data.length > 0">
            <template v-for="(row, rowIdx) of rows">
              <tr :key="`m-${rowIdx}`">
                <td v-if="!hideIndex">{{ rowIdx + 1 + (currentPage - 1) * pageSize }}</td>
                <td
                  v-for="(col, colIdx) of columns"
                  :key="colIdx"
                  :style="col.tdStyle"
                  :class="col.tdClass"
                  @click="onClickTd(col, row, colIdx, rowIdx)"
                >
                  <template v-if="col.render">
                    {{ col.render(col, row, colIdx, rowIdx) }}
                  </template>
                  <template v-else-if="col.component">
                    <component
                      :is="col.component(col, row, colIdx, rowIdx).instance"
                      v-bind="col.component(col, row, colIdx, rowIdx).props"
                      v-on="col.component(col, row, colIdx, rowIdx).events"
                    />
                  </template>
                  <template v-else-if="col.slot">
                    <slot
                      :name="col.slot.name"
                      v-bind="{ col, row, colIdx, rowIdx, ...col.slot.props }"
                    />
                  </template>
                  <template v-else>
                    {{ row[col.name] }}
                  </template>
                </td>
              </tr>
              <tr :key="`d-${rowIdx}`" v-if="row[dropdownShowKey] === true">
                <td :colspan="columns.length">
                  <slot :name="dropdownContentSlot" v-bind="{ row, rowIdx }" />
                </td>
              </tr>
            </template>
          </template>
          <template v-if="!hideData && lastTableRowsSlot">
            <slot :name="lastTableRowsSlot" />
          </template>
        </tbody>
      </table>
    </div>
    <control-bar
      v-if="!hideControlBar"
      :current-page="currentPage"
      :total-data-count="totalDataCount"
      :page-size="pageSize"
      :initial-per-page="pageSize"
      @onPageChange="onPageChange"
      @onPerPageChange="onPerPageChange"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ControlBar from '@/components/datatables/ControlBar.vue';

export default Vue.extend({
  props: {
    title: {
      type: String,
    },
    columns: {
      type: Array,
      default: (): Array<any> => [],
    },
    data: {
      type: Array,
      default: (): Array<any> => [],
    },
    totalDataCount: {
      type: Number,
      default: (): number => 0,
    },
    sortBy: {
      type: String,
      default: (): string => 'email',
    },
    sortOrder: {
      type: String,
      default: (): string => 'descend',
    },
    currentPage: {
      type: Number,
      default: (): number => 1,
    },
    pageSize: {
      type: Number,
      default: (): number => 10,
    },
    isFetching: {
      type: Boolean,
      default: (): boolean => false,
    },
    fetchingText: {
      type: String,
      default: (): string => 'Loading...',
    },
    emptyDataText: {
      type: String,
      default: (): string => 'No Data Found',
    },
    hideIndex: {
      type: Boolean,
      default: (): boolean => false,
    },
    hideData: {
      type: Boolean,
      default: (): boolean => false,
    },
    hideControlBar: {
      type: Boolean,
      default: (): boolean => false,
    },
    lastTableRowsSlot: {
      type: String,
      default: (): string => 'last-table-rows-slot',
    },
    dropdownShowKey: {
      type: String,
      default: (): string => 'showDropdown',
    },
    dropdownContentSlot: {
      type: String,
      default: (): string => 'dropdown-content-slot',
    },
  },
  components: {
    ControlBar,
  },
  computed: {
    rows() {
      return this.data;
    },
    colsCount() {
      return this.columns.length + (this.hideIndex ? 0 : 1);
    },
  },
  methods: {
    onClickTh(col: any) {
      let sortOrder: string;
      if (this.sortBy === col.name) {
        sortOrder = this.sortOrder === 'descend' ? 'ascend' : 'descend';
      } else {
        sortOrder = 'descend';
      }
      this.onSortChange(col.name, sortOrder);
    },
    onClickTd(col: any, row: string, colIdx: number, rowIdx: number) {
      if (col.onClick) {
        col.onClick(col, row, colIdx, rowIdx);
      }
    },
    onSortChange(sortBy: string, sortOrder: string) {
      const payload: any = { sortBy, sortOrder };
      this.$emit('onSortChange', payload);
      this.onMetaChange(payload);
    },
    onPageChange({ page }: { page: number }) {
      const payload = { page };
      this.$emit('onPageChange', payload);
      this.onMetaChange(payload);
    },
    onPerPageChange({ page, pageSize }: { page: number; pageSize: number }) {
      const payload = { page, pageSize };
      this.$emit('onPerPageChange', payload);
      this.onMetaChange(payload);
    },
    onMetaChange(payload: any) {
      this.$emit('onMetaChange', {
        page: this.currentPage,
        pageSize: this.pageSize,
        sortOrder: this.sortOrder,
        sortBy: this.sortBy,
        ...payload,
      });
    },
  },
});
</script>
<style scoped lang="scss">
.form-control {
  // height: 2.25rem !important;
  font-size: 0.875rem !important;
}
label {
  font-size: 0.875rem;
}
table {
  thead th,
  thead td {
    border: none;
    background: #00000009;
  }
}
.table-wrapper {
  overflow: scroll;
}
.table-fsize {
  font-size: 0.8rem;
}
.table-hover {
  tbody tr:hover {
    background-color: #00000003;
  }
}
.hidden-data-td {
  padding: 10px;
}
.hidden-data-box {
  width: 100%;
  height: 30px;
  background-color: #00000008;
  border-radius: 4px;
}
</style>
