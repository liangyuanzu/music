<template>
  <Header class="header">
    <div slot="left" class="header-left" @click.stop="$router.back(-1)"></div>
    <p slot="center" class="header-title">{{ title }}</p>
  </Header>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import Header from '../Header.vue';

@Component({
  name: 'SubHeader',
  components: {
    Header,
  },
})
export default class SubHeader extends Vue {
  @Prop({ default: '' }) readonly title: string;
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';

.header {
  .header-left {
    @include bg_img('../../assets/images/back');
  }

  .header-title {
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
    @include no-wrap();
  }
}
</style>
