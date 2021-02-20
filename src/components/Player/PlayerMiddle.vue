<template>
  <div>
    <swiper :options="swiperOption" class="player">
      <swiper-slide class="cd">
        <div class="cd-wrapper" ref="cdWrapper">
          <img :src="currentSong.picUrl" alt="" />
        </div>
        <p>{{ firstLyric }}</p>
      </swiper-slide>
      <swiper-slide class="lyric" ref="lyric">
        <ScrollView ref="scrollView">
          <ul @touchstart="touchstart" @touchend="touchend">
            <li
              v-for="(val, key) in currentLyric"
              :key="key"
              :class="{ active: currentLineNum === key }"
            >
              {{ val }}
            </li>
          </ul>
        </ScrollView>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { Getter } from 'vuex-class';
import ScrollView from '../ScrollView.vue';

@Component({
  name: 'PlayerMiddle',
  components: {
    swiper,
    swiperSlide,
    ScrollView,
  },
})
export default class PlayerMiddle extends Vue {
  swiperOption = {
    pagination: {
      el: '.swiper-pagination',
      bulletClass: 'player-bullet',
      bulletActiveClass: 'player-bullet-active',
    },
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
  };

  currentLineNum = '0';

  touching = false;

  timer: any = null;

  get hasLyric() {
    if (Object.keys(this.currentLyric).length > 0) return true;
    return false;
  }

  get firstLyric() {
    if (this.hasLyric) return Object.values(this.currentLyric)[0];
    return '';
  }

  @Prop({ default: 0, required: true }) curTime: number;

  @Getter('isPlaying') isPlaying;

  @Getter('currentSong') currentSong;

  @Getter('currentLyric') currentLyric;

  @Watch('isPlaying')
  onIsPlayingChanged(val: boolean) {
    if (val) {
      (this.$refs.cdWrapper as any).classList.add('active');
    } else {
      (this.$refs.cdWrapper as any).classList.remove('active');
    }
  }

  @Watch('curTime')
  onCurTimeChanged(val: number) {
    if (!this.hasLyric) return;
    // 高亮歌词同步
    const lineNum = Math.floor(val);
    this.currentLineNum = this.getActiveLineNum(lineNum);
    // 歌词滚动同步
    if (this.touching) return;
    this.$nextTick(() => {
      const currentLyricTop = (document as any).querySelector('.lyric .active')
        .offsetTop;
      const lyricHeight = (this.$refs.lyric as any).$el.offsetHeight;
      const endScrollNum = Object.keys(this.currentLyric)[
        Object.keys(this.currentLyric).length - 5
      ];
      if (+this.currentLineNum >= +endScrollNum) return;
      if (currentLyricTop > lyricHeight / 2) {
        (this.$refs.scrollView as any).scrollTo(
          0,
          lyricHeight / 2 - currentLyricTop,
          100
        );
      } else {
        (this.$refs.scrollView as any).scrollTo(0, 0, 100);
      }
    });
  }

  @Watch('currentLyric')
  onCurrentLyricChanged(lyric: object) {
    if (this.hasLyric) this.currentLineNum = Object.keys(lyric)[0].toString();
  }

  getActiveLineNum(lineNum: number) {
    if (lineNum < 0) return this.currentLineNum;
    let line = lineNum;
    if (Object.keys(this.currentLyric).includes(`${line}`)) {
      return `${line}`;
    }
    line -= 1;
    return this.getActiveLineNum(line);
  }

  touchstart() {
    this.touching = true;
    if (this.timer) clearTimeout(this.timer);
  }

  touchend() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.touching = false;
    }, 1000);
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/mixin';
@import '@/assets/css/variable';

.player {
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
  .cd {
    .cd-wrapper {
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 30px solid #fff;
      overflow: hidden;
      animation: sport 20s linear infinite;
      animation-play-state: paused;
      &.active {
        animation-play-state: running;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      text-align: center;
      @include font_size($font_medium);
      color: #fff;
      margin-top: 50px;
    }
  }
  .lyric {
    li {
      text-align: center;
      @include font_size($font_medium);
      color: #888;
      margin: 10px 0;
      &:last-of-type {
        padding-bottom: 50%;
      }
      &.active {
        color: #fff;
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
<style lang="scss">
@import '@/assets/css/mixin';

.player-bullet {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #fff;
  margin: 0 20px;
}
.player-bullet-active {
  width: 60px;
  @include bg_color();
}
</style>
