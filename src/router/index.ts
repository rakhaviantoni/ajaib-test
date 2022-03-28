import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import BaseErrorPage from '@/views/errors/BaseErrorPage.vue';
import Home from '../views/Home.vue';
import Store from '../store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'DefaultLayout',
    },
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      layout: 'DefaultLayout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/500',
    name: 'BaseErrorPage',
    component: BaseErrorPage,
  },
];

const requireRoutes = require.context('.', false, /\.route\.ts$/);
requireRoutes.keys().forEach((filename) => {
  const item = requireRoutes(filename).default || requireRoutes(filename);
  routes.push(...item);
});

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

// router.beforeEach(async (to: any, from: any, next: any) => {
//   if (to.path !== '/' && (to.name === 'BaseErrorPage' || to.path === from.path)) return next();
// });

export default router;
