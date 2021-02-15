<template>
  <div>
    <div class="song">
      <div class="song-top">
        <h3>最新音乐</h3>
      </div>
      <SongListItem :newSongs="newSongs"></SongListItem>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import SongListItem from '../SongListItem.vue';

@Component({
  name: 'NewSongs',
  components: {
    SongListItem,
  },
})
export default class NewSongs extends Vue {
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
}
</style>
