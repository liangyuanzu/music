<template>
  <div>
    <swiper :options="swiperOption" class="player">
      <swiper-slide class="cd">
        <div class="cd-wrapper" ref="cdWrapper">
          <img :src="currentSong.picUrl" alt="" />
        </div>
        <p>{{ firstLyric }}</p>
      </swiper-slide>
      <swiper-slide class="lyric">
        <ScrollView>
          <ul>
            <li v-for="(val, index) in currentLyric" :key="index">{{ val }}</li>
          </ul>
        </ScrollView>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
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

  get firstLyric() {
    return Object.values(this.currentLyric)[0];
  }

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
      @include font_color();
      margin-top: 50px;
    }
  }
  .lyric {
    li {
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin: 10px 0;
      &:last-of-type {
        padding-bottom: 100px;
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
