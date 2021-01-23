<template>
  <div class="detail">
    <SubHeader :title="detail.name"></SubHeader>
    <DetailTop :src="detail.coverImgUrl"></DetailTop>
    <DetailBottom :playlist="detail.tracks"></DetailBottom>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import SubHeader from '../components/SubHeader.vue';
import DetailTop from '../components/DetailTop.vue';
import DetailBottom from '../components/DetailBottom.vue';

@Component({
  name: 'Detail',
  components: {
    SubHeader,
    DetailTop,
    DetailBottom,
  },
})
export default class Detail extends Vue {
  @Getter('detail') detail;

  @Action('getDetailData') getDetail;

  created() {
    this.getDetail(this.$route.params.id);
  }
}
</script>

<style lang='scss' scoped>
.detail {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
