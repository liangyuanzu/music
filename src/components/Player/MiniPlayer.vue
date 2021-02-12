<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="mini-player" v-show="isShowMiniPlayer">
      <div class="player-wrapper">
        <div class="player-left" @click="showNormalPlayer">
          <img :src="currentSong.picUrl" ref="cd" />
          <div class="player-title">
            <h3>{{ currentSong.name }}</h3>
            <p>{{ currentSong.singer }}</p>
          </div>
        </div>
        <div class="player-right">
          <div class="play" @click.stop="play" ref="play"></div>
          <div class="list" @click.stop="showList"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';

@Component({
  name: 'MiniPlayer',
})
export default class MiniPlayer extends Vue {
  @Getter('isShowMiniPlayer') isShowMiniPlayer;

  @Getter('isPlaying') isPlaying;

  @Getter('currentSong') currentSong;

  @Action('setFullScreen') setFullScreen;

  @Action('setMiniPlayer') setMiniPlayer;

  @Action('setListPlayer') setListPlayer;

  @Action('setIsPlaying') setIsPlaying;

  @Watch('isPlaying')
  onIsPlayingChanged(val: boolean) {
    if (val) {
      (this.$refs.play as any).classList.add('active');
      (this.$refs.cd as any).classList.add('active');
    } else {
      (this.$refs.play as any).classList.remove('active');
      (this.$refs.cd as any).classList.remove('active');
    }
  }

  showNormalPlayer() {
    this.setFullScreen(true);
    this.setMiniPlayer(false);
  }

  showList() {
    this.setListPlayer(true);
  }

  enter(el, done) {
    Velocity(el, 'transition.bounceUpIn', { duration: 500 }, () => {
      done();
    });
  }

  leave(el, done) {
    Velocity(el, 'transition.bounceDownOut', { duration: 500 }, () => {
      done();
    });
  }

  play() {
    this.setIsPlaying(!this.isPlaying);
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';

.mini-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 150px;
  z-index: 9999;

  .player-wrapper {
    width: 100%;
    height: 100%;
    @include bg_color();
    display: flex;
    align-items: center;
    justify-content: space-between;
    .player-left {
      display: flex;
      padding-left: 30px;
      width: 50%;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
        animation: sport 20s linear infinite;
        animation-play-state: paused;
        &.active {
          animation-play-state: running;
        }
      }
      .player-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #fff;
        h3 {
          @include font_size($font_medium);
        }
        p {
          @include font_size($font_small);
        }
      }
    }
    .player-right {
      display: flex;
      align-items: center;
      .play {
        width: 84px;
        height: 84px;
        @include bg_img('../../assets/images/play');
        &.active {
          @include bg_img('../../assets/images/pause');
        }
      }
      .list {
        width: 120px;
        height: 120px;
        @include bg_img('../../assets/images/list');
      }
    }
  }
}

@keyframes sport {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
