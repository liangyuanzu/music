<template>
  <div class="detail-top">
    <div class="img-container">
      <img :src="src" alt="" />
      <div class="mask" ref="mask"></div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'DetailTop',
})
export default class DetailTop extends Vue {
  @Prop({ default: '' }) readonly src: string;

  changeMask(opacity: number) {
    (this.$refs.mask as any).style.opacity = opacity;
  }
}
</script>

<style lang='scss' scoped>
.detail-top {
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
  }
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    background: #000;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>
