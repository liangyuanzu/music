<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span ref="eleCurrentTime">00:00</span>
      <div class="progress-bar" @click="progressClick" ref="progressBar">
        <div class="progress-line" ref="progressLine">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span ref="eleTotalTime">00:00</span>
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
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import config from '@/config/config';
import { formatTime } from '@/helpers';

@Component({
  name: 'PlayerBottom',
})
export default class PlayerBottom extends Vue {
  @Prop({ default: 0, required: true }) curTime: number;

  @Getter('isPlaying') isPlaying;

  @Getter('modeType') modeType;

  @Getter('currentIndex') currentIndex;

  @Getter('totalTime') totalTime;

  @Action('setIsPlaying') setIsPlaying;

  @Action('setModeType') setModeType;

  @Action('setCurrentIndex') setCurrentIndex;

  @Action('setCurrentTime') setCurrentTime;

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

  @Watch('curTime')
  onCurTimeChanged(val: number) {
    // 格式化当前播放的时间
    const time: any = formatTime(val);
    (this.$refs
      .eleCurrentTime as any).innerHTML = `${time.minute}:${time.second}`;
    // 根据当前播放的时间计算比例
    const value = (val / this.totalTime) * 100;
    (this.$refs.progressLine as any).style.width = `${value}%`;
  }

  @Watch('totalTime')
  onTotalTimeChanged(val: number) {
    const time: any = formatTime(val);
    (this.$refs
      .eleTotalTime as any).innerHTML = `${time.minute}:${time.second}`;
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

  progressClick(e) {
    // 计算进度条的位置
    const normalLeft = (this.$refs.progressBar as any).offsetLeft;
    const eventLeft = e.pageX;
    const clickLeft = eventLeft - normalLeft;
    const progressWidth = (this.$refs.progressBar as any).offsetWidth;
    const value = clickLeft / progressWidth;
    (this.$refs.progressLine as any).style.width = `${value * 100}%`;

    // 重新计算播放时间
    const currentTime = this.totalTime * value;
    this.setCurrentTime(currentTime);
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
