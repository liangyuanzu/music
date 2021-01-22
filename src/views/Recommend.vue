<template>
  <div class="recommend">
    <div class="recommend-warpper">
      <ScrollView>
        <div>
          <Banner :banners="banners"></Banner>
          <Personalized
            :personalized="personalized"
            title="推荐歌单"
            @select="fatherSelectItem"
          ></Personalized>
          <Personalized
            :personalized="newAlbums"
            title="最新专辑"
            @select="fatherSelectItem"
          ></Personalized>
          <SongList :newSongs="newSongs"></SongList>
        </div>
      </ScrollView>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import Banner from '../components/Banner.vue';
import Personalized from '../components/Personalized.vue';
import SongList from '../components/SongList.vue';
import ScrollView from '../components/ScrollView.vue';

@Component({
  name: 'Recommend',
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView,
  },
})
export default class Recommend extends Vue {
  @Getter('banners') banners;

  @Getter('personalized') personalized;

  @Getter('newAlbums') newAlbums;

  @Getter('newSongs') newSongs;

  @Action('getBannerData') getBanner;

  @Action('getPersonalizedData') getPersonalized;

  @Action('getNewAlbumData') getNewAlbum;

  @Action('getNewSongData') getNewSong;

  created() {
    this.getBanner(2);
    this.getPersonalized(6);
    this.getNewAlbum();
    this.getNewSong();
  }

  fatherSelectItem(id: number) {
    this.$router.push({
      path: `/recommend/detail/${id}`,
    });
  }
}
</script>

<style lang='scss' scoped>
.recommend {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  .recommend-warpper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
