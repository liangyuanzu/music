<template>
  <div>
    <NormalPlayer :curTime="curTime"></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer></ListPlayer>
    <audio
      :src="currentSong.url"
      ref="audio"
      @timeupdate="timeupdate"
      @ended="end"
    ></audio>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import config from '@/config/config';
import { getRandomIntInclusive, localStore } from '@/helpers';
import NormalPlayer from '../components/Player/NormalPlayer.vue';
import MiniPlayer from '../components/Player/MiniPlayer.vue';
import ListPlayer from '../components/Player/ListPlayer.vue';

@Component({
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer,
  },
})
export default class Player extends Vue {
  curTime = 0;

  @Getter('currentSong') currentSong;

  @Getter('isPlaying') isPlaying;

  @Getter('currentIndex') currentIndex;

  @Getter('currentTime') currentTime;

  @Getter('modeType') modeType;

  @Getter('songs') songs;

  @Getter('favoriteList') favoriteList;

  @Action('setTotalTime') setTotalTime;

  @Action('setCurrentIndex') setCurrentIndex;

  @Action('setFavoriteList') setFavoriteList;

  @Watch('isPlaying')
  onIsPlayingChanged(val: boolean) {
    if (val) {
      (this.$refs.audio as any).play();
    } else {
      (this.$refs.audio as any).pause();
    }
  }

  @Watch('currentIndex')
  onCurrentIndexChanged() {
    (this.$refs.audio as any).oncanplay = () => {
      this.setTotalTime((this.$refs.audio as any).duration);
      if (this.isPlaying) {
        (this.$refs.audio as any).play();
      } else {
        (this.$refs.audio as any).pause();
      }
    };
  }

  @Watch('currentTime')
  onCurrentTimeChanged(val: number) {
    (this.$refs.audio as any).currentTime = val;
  }

  @Watch('favoriteList')
  onFavoriteListChanged(list: Array<object>) {
    localStore.set('favoriteList', list);
  }

  created() {
    const favoriteList = localStore.get('favoriteList');
    if (favoriteList) this.setFavoriteList(favoriteList);
  }

  mounted() {
    (this.$refs.audio as any).oncanplay = () => {
      this.setTotalTime((this.$refs.audio as any).duration);
    };
  }

  timeupdate(e) {
    this.curTime = e.target.currentTime;
  }

  end() {
    if (this.modeType === (config as any).mode.loop) {
      this.setCurrentIndex(this.currentIndex + 1);
    } else if (this.modeType === (config as any).mode.one) {
      (this.$refs.audio as any).play();
    } else if (this.modeType === (config as any).mode.random) {
      const index = getRandomIntInclusive(0, this.songs.length - 1);
      this.setCurrentIndex(index);
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
