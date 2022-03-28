<template>
  <div :style="outerStyle">
    <div class="row my-2">
      <div class="col-12 col-sm-6">
        <h3 class="text-bold m-0">
          <span class="mr-2">
            <slot name="icon" />
          </span>
          <strong>{{ title }}</strong>
        </h3>
      </div>
      <div class="col-6 text-right">
        <slot name="content" />
      </div>
    </div>
    <hr v-if="showBottomHr" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: (): string => '- Page Title -',
    },
    outerStyle: {
      type: Object,
      default: (): object => ({}),
    },
    showBottomHr: {
      type: Boolean,
      default: (): boolean => false,
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
</style>
