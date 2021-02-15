<template>
  <ul class="song-list">
    <li
      v-for="item in newSongs"
      :key="item.id"
      class="item"
      @click="selectMusic(item.id)"
    >
      <img v-lazy="item.picUrl" />
      <div>
        <h3>{{ item.name }}</h3>
        <p>{{ item.name }}</p>
      </div>
    </li>
  </ul>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component({
  name: 'SongListItem',
})
export default class SongListItem extends Vue {
  @Prop({ default: [] }) readonly newSongs: Array<object>;

  @Action('setFullScreen') setFullScreen;

  @Action('setSongDetail') setSongDetail;

  selectMusic(id: number) {
    this.setFullScreen(true);
    this.setSongDetail([id]);
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/mixin';
@import '@/assets/css/variable';

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
</style>
