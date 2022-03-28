<template>
  <div class="content">
    <h1>Server Error</h1>
    <h5 class="mt-4">Connection has been refused...</h5>
    <div class="btn btn-outline-primary mt-4" @click="onClickRetry">
      <b-icon icon="arrow-counterclockwise" />
      Retry
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations } from 'vuex';

export default Vue.extend({
  mounted() {
    this.SET_IS_LOADING(false);
  },
  data() {
    return {};
  },
  methods: {
    onClickRetry() {
      this.SET_IS_LOADING(true);
      setTimeout(() => {
        this.$router.replace({ name: 'Login' });
      }, 700);
    },
    ...mapMutations({
      SET_IS_LOADING: 'view/SET_IS_LOADING',
    }),
  },
});
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
