<template>
  <div>排行</div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component({
  name: 'Rank',
})
export default class Rank extends Vue {
  @Action('setRankCategory') setRankCategory;

  created() {
    this.setRankCategory();
  }
}
</script>

<style lang='scss' scoped>
</style>
