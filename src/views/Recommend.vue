<template>
  <div>
    <Banner :banners="banners"></Banner>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import Banner from '../components/Banner.vue';

@Component({
  name: 'Recommend',
  components: {
    Banner,
  },
})
export default class Recommend extends Vue {
  @Getter('banners') banners

  @Action('getBannerData') getBanner

  created() {
    this.getBanner(2);
  }
}
</script>

<style lang='scss' scoped>
</style>
