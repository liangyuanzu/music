import Vue from 'vue';
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';
import Loading from './plugin/loading/index';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/base.scss';

fastclick.attach(document.body);
Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  loading: require('./assets/images/loading.png'),
});

Vue.use(Loading, {
  title: '正在加载...',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  // 预渲染
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
}).$mount('#app');
