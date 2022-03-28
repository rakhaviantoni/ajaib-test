<template>
  <nav
    v-show="totalPage >= 2"
    :class="outerClass"
    :style="outerStyle"
    aria-label="Page navigation example"
  >
    <ul class="pagination">
      <li class="page-item" v-if="current > 1">
        <a class="page-link" @click="onPageChange(current - 1)">
          <b-icon icon="chevron-left" />
        </a>
      </li>
      <template v-for="i in totalPage">
        <li
          v-if="i <= totalPage && i >= current - bound && i <= current + bound"
          :key="i"
          class="page-item"
          :class="{ active: i === current }"
        >
          <a class="page-link" @click="onPageChange(i)">
            {{ i }}
          </a>
        </li>
      </template>
      <li class="page-item" v-if="current < totalPage">
        <a class="page-link" @click="onPageChange(current + 1)">
          <b-icon icon="chevron-right" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    current: {
      type: Number,
      default: (): number => 1,
    },
    bound: {
      type: Number,
      default: (): number => 3,
    },
    totalPage: {
      type: Number,
      default: (): number => 2,
    },
    outerClass: {
      type: Object,
      default: (): any => ({}),
    },
    outerStyle: {
      type: Object,
      default: (): any => ({}),
    },
  },
  methods: {
    onPageChange(page: number) {
      this.$emit('onPageChange', page);
    },
  },
});
</script>

<style lang="scss" scoped>
.pagination {
  margin: 0;

  .page-link {
    color: #333;
    cursor: pointer;
  }
  .page-item.active .page-link {
    background-color: #dc3545;
    border-color: #dc3545;
    color: #fff;
    font-weight: bold;
  }
}
</style>
