<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="list-player" v-show="isShowListPlayer">
      <div class="player-wrapper">
        <div class="player-top">
          <div class="top-left">
            <div class="mode loop" @click="mode" ref="mode"></div>
            <p v-if="modeType === 0">顺序播放</p>
            <p v-else-if="modeType === 1">单曲循环</p>
            <p v-else>随机播放</p>
          </div>
          <div class="top-right">
            <div class="del"></div>
          </div>
        </div>
        <div class="player-middle">
          <ScrollView ref="scrollView">
            <ul>
              <li class="item" v-for="item in songs" :key="item.id">
                <div class="item-left">
                  <div class="item-play" @click="play" ref="play"></div>
                  <p>{{ item.name }}</p>
                </div>
                <div class="item-right">
                  <div class="item-favorite"></div>
                  <div class="item-del"></div>
                </div>
              </li>
            </ul>
          </ScrollView>
        </div>
        <div class="player-bottom">
          <p @click.stop="hidden">关闭</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';
import config from '@/config/config';
import ScrollView from '../ScrollView.vue';

@Component({
  name: 'ListPlayer',
  components: {
    ScrollView,
  },
})
export default class ListPlayer extends Vue {
  @Getter('isShowListPlayer') isShowListPlayer;

  @Getter('isPlaying') isPlaying;

  @Getter('modeType') modeType;

  @Getter('songs') songs;

  @Action('setListPlayer') setListPlayer;

  @Action('setIsPlaying') setIsPlaying;

  @Action('setModeType') setModeType;

  @Watch('isPlaying')
  onIsPlayingChanged(val: boolean) {
    if (val) {
      (this.$refs.play as any).classList.add('active');
    } else {
      (this.$refs.play as any).classList.remove('active');
    }
  }

  @Watch('modeType')
  onModeTypeChanged(val: number) {
    if (val === (config as any).mode.loop) {
      (this.$refs.mode as any).classList.remove('random');
      (this.$refs.mode as any).classList.add('loop');
    } else if (val === (config as any).mode.one) {
      (this.$refs.mode as any).classList.remove('loop');
      (this.$refs.mode as any).classList.add('one');
    } else if (val === (config as any).mode.random) {
      (this.$refs.mode as any).classList.remove('one');
      (this.$refs.mode as any).classList.add('random');
    }
  }

  @Watch('isShowListPlayer')
  onIsShowListPlayerChanged(flag: boolean) {
    if (flag) {
      (this.$refs.scrollView as any).refresh();
    }
  }

  hidden() {
    this.setListPlayer(false);
  }

  enter(el, done) {
    Velocity(el, 'transition.fadeIn', { duration: 500 }, () => {
      done();
    });
  }

  leave(el, done) {
    Velocity(el, 'transition.fadeOut', { duration: 500 }, () => {
      done();
    });
  }

  play() {
    this.setIsPlaying(!this.isPlaying);
  }

  mode() {
    if (this.modeType === (config as any).mode.loop) {
      this.setModeType((config as any).mode.one);
    } else if (this.modeType === (config as any).mode.one) {
      this.setModeType((config as any).mode.random);
    } else if (this.modeType === (config as any).mode.random) {
      this.setModeType((config as any).mode.loop);
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';

.list-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 99999;
  @include bg_sub_color();
  .player-wrapper {
    .player-top {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left {
        display: flex;
        align-items: center;
        padding-left: 20px;
        .mode {
          width: 56px;
          height: 56px;
          margin-right: 20px;
          &.loop {
            @include bg_img('../../assets/images/small_loop');
          }
          &.one {
            @include bg_img('../../assets/images/small_one');
          }
          &.random {
            @include bg_img('../../assets/images/small_shuffle');
          }
        }
        p {
          @include font_size($font_medium_s);
          @include font_color();
        }
      }
      .top-right {
        .del {
          width: 84px;
          height: 84px;
          @include bg_img('../../assets/images/small_del');
        }
      }
    }
    .player-middle {
      height: 700px;
      overflow: hidden;
      .item {
        border-top: 1px solid #ccc;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        .item-left {
          display: flex;
          align-items: center;
          .item-play {
            width: 56px;
            height: 56px;
            margin-right: 20px;
            @include bg_img('../../assets/images/small_play');
            &.active {
              @include bg_img('../../assets/images/small_pause');
            }
          }
          p {
            @include font_size($font_medium_s);
            @include font_color();
          }
        }
        .item-right {
          display: flex;
          align-items: center;
          .item-favorite {
            width: 56px;
            height: 56px;
            @include bg_img('../../assets/images/small_un_favorite');
          }
          .item-del {
            width: 52px;
            height: 52px;
            margin-left: 20px;
            @include bg_img('../../assets/images/small_close');
          }
        }
      }
    }
    .player-bottom {
      width: 100%;
      height: 100px;
      line-height: 100px;
      @include bg_color();
      p {
        text-align: center;
        color: #fff;
        @include font_size($font_medium);
      }
    }
  }
}
</style>
