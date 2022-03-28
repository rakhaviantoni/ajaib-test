<template>
  <div class="main-navbar no-print">
    <div class="top-bar">
      <div class="top-bar-brand">
        <a class="h5 m-0 d-none d-sm-block">
          <strong>
            {{ appTitle }}
          </strong>
        </a>
        <b-dropdown class="d-block d-sm-none" size="lg" variant="link" no-caret>
          <template v-slot:button-content>
            <b-icon icon="list" class="text-light" />
          </template>
          <template v-for="(m, i) of menu">
            <b-dropdown-item :key="i" @click="onClickLink($event, m.path)">
              <div
                :style="{
                  fontWeight: currentPath === m.path ? 'bold' : 'initial',
                }"
              >
                <b-icon v-if="m.icon" :icon="m.icon" />
                <span class="ml-2">
                  {{ m.label }}
                </span>
              </div>
            </b-dropdown-item>
          </template>
        </b-dropdown>
      </div>
    </div>
    <sidebar-menu />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions, mapMutations } from 'vuex';
import SidebarMenu from './SidebarMenu.vue';

export default Vue.extend({
  name: 'MainNavbar',
  components: {
    SidebarMenu,
  },
  created() {
    //
  },
  computed: {
    currentPath(): string {
      return (this.$route as any).path || '/';
    },
    ...mapState({
      appTitle: (state: any) => state.view.appTitle,
      menu: (state: any) => state.view.menuList,
    }),
  },
  data() {
    return {};
  },
  methods: {
    onClickLink(evt: Event, path: string) {
      this.$router.push({ path });
    },
    ...mapMutations({
      SET_IS_LOADING: 'view/SET_IS_LOADING',
    }),
  },
});
</script>

<style lang="scss">
.main-navbar {
  position: fixed;
  top: 0;
  height: 50px;
  width: 100vw;
  color: #fff;
  display: flex;
  box-shadow: 0 0 10px -2px #000;
  z-index: 1030;

  .top-bar {
    padding: 0px;
    width: 100%;
    background-color: #333;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-weight: bold;
    }

    #user-actions {
      button {
        background-color: transparent;
        border: none;
        color: #fff;
      }
    }

    .top-bar-brand {
      margin-bottom: 0;
      padding: 0 0.5rem 0 1rem;
      display: flex;
      justify-content: space-between;
      height: 3.5rem;
      width: 21.5rem;
      align-items: center;
      border-right: 1px solid rgba(20, 20, 31, 0.05);

      a {
        color: #fff;
        text-decoration: none;
      }

      .dropdown-item {
        &:active {
          color: initial !important;
          background-color: initial !important;
        }
      }
    }

    .top-bar-list {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
