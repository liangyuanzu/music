<template>
  <div>
    <NormalPlayer></NormalPlayer>
    <MiniPlayer></MiniPlayer>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import NormalPlayer from '../components/Player/NormalPlayer.vue';
import MiniPlayer from '../components/Player/MiniPlayer.vue';

@Component({
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
  },
})
export default class Player extends Vue {}
</script>

<style lang='scss' scoped>
</style>
