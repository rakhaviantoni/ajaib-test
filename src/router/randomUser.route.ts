const routes = [
  {
    path: '/',
    name: 'randomUser',
    meta: {
      layout: 'MainLayout',
    },
    component: () => import(/* webpackChunkName: "randomUser" */ '../views/randomUser/RandomUser.vue'),
  },
];

export default routes;
