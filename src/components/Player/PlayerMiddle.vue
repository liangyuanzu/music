<template>
  <div>
    <swiper :options="swiperOption" class="player">
      <swiper-slide class="cd">
        <div class="cd-wrapper">
          <img
            src="https://p1.music.126.net/-EHFGXVwLwy7ra48lDKMfg==/109951165611159240.jpg"
            alt=""
          />
        </div>
        <p>作词 : 小星星Aurora</p>
      </swiper-slide>
      <swiper-slide class="lyric">
        <ScrollView>
          <ul>
            <li>我是第1个li</li>
            <li>我是第2个li</li>
            <li>我是第3个li</li>
            <li>我是第4个li</li>
            <li>我是第5个li</li>
            <li>我是第6个li</li>
            <li>我是第7个li</li>
            <li>我是第8个li</li>
            <li>我是第9个li</li>
            <li>我是第10个li</li>
            <li>我是第11个li</li>
            <li>我是第12个li</li>
            <li>我是第13个li</li>
            <li>我是第14个li</li>
            <li>我是第15个li</li>
            <li>我是第16个li</li>
            <li>我是第17个li</li>
            <li>我是第18个li</li>
            <li>我是第19个li</li>
            <li>我是第20个li</li>
            <li>我是第21个li</li>
            <li>我是第22个li</li>
            <li>我是第23个li</li>
            <li>我是第24个li</li>
            <li>我是第25个li</li>
            <li>我是第26个li</li>
            <li>我是第27个li</li>
            <li>我是第28个li</li>
            <li>我是第29个li</li>
            <li>我是第30个li</li>
            <li>我是第31个li</li>
            <li>我是第32个li</li>
            <li>我是第33个li</li>
            <li>我是第34个li</li>
            <li>我是第35个li</li>
            <li>我是第36个li</li>
            <li>我是第37个li</li>
            <li>我是第38个li</li>
            <li>我是第39个li</li>
            <li>我是第40个li</li>
            <li>我是第41个li</li>
            <li>我是第42个li</li>
            <li>我是第43个li</li>
            <li>我是第44个li</li>
            <li>我是第45个li</li>
            <li>我是第46个li</li>
            <li>我是第47个li</li>
            <li>我是第48个li</li>
            <li>我是第49个li</li>
            <li>我是第50个li</li>
          </ul>
        </ScrollView>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
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
