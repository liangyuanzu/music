<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span>00:00</span>
      <div class="progress-bar">
        <div class="progress-line">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span>00:00</span>
    </div>
    <div class="bottom-controll">
      <div class="mode loop" @click="mode" ref="mode"></div>
      <div class="prev" @click="prev"></div>
      <div class="play" @click="play" ref="play"></div>
      <div class="next" @click="next"></div>
      <div class="favorite"></div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import config from '@/config/config';

@Component({
  name: 'PlayerBottom',
})
export default class PlayerBottom extends Vue {
  @Getter('isPlaying') isPlaying;

  @Getter('modeType') modeType;

  @Getter('currentIndex') currentIndex;

  @Action('setIsPlaying') setIsPlaying;

  @Action('setModeType') setModeType;

  @Action('setCurrentIndex') setCurrentIndex;

  @Watch('isPlaying')
  onIsPlayingChanged(val: boolean) {
    if (val) {
      (this.$refs.play as any).classList.add('active');
    } else {
      (this.$refs.play as any).classList.remove('active');
    }
  }

  @Watch('modeType')
  onModeTypeChanged(val: number) {
    if (val === (config as any).mode.loop) {
      (this.$refs.mode as any).classList.remove('random');
      (this.$refs.mode as any).classList.add('loop');
    } else if (val === (config as any).mode.one) {
      (this.$refs.mode as any).classList.remove('loop');
      (this.$refs.mode as any).classList.add('one');
    } else if (val === (config as any).mode.random) {
      (this.$refs.mode as any).classList.remove('one');
      (this.$refs.mode as any).classList.add('random');
    }
  }

  play() {
    this.setIsPlaying(!this.isPlaying);
  }

  prev() {
    this.setCurrentIndex(this.currentIndex - 1);
  }

  next() {
    this.setCurrentIndex(this.currentIndex + 1);
  }

  mode() {
    if (this.modeType === (config as any).mode.loop) {
      this.setModeType((config as any).mode.one);
    } else if (this.modeType === (config as any).mode.one) {
      this.setModeType((config as any).mode.random);
    } else if (this.modeType === (config as any).mode.random) {
      this.setModeType((config as any).mode.loop);
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/mixin';
@import '@/assets/css/variable';

.player-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .bottom-progress {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      @include font_size($font_small);
      @include font_color();
    }
    .progress-bar {
      width: 100%;
      margin: 0 10px;
      height: 10px;
      background: #fff;
      .progress-line {
        width: 0%;
        height: 100%;
        background: #ccc;
        position: relative;
        .progress-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .bottom-controll {
    width: 80%;
    margin: 0 auto;
    padding: 50px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 84px;
      height: 84px;
    }
    .mode {
      &.loop {
        @include bg_img('../../assets/images/loop');
      }
      &.one {
        @include bg_img('../../assets/images/one');
      }
      &.random {
        @include bg_img('../../assets/images/shuffle');
      }
    }
    .prev {
      @include bg_img('../../assets/images/prev');
    }
    .play {
      @include bg_img('../../assets/images/play');
      &.active {
        @include bg_img('../../assets/images/pause');
      }
    }
    .next {
      @include bg_img('../../assets/images/next');
    }
    .favorite {
      @include bg_img('../../assets/images/un_favorite');
    }
  }
}
</style>
