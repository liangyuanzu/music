import Vue from 'vue';
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/base.scss';

Vue.use(VueLazyload, {
  loading: require('./assets/images/loading.png'),
});

fastclick.attach(document.body);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
