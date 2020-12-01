import Vue from 'vue';
import fastclick from 'fastclick';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/base.scss';

fastclick.attach(document.body);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
