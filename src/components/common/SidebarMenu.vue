<template>
  <div class="sidebar-menu" :style="{ width: sidebarWidth }">
    <ul>
      <li
        v-for="(m, i) of menu"
        :key="i"
        :class="RegExp(`${m.path}\/?`).test(currentPath) && m.path ? 'active' : ''"
      >
        <template>
          <div class="link">
            <span @click="onClickLink($event, m.path)">
              <b-icon v-if="m.icon" :icon="m.icon" :style="{ color: '#fff' }" />
              <span
                :class="{
                  label: true,
                  'expanded-state': isSidebarExpanded,
                }"
              >
                {{ m.label }}
              </span>
            </span>
            <a :href="`${baseUrl}${m.path}`" target="_blank" v-show="isSidebarExpanded">
              <b-icon
                icon="box-arrow-in-up-right"
                :style="{ color: '#fff', width: '0.7rem' }"
                class="ml-2"
              />
            </a>
          </div>
        </template>
      </li>
    </ul>
    <div class="toggle-expand-btn" @click="toggleExpand">
      <b-icon icon="arrows-expand" rotate="90" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';

export default Vue.extend({
  name: 'SidebarMenu',
  mounted() {
    const self = this as any;
    self.checkWindowWidth();
    window.addEventListener('resize', (e: Event) => {
      self.checkWindowWidth();
    });
  },
  computed: {
    baseUrl(): string {
      return process.env.VUE_APP_BASE_URL;
    },
    currentPath(): string {
      return (this.$route as any).path || '/';
    },
    ...mapState({
      menu: (state: any) => state.view.menuList,
      isSidebarExpanded: (state: any) => state.view.isSidebarExpanded,
      sidebarWidth: (state: any) => state.view.sidebarWidth,
      sidebarWidths: (state: any) => state.view.sidebarWidths,
    }),
  },
  methods: {
    onClickLink(evt: Event, path: string) {
      (this as any).$router.push({ path });
    },
    toggleExpand() {
      (this as any).TOGGLE_SIDEBAR_EXPAND();
    },
    checkWindowWidth() {
      const self = this as any;
      if (self.sidebarWidth !== '0' && window.innerWidth <= 576) {
        self.SET_SIDEBAR_WIDTH('0');
      } else if (window.innerWidth > 576) {
        if (self.isSidebarExpanded && self.sidebarWidth !== self.sidebarWidths.expanded) {
          self.SET_SIDEBAR_WIDTH(self.sidebarWidths.expanded);
        } else if (!self.isSidebarExpanded && self.sidebarWidth !== self.sidebarWidths.shrinked) {
          self.SET_SIDEBAR_WIDTH(self.sidebarWidths.shrinked);
        }
      }
    },
    ...mapMutations({
      TOGGLE_SIDEBAR_EXPAND: 'view/TOGGLE_SIDEBAR_EXPAND',
      SET_SIDEBAR_WIDTH: 'view/SET_SIDEBAR_WIDTH',
    }),
  },
});
</script>

<style lang="scss" scoped>
.sidebar-menu {
  top: 100%;
  left: 0;
  position: absolute;
  overflow: scroll;
  height: 100vh;
  z-index: 0;
  background-color: #333;
  transition: 0.1s ease;

  .toggle-expand-btn {
    cursor: pointer;
    padding: 15px;

    &:hover {
      font-weight: bolder;
      background-color: #222;
    }
  }

  .sidebar-submenu {
    padding: 0 0 0 1rem;
  }

  ul {
    padding: 0;
    li {
      text-align: left;
      list-style: none;
      cursor: pointer;

      &.active .link {
        font-weight: bold;
        background-color: #222;
      }

      .link {
        position: relative;
        transition: 0.1s ease;
        display: block;
        font-size: 0.9rem;
        text-decoration: none;

        .label {
          opacity: 0;
          transform: translateX(-130%);

          &.expanded-state {
            transform: translateX(0);
            transition: opacity 0.1s ease 0.1s;
            opacity: 1;
          }
        }

        span {
          padding: 0 15px;
          height: 50px;
          display: flex;
          align-items: center;

          &:hover {
            font-weight: bolder;
            background-color: #222;
          }
        }

        a {
          position: absolute;
          top: 15px;
          right: 15px;
        }
      }
    }
  }
}
</style>
