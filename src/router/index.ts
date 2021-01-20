import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Recommend from '../views/Recommend.vue';
import Singer from '../views/Singer.vue';
import Rank from '../views/Rank.vue';
import Search from '../views/Search.vue';

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
