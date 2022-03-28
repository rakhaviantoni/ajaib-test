<template>
  <div>
    <div class="main-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DefaultLayout',
  created() {
    // console.log('#DefaultLayout');
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main-content {
  width: 100vw;
  height: 100vh;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
}
</style>
