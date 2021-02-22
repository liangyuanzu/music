<template>
  <transition appear>
    <div class="account">
      <AccountHeader @switchItem="switchItem"></AccountHeader>
      <AccountBottom :switchNum="switchNum"></AccountBottom>
    </div>
  </transition>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import MetaInfo from '../../vue-meta-info';
import AccountHeader from '../components/Account/AccountHeader.vue';
import AccountBottom from '../components/Account/AccountBottom.vue';

@Component({
  name: 'Account',
  components: {
    AccountHeader,
    AccountBottom,
  },
  metaInfo: MetaInfo.account,
})
export default class Account extends Vue {
  switchNum = 0;

  switchItem(num: number) {
    this.switchNum = num;
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';

.account {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
}

.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0%);
}
.v-enter-active {
  transition: transform 0.5s;
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: transform 0.5s;
}
</style>
