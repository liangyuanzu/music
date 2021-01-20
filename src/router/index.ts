import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

// 路由懒加载
const Recommend = () => import('../views/Recommend.vue');
const Singer = () => import('../views/Singer.vue');
const Rank = () => import('../views/Rank.vue');
const Search = () => import('../views/Search.vue');

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: '/', redirect: '/recommend' },
  { path: '/recommend', component: Recommend },
  { path: '/singer', component: Singer },
  { path: '/rank', component: Rank },
  { path: '/search', component: Search },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
