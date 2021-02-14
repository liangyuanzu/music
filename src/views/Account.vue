<template>
  <transition appear>
    <div class="account">
      <AccountHeader></AccountHeader>
    </div>
  </transition>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import AccountHeader from '../components/Account/AccountHeader.vue';

@Component({
  name: 'Account',
  components: {
    AccountHeader,
  },
})
export default class Account extends Vue {}
</script>

<style lang='scss' scoped>
.account {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: red;
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
