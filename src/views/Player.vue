<template>
  <div>
    <NormalPlayer :curTime="curTime"></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer></ListPlayer>
    <audio :src="currentSong.url" ref="audio" @timeupdate="timeupdate"></audio>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
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

  @Action('setTotalTime') setTotalTime;

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

  mounted() {
    (this.$refs.audio as any).oncanplay = () => {
      this.setTotalTime((this.$refs.audio as any).duration);
    };
  }

  timeupdate(e) {
    this.curTime = e.target.currentTime;
  }
}
</script>

<style lang='scss' scoped>
</style>
