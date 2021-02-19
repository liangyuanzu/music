<template>
  <div id="app">
    <MainHeader></MainHeader>
    <Tabbar></Tabbar>
    <Player></Player>
    <keep-alive include="Singer,Search">
      <router-view></router-view>
    </keep-alive>
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
