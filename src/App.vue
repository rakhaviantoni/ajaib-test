<template>
  <div id="app">
    <div class="git hidden-md-down" v-if="isDev">
      <div class="git__history">{{ log }}</div>
    </div>
    <component :is="layout">
      <router-view />
    </component>
    <global-loading />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GlobalLoading from '@/components/common/GlobalLoading.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { mapMutations, mapState } from 'vuex';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const gitLog = require('../info.txt');

Vue.component('DefaultLayout', DefaultLayout);
Vue.component('MainLayout', MainLayout);

export default Vue.extend({
  name: 'App',
  props: {
    msg: String,
  },
  mounted() {
    const self = this as any;
    window.addEventListener('keypress', self.handleEnterAndEscapeKeys);

    (window.document as any).defaultTitle = 'Ajaib Test';
    window.document.title = (window.document as any).defaultTitle;
  },
  destroyed() {
    const self = this as any;
    window.removeEventListener('keypress', self.handleEnterAndEscapeKeys);
  },
  data() {
    return {};
  },
  components: {
    GlobalLoading,
  },
  watch: {
    appTitle: {
      handler: (val: string) => {
        window.document.title = val;
      },
      immediate: true,
    },
  },
  computed: {
    layout(): string {
      const meta: any = this.$route.meta ? this.$route.meta : {};
      return `${meta.layout || 'DefaultLayout'}`;
    },
    isDev(): boolean {
      return process.env.NODE_ENV !== 'production';
    },
    log(): string {
      return gitLog.default;
    },
    ...mapState({
      appTitle: (state: any): string => state.view.appTitle,
      activeFilterName: (state: any): string => state.filterOptions.activeFilterName,
    }),
  },
  methods: {
    handleEnterAndEscapeKeys(evt: KeyboardEvent) {
      const self = this as any;
      if (self.activeFilterName) {
        const code: string = evt.code.toLowerCase();
        if (code === 'enter' || code === 'escape' || evt.which === 13 || evt.which === 27) {
          self.SET_ACTIVE_FILTER_NAME('');
        }
      }
    },
    ...mapMutations({
      SET_ACTIVE_FILTER_NAME: 'filterOptions/SET_ACTIVE_FILTER_NAME',
    }),
  },
});
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  box-sizing: border-box;
}

@media print {
  .no-print,
  .no-print * {
    display: none !important;
  }
}

.cursor-pointer {
  cursor: pointer;
}

.cursor-not-allowed {
  cursor: not-allowed;
}

.datatable {
  $table-font-size: 0.9rem !important;

  font-size: $table-font-size;
  .btn {
    font-size: $table-font-size;
  }
}

.mx-datepicker {
  width: 100% !important;

  input {
    padding-left: 35px;
  }

  .mx-icon-clear,
  .mx-icon-calendar {
    left: 10px;
    right: auto;
  }
}

.mx-datepicker-main {
  table td {
    border: initial !important;
  }
}
.swal2-container {
  z-index: 9999 !important;
}

.is-invalid .multiselect__tags {
  border: 1px solid #dc3545;
}

img.ota-logo {
  width: 3rem;
}

.btn.btn-submit {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;

  &:hover {
    background-color: #c92332;
    border-color: #c92332;
  }
}

.git {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1031;
  font-size: 10px;
  background: #efefef;
  padding: 0 5px;
}

@media (max-width: 768px) {
  .hidden-md-down {
    display: none;
  }
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
