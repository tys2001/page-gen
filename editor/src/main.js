import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import utils from '@/utils.js';
import store from '@/store.js';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.prototype.$utils = utils;
Vue.config.productionTip = false;
(async () => {
  Vue.prototype.$store = await store.create();
  new Vue({
    render: h => h(App),
  }).$mount('#app');
})();

