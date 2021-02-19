<template>
  <div class="header" @click="changeTheme">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <slot name="center"></slot>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'Header',
})
export default class Header extends Vue {
  themes = ['theme', 'theme1', 'theme2'];

  index = 0;

  @Prop({ default: false }) readonly isChangeTheme: boolean;

  changeTheme() {
    if (!this.isChangeTheme) return;
    this.index += 1;
    if (this.index >= this.themes.length) this.index = 0;
    document.documentElement.setAttribute(
      'data-theme',
      this.themes[this.index]
    );
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/mixin';
@import '@/assets/css/variable';

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
    * {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
