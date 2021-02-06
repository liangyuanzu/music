<template>
  <div>
    <ul class="detail-bottom">
      <li class="bottom-top">
        <div class="bottom-icon"></div>
        <div class="bottom-title">播放全部</div>
      </li>
      <li
        v-for="item in playlist"
        :key="item.id"
        class="item"
        @click="selectMusic"
      >
        <h3>{{ item.name }}</h3>
        <p>{{ item.al.name }} - {{ item.ar[0].name }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component({
  name: 'DetailBottom',
})
export default class DetailBottom extends Vue {
  @Prop({ default: () => [] }) readonly playlist: Array<object>;

  @Action('setFullScreen') setFullScreen;

  @Action('setMiniPlayer') setMiniPlayer;

  selectMusic() {
    this.setFullScreen(true);
    this.setMiniPlayer(false);
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';

.detail-bottom {
  width: 100%;
  li {
    width: 100%;
    height: 120px;
    padding: 20px;
    box-sizing: border-box;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
  }
  .bottom-top {
    display: flex;
    align-items: center;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    .bottom-icon {
      width: 60px;
      height: 60px;
      @include bg_img('../../assets/images/small_play');
      margin-right: 20px;
    }
    .bottom-title {
      @include font_color();
      @include font_size($font_large);
    }
  }
  .item {
    @include font_color();
    h3 {
      @include font_size($font_medium);
      @include no-wrap();
    }
    p {
      @include font_size($font_small);
      @include no-wrap();
      margin-top: 10px;
      opacity: 0.8;
    }
  }
}
</style>
