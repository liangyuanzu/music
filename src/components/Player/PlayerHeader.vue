<template>
  <div class="header">
    <div class="left" @click="hiddenNormalPlayer"></div>
    <div class="title">
      <h3>{{ currentSong.name }}</h3>
      <p>{{ currentSong.singer }}</p>
    </div>
    <div class="right"></div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

@Component({
  name: 'PlayerHeader',
})
export default class PlayerHeader extends Vue {
  @Getter('currentSong') currentSong;

  @Action('setMiniPlayer') setMiniPlayer;

  hiddenNormalPlayer() {
    this.setMiniPlayer(true);
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
