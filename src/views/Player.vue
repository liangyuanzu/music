<template>
  <div>
    <NormalPlayer></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer></ListPlayer>
    <audio :src="currentSong.url" ref="audio"></audio>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
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
  @Getter('currentSong') currentSong;

  @Getter('isPlaying') isPlaying;

  @Getter('currentIndex') currentIndex;

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
      if (this.isPlaying) {
        (this.$refs.audio as any).play();
      } else {
        (this.$refs.audio as any).pause();
      }
    };
  }
}
</script>

<style lang='scss' scoped>
</style>
