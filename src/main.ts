import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
/**
 * @link https://www.npmjs.com/package/vue-sweetalert2
 */
import VueSweetalert2 from 'vue-sweetalert2';
/**
 * @link https://www.npmjs.com/package/vue2-datepicker
 */
import DatePicker from 'vue2-datepicker';
/**
 * @link https://vue-multiselect.js.org/
 */
import Multiselect from 'vue-multiselect';
/**
 * @link https://www.npmjs.com/package/vue-scrollto
 */
import VueScrollTo from 'vue-scrollto';

import lineClamp from 'vue-line-clamp';
import VueClipboards from 'vue-clipboards';
import ValidationProvider from './plugins/validationProvider';

import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css';
import 'vue2-datepicker/index.css';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import httpService from './http';

Vue.config.productionTip = false;

Vue.component('ValidationProvider', ValidationProvider);
Vue.use(VueScrollTo, {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true,
});
Vue.use(lineClamp, {
  // plugin options
});

Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.component('date-picker', DatePicker);
Vue.component('multiselect', Multiselect);
Vue.use(VueClipboards);

Vue.prototype.$http = httpService;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
