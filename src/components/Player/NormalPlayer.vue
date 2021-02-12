<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="normal-player" v-show="isFullScreen">
      <div class="player-warpper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle></PlayerMiddle>
        <PlayerBottom :curTime="curTime"></PlayerBottom>
      </div>
      <div class="player-bg">
        <img :src="currentSong.picUrl" alt="" />
      </div>
    </div>
  </transition>
</template>

<script lang='ts'>
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';
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
  @Prop({ default: 0, required: true }) curTime: number;

  @Getter('isFullScreen') isFullScreen;

  @Getter('currentSong') currentSong;

  @Action('setSongLyric') setSongLyric;

  @Watch('currentSong')
  onCurrentSongChanged(val: any) {
    if (val.id) this.setSongLyric(val.id);
  }

  enter(el, done) {
    Velocity(el, 'transition.shrinkIn', { duration: 500 }, () => {
      done();
    });
  }

  leave(el, done) {
    Velocity(el, 'transition.shrinkOut', { duration: 500 }, () => {
      done();
    });
  }
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
