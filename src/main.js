import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

Vue.config.productionTip = false

import { routes } from './routes';

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  vuetify,
  router: router,
  render: h => h(App)
}).$mount('#app')
