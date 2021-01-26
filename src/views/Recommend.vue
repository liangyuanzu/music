<template>
  <div class="recommend">
    <div class="recommend-warpper">
      <ScrollView>
        <div>
          <Banner :banners="banners"></Banner>
          <Personalized
            :personalized="personalized"
            title="推荐歌单"
            type="personalized"
            @select="fatherSelectItem"
          ></Personalized>
          <Personalized
            :personalized="newAlbums"
            title="最新专辑"
            type="album"
            @select="fatherSelectItem"
          ></Personalized>
          <SongList :newSongs="newSongs"></SongList>
        </div>
      </ScrollView>
    </div>

    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import Banner from '../components/Recommend/Banner.vue';
import Personalized from '../components/Recommend/Personalized.vue';
import SongList from '../components/Recommend/SongList.vue';
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

  fatherSelectItem({ id, type }) {
    this.$router.push({
      path: `/recommend/detail/${id}/${type}`,
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

.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0%);
}
.v-enter-active {
  transition: transform 0.5s;
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: transform 0.5s;
}
</style>
