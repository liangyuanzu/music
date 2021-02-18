<template>
  <div class="detail">
    <DetailHeader :title="data.title"></DetailHeader>
    <DetailTop :src="data.img" ref="top"></DetailTop>
    <div class="bottom">
      <ScrollView ref="scrollview">
        <DetailBottom :playlist="data.songs"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import DetailHeader from '../components/Detail/DetailHeader.vue';
import DetailTop from '../components/Detail/DetailTop.vue';
import DetailBottom from '../components/Detail/DetailBottom.vue';
import ScrollView from '../components/ScrollView.vue';

@Component({
  name: 'Detail',
  components: {
    DetailHeader,
    DetailTop,
    DetailBottom,
    ScrollView,
  },
})
export default class Detail extends Vue {
  data = {};

  @Getter('detail') detail;

  @Getter('albumData') albumData;

  @Getter('artistSongs') artistSongs;

  @Getter('topList') topList;

  @Action('getDetailData') getDetail;

  @Action('getAlbumData') getAlbum;

  @Action('setArtistSongs') setArtistSongs;

  @Action('setTopList') setTopList;

  async created() {
    switch (this.$route.params.type) {
      case 'personalized':
        await this.getDetail(this.$route.params.id);
        this.data = {
          title: this.detail.name,
          img: this.detail.coverImgUrl,
          songs: this.detail.tracks,
        };
        break;

      case 'album':
        await this.getAlbum(this.$route.params.id);
        this.data = {
          title: this.albumData.album.name,
          img: this.albumData.album.picUrl,
          songs: this.albumData.songs,
        };
        break;

      case 'singer':
        await this.setArtistSongs(this.$route.params.id);
        this.data = {
          title: this.artistSongs.artist.name,
          img: this.artistSongs.artist.picUrl,
          songs: this.artistSongs.hotSongs,
        };
        break;

      case 'rank':
        await this.setTopList(this.$route.params.id);
        this.data = {
          title: this.topList.name,
          img: this.topList.creator.backgroundUrl,
          songs: this.topList.tracks,
        };
        break;

      default:
        break;
    }
  }

  mounted() {
    const defaultHeight = (this.$refs.top as any).$el.offsetHeight;
    (this.$refs.scrollview as any).scrolling((offsetY) => {
      if (offsetY < 0) {
        // 向上滚动
        // 高斯模糊效果是非常消耗性能的, 不推荐在移动端中使用; 如果非要在移动端中使用, 那么建议只设置一次
        // const blur = (10 * Math.abs(offsetY)) / defaultHeight;
        // (this.$refs.top as any).$el.style.filter = `blur(${blur}px)`;
        // 使用 mask 替换高斯模糊
        const opacity = Math.abs(offsetY) / defaultHeight;
        (this.$refs.top as any).changeMask(opacity);
      } else {
        // 向下滚动
        const scale = 1 + offsetY / defaultHeight;
        (this.$refs.top as any).$el.style.transform = `scale(${scale})`;
      }
    });
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/mixin';
@import '@/assets/css/variable';

.detail {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  @include bg_sub_color();

  .bottom {
    position: fixed;
    top: 500px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
