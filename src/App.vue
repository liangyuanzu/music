<template>
  <div id="app">
    <Header></Header>
    <Tabbar></Tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Tabbar from './components/Tabbar.vue';

export default {
  name: 'app',
  components: {
    Header,
    Tabbar,
  },
};
</script>

<style lang="scss">
</style>
