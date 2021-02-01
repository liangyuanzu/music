<template>
  <div class="header">
    <div class="left"></div>
    <div class="title">
      <h3>演员</h3>
      <p>薛之谦</p>
    </div>
    <div class="right"></div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'PlayerHeader',
})
export default class PlayerHeader extends Vue {}
</script>

<style lang='scss' scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';

.header {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;

  .left,
  .right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }

  .left {
    @include bg_img('../../assets/images/down');
  }

  .title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #fff;
    @include font_size($font_medium);
    @include no-wrap();

    p {
      @include font_size($font_small);
    }
  }
}
</style>
