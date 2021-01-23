<template>
  <div class="detail-top">
    <div class="img-container">
      <img :src="src" alt="" />
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
}
</script>

<style lang='scss' scoped>
.detail-top {
  width: 100%;
  height: 500px;
  overflow: hidden;
  img {
    width: 100%;
  }
}
</style>
