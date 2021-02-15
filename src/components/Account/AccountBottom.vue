<template>
  <div class="account-bottom">
    <div class="bottom-play">
      <span></span>
      <span @click="selectAllMusic">播放全部</span>
    </div>
    <div class="bottom-wrapper">
      <ScrollView>
        <SongListItem
          :newSongs="switchNum === 0 ? favoriteList : historyList"
        ></SongListItem>
      </ScrollView>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter, Mutation, Action } from 'vuex-class';
import ScrollView from '../ScrollView.vue';
import SongListItem from '../SongListItem.vue';

@Component({
  name: 'AccountBottom',
  components: {
    ScrollView,
    SongListItem,
  },
})
export default class AccountBottom extends Vue {
  @Prop({ default: 0, required: true }) switchNum: number;

  @Getter('favoriteList') favoriteList;

  @Getter('historyList') historyList;

  @Mutation('SET_SONG_DETAIL') SET_SONG_DETAIL;

  @Action('setFullScreen') setFullScreen;

  @Action('setCurrentIndex') setCurrentIndex;

  selectAllMusic() {
    if (this.switchNum === 0) {
      this.SET_SONG_DETAIL(this.favoriteList);
    } else {
      this.SET_SONG_DETAIL(this.historyList);
    }
    this.setFullScreen(true);
    this.setCurrentIndex(0);
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';

.account-bottom {
  position: fixed;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
  .bottom-play {
    width: 260px;
    height: 60px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    @include border_color();
    border-radius: 30px;
    span {
      display: inline-block;
      &:nth-of-type(1) {
        width: 46px;
        height: 46px;
        @include bg_img('../../assets/images/small_play');
        margin-right: 20px;
      }
    }
  }
  .bottom-wrapper {
    position: fixed;
    top: 200px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}
</style>
