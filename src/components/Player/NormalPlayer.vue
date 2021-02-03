<template>
  <div class="normal-player" v-show="isFullScreen">
    <div class="player-warpper">
      <PlayerHeader></PlayerHeader>
      <PlayerMiddle></PlayerMiddle>
      <PlayerBottom></PlayerBottom>
    </div>
    <div class="player-bg">
      <img
        src="https://p1.music.126.net/-EHFGXVwLwy7ra48lDKMfg==/109951165611159240.jpg"
        alt=""
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import PlayerHeader from './PlayerHeader.vue';
import PlayerMiddle from './PlayerMiddle.vue';
import PlayerBottom from './PlayerBottom.vue';

@Component({
  name: 'NormalPlayer',
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom,
  },
})
export default class NormalPlayer extends Vue {
  @Getter('isFullScreen') isFullScreen;
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';

.normal-player {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  @include bg_sub_color();

  .player-warpper {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 9999;
  }
  .player-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img {
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      filter: blur(10px);
    }
  }
}
</style>
