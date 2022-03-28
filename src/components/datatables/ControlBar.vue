<template>
  <div
    class="text-right d-flex justify-content-end align-items-center"
    :class="outerClass"
    :style="outerStyle"
  >
    <div class="form-inline">
      <label class="mr-2 mb-2">
        Rows per page:
      </label>
      <select @change="onPerPageChange" class="custom-select">
        <option
          :key="i"
          v-for="(value, i) of rowsPerPageOptions"
          :selected="initialPerPage === value"
        >
          {{ value }}
        </option>
      </select>
    </div>
    <div class="pl-3">
      Showing {{ (currentPage - 1) * pageSize + 1 }} -
      {{ currentPage * pageSize > totalDataCount ? totalDataCount : currentPage * pageSize }} of
      {{ totalDataCount }} Data
    </div>
    <pagination
      :current="currentPage"
      :totalPage="totalPage"
      :outerClass="{ 'ml-4': true }"
      @onPageChange="onPageChange"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Pagination from '@/components/datatables/Pagination.vue';

export default Vue.extend({
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalDataCount: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    initialPerPage: {
      type: Number,
      required: true,
    },
    outerClass: {
      type: Object,
      default: (): object => ({}),
    },
    outerStyle: {
      type: Object,
      default: (): object => ({}),
    },
    rowsPerPageOptions: {
      type: Array,
      default: (): Array<number> => [2, 5, 10, 25, 50, 100],
    },
  },
  components: {
    Pagination,
  },
  computed: {
    totalPage() {
      return Math.ceil(this.totalDataCount / this.pageSize);
    },
  },
  methods: {
    onPageChange(page: number) {
      const payload = { page };
      this.$emit('onPageChange', payload);
    },
    onPerPageChange(evt: Event) {
      const { target }: { target: any } = evt;
      if (target === null) return;
      const payload = {
        page: 1,
        pageSize: Number(target.value),
      };
      this.$emit('onPerPageChange', payload);
    },
  },
});
</script>
