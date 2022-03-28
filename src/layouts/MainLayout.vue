<template>
  <div>
    <main-navbar />
    <div
      class="main-content"
      :style="{
        marginLeft: sidebarWidth,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import MainNavbar from '@/components/common/MainNavbar.vue';

export default Vue.extend({
  name: 'MainLayout',
  components: {
    MainNavbar,
  },
  computed: {
    ...mapState({
      sidebarWidth: (state: any) => state.view.sidebarWidth,
    }),
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #025e50;
}

.main-content {
  color: #363642;
  margin-top: 50px;
  padding: 15px 20px;
  padding-bottom: 50vh;
  text-align: left;
  transition: 0.1s ease;
}

@media print {
  .main-content {
    margin: 0;
  }
}
</style>
