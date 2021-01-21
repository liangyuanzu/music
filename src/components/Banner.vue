<template>
  <div>
    <swiper :options="swiperOption" class="banner" v-if="banners.length > 0">
      <swiper-slide v-for="item in banners" :key="item.bannerId"  class="item">
        <a :href="item.url">
          <img :src="item.pic">
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

@Component({
  name: 'Banner',
  components: {
    swiper,
    swiperSlide,
  },
})
export default class Banner extends Vue {
  swiperOption = {
    loop: true, // 循环模式选项
    autoplay: {
      delay: 3000, // 自动切换的时间间隔，单位ms
      stopOnLastSlide: false, // 当切换到最后一个slide时停止自动切换
      disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay。
    },
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
  }

  @Prop({ default: [] }) readonly banners: Array<object>
}
</script>

<style lang='scss' scoped>
.banner {
  .item {
    img {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
<style lang="scss">
// 覆盖swiper的样式
@import '@/assets/css/mixin.scss';
.banner {
  .swiper-pagination-bullet {
    width: 16px;
    height: 16px;
    background: #fff;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    @include bg_color();
  }
}
</style>
