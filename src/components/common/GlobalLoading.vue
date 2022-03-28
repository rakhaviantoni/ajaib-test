<template>
  <div class="global-loading" v-show="isLoading">
    <div class="box">
      <b-spinner label="Loading..."></b-spinner>
      <div class="mt-2">Please Wait ...</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    isLoading() {
      return this.$store.state.view.isLoading;
    },
  },
});
</script>

<style lang="scss" scoped>
.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000bb;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    color: #fff;
  }
}
</style>
