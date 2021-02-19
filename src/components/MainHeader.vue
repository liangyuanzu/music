<template>
  <Header :isChangeTheme="true" class="header">
    <div slot="left" class="header-left"></div>
    <div slot="center" class="header-title">网易云音乐</div>
    <div slot="right" class="header-right" @click.stop="accountClick"></div>
  </Header>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Header from './Header.vue';

@Component({
  name: 'MainHeader',
  components: {
    Header,
  },
})
export default class MainHeader extends Vue {
  accountClick() {
    this.$router.push('/account');
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/mixin';
@import '@/assets/css/variable';

.header {
  .header-left {
    @include bg_img('../assets/images/logo');
  }

  .header-right {
    @include bg_img('../assets/images/account');
  }

  .header-title {
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
  }
}
</style>
