<template>
  <div>
    <Banner :banners="banners"></Banner>
    <Personalized :personalized="personalized" title="推荐歌单"></Personalized>
    <Personalized :personalized="newAlbums" title="最新专辑"></Personalized>
    <SongList :newSongs="newSongs"></SongList>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import Banner from '../components/Banner.vue';
import Personalized from '../components/Personalized.vue';
import SongList from '../components/SongList.vue';

@Component({
  name: 'Recommend',
  components: {
    Banner,
    Personalized,
    SongList
  },
})
export default class Recommend extends Vue {
  @Getter('banners') banners

  @Getter('personalized') personalized

  @Getter('newAlbums') newAlbums

  @Getter('newSongs') newSongs

  @Action('getBannerData') getBanner

  @Action('getPersonalizedData') getPersonalized

  @Action('getNewAlbumData') getNewAlbum

  @Action('getNewSongData') getNewSong

  created() {
    this.getBanner(2);
    this.getPersonalized(6);
    this.getNewAlbum();
    this.getNewSong();
  }
}
</script>

<style lang='scss' scoped>
</style>
