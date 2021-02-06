<template>
  <div class="mini-player" v-show="isShowMiniPlayer">
    <div class="player-wrapper">
      <div class="player-left" @click="showNormalPlayer">
        <img
          src="https://p1.music.126.net/-EHFGXVwLwy7ra48lDKMfg==/109951165611159240.jpg"
        />
        <div class="player-title">
          <h3>演员</h3>
          <p>薛之谦</p>
        </div>
      </div>
      <div class="player-right">
        <div class="play"></div>
        <div class="list" @click.stop="showList"></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component({
  name: 'MiniPlayer',
})
export default class MiniPlayer extends Vue {
  showList() {
    this.$emit('showList');
  }

  @Getter('isShowMiniPlayer') isShowMiniPlayer;

  @Action('setFullScreen') setFullScreen;

  @Action('setMiniPlayer') setMiniPlayer;

  showNormalPlayer() {
    this.setFullScreen(true);
    this.setMiniPlayer(false);
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';

.mini-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 150px;
  z-index: 9999;

  .player-wrapper {
    width: 100%;
    height: 100%;
    @include bg_color();
    display: flex;
    align-items: center;
    justify-content: space-between;
    .player-left {
      display: flex;
      padding-left: 30px;
      width: 50%;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .player-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        @include font_color();
        h3 {
          @include font_size($font_medium);
        }
        p {
          @include font_size($font_small);
        }
      }
    }
    .player-right {
      display: flex;
      align-items: center;
      .play {
        width: 84px;
        height: 84px;
        @include bg_img('../../assets/images/play');
        &.active {
          @include bg_img('../../assets/images/pause');
        }
      }
      .list {
        width: 120px;
        height: 120px;
        @include bg_img('../../assets/images/list');
      }
    }
  }
}
</style>
