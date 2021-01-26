<template>
  <div class="player">
    <PlayerHeader></PlayerHeader>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import PlayerHeader from '../components/Player/PlayerHeader.vue';

@Component({
  name: 'Player',
  components: {
    PlayerHeader,
  },
})
export default class Player extends Vue {}
</script>

<style lang='scss' scoped>
.player {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: pink;
  z-index: 999;
}
</style>
