<template>
  <div class="detail">
    <SubHeader :title="detail.name"></SubHeader>
    <DetailTop :src="detail.coverImgUrl" ref="top"></DetailTop>
    <div class="bottom">
      <ScrollView ref="scrollview">
        <DetailBottom :playlist="detail.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import SubHeader from '../components/SubHeader.vue';
import DetailTop from '../components/DetailTop.vue';
import DetailBottom from '../components/DetailBottom.vue';
import ScrollView from '../components/ScrollView.vue';

@Component({
  name: 'Detail',
  components: {
    SubHeader,
    DetailTop,
    DetailBottom,
    ScrollView,
  },
})
export default class Detail extends Vue {
  @Getter('detail') detail;

  @Action('getDetailData') getDetail;

  created() {
    this.getDetail(this.$route.params.id);
  }

  mounted() {
    const defaultHeight = (this.$refs.top as any).$el.offsetHeight;
    (this.$refs.scrollview as any).scrolling((offsetY) => {
      if (offsetY < 0) {
        // 向上滚动
        const blur = (10 * Math.abs(offsetY)) / defaultHeight;
        // console.log(blur);
        (this.$refs.top as any).$el.style.filter = `blur(${blur}px)`;
      } else {
        // 向下滚动
        const scale = 1 + offsetY / defaultHeight;
        (this.$refs.top as any).$el.style.transform = `scale(${scale})`;
      }
    });
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/mixin';
@import '@/assets/css/variable';

.detail {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  @include bg_sub_color();

  .bottom {
    position: fixed;
    top: 500px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
