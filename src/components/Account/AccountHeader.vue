<template>
  <div class="header">
    <div class="left" @click.stop="$router.back(-1)"></div>
    <ul class="title">
      <li :class="{ active: switchNum === 0 }" @click.stop="switchItem(0)">
        我喜欢的
      </li>
      <li :class="{ active: switchNum === 1 }" @click.stop="switchItem(1)">
        最近听的
      </li>
    </ul>
    <div class="right"></div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'AccountHeader',
})
export default class AccountHeader extends Vue {
  switchNum = 0;

  switchItem(num: number) {
    this.switchNum = num;
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
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: bold;
    border: 1px solid #fff;
    border-radius: 10px;
    @include font_size($font_medium);
    @include no-wrap();
    height: 60px;
    margin-top: 20px;
    li {
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      &:nth-of-type(1) {
        border-right: 1px solid #fff;
      }
      &.active {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>
