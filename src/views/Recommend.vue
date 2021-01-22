<template>
  <div>
    <Banner :banners="banners"></Banner>
    <Personalized :personalized="personalized" title="推荐歌单"></Personalized>
    <Personalized :personalized="newAlbums" title="最新专辑"></Personalized>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import Banner from '../components/Banner.vue';
import Personalized from '../components/Personalized.vue';

@Component({
  name: 'Recommend',
  components: {
    Banner,
    Personalized,
  },
})
export default class Recommend extends Vue {
  @Getter('banners') banners

  @Getter('personalized') personalized

  @Getter('newAlbums') newAlbums

  @Action('getBannerData') getBanner

  @Action('getPersonalizedData') getPersonalized

  @Action('getNewAlbumData') getNewAlbum

  created() {
    this.getBanner(2);
    this.getPersonalized(6);
    this.getNewAlbum();
  }
}
</script>

<style lang='scss' scoped>
</style>
