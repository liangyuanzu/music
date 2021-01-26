<template>
  <div class="header" @click="changeTheme">
    <div class="left" @click.stop="$router.back(-1)"></div>
    <div class="title">{{ title }}</div>
    <div class="right"></div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'SubHeader',
})
export default class SubHeader extends Vue {
  themes = ['theme', 'theme1', 'theme2'];

  index = 0;

  @Prop({ default: '' }) readonly title: string;

  changeTheme() {
    // eslint-disable-next-line no-plusplus
    this.index++;
    if (this.index >= this.themes.length) this.index = 0;
    document.documentElement.setAttribute(
      'data-theme',
      this.themes[this.index]
    );
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';

.header {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  @include bg_color();

  .left,
  .right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }

  .left {
    @include bg_img('../../assets/images/back');
  }

  .right {
    @include bg_img('../../assets/images/more');
  }

  .title {
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
    @include no-wrap();
  }
}
</style>
