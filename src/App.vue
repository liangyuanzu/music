<template>
  <div id="app">
    <MainHeader></MainHeader>
    <Tabbar></Tabbar>
    <Player></Player>
    <router-view></router-view>
  </div>
</template>

<script>
import MainHeader from './components/MainHeader.vue';
import Tabbar from './components/Tabbar.vue';
import Player from './views/Player.vue';

export default {
  name: 'app',
  components: {
    MainHeader,
    Tabbar,
    Player,
  },
};
</script>

<style lang="scss">
</style>
