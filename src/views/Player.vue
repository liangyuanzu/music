<template>
  <div>
    <NormalPlayer></NormalPlayer>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import NormalPlayer from '../components/Player/NormalPlayer.vue';

@Component({
  name: 'Player',
  components: {
    NormalPlayer,
  },
})
export default class Player extends Vue {}
</script>

<style lang='scss' scoped>
</style>
