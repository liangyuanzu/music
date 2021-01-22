<template>
  <div>
    <div class="song">
      <div class="song-top">
        <h3>最新音乐</h3>
      </div>
      <ul class="song-list">
        <li v-for="item in newSongs" :key="item.id" class="item">
          <img v-lazy="item.song.album.picUrl" />
          <div>
            <h3>{{ item.name }}</h3>
            <p>{{ item.song.artists[0].name }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'SongList'
})
export default class SongList extends Vue {
  @Prop({ default: [] }) readonly newSongs: Array<object>;
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/mixin';
@import '@/assets/css/variable';

.song {
  width: 100%;
  @include bg_sub_color();
  .song-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    h3 {
      @include font_size($font_large);
      font-weight: bold;
      @include font_color();
      &:before {
        content: '';
        border: 2px solid;
        @include border_color();
        margin-right: 10px;
      }
    }
  }
  .song-list {
    width: 100%;
    overflow: hidden;
    .item {
      width: 100%;
      height: 150px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      border-bottom: 1px solid #ccc;
      img {
        width: 100px;
        height: 100px;
        border-radius: 20px;
        margin-right: 20px;
      }
      div {
        width: 70%;
        h3 {
          @include font_size($font_large);
          @include font_color();
          @include no-wrap();
        }
        p {
          @include font_size($font_small);
          @include font_color();
          @include no-wrap();
          opacity: 0.6;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
