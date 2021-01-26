<template>
  <div id="app">
    <Header></Header>
    <Tabbar></Tabbar>
    <Player></Player>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Tabbar from './components/Tabbar.vue';
import Player from './views/Player.vue';

export default {
  name: 'app',
  components: {
    Header,
    Tabbar,
    Player,
  },
};
</script>

<style lang="scss">
</style>
