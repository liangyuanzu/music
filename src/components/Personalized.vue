<template>
  <div>
    <div class="personalized">
      <div class="personalized-top">
        <h3>{{ title }}</h3>
      </div>
      <div class="personalized-list">
        <div class="item" v-for="item in personalized" :key="item.id">
          <img :src="item.picUrl" />
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'Personalized',
})
export default class Personalized extends Vue {
  @Prop({ default: [] }) readonly personalized: Array<object>;

  @Prop({ default: '' }) readonly title: string;
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/mixin';
@import '@/assets/css/variable';

.personalized {
  @include bg_sub_color();
  .personalized-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    h3 {
      @include font_size($font_large);
      font-weight: bold;
      @include font_color();
      &:before {
        content: '';
        border: 2px solid;
        @include border_color();
        margin-right: 10px;
      }
    }
  }
  .personalized-list {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .item {
      width: 200px;
      padding: 20px 0;
      img {
        width: 200px;
        height: 200px;
        border-radius: 20px;
      }
      p {
        @include clamp(2);
        @include font_color();
        @include font_size($font_medium_s);
        text-align: center;
        margin-top: 10px;
      }
    }
  }
}
</style>
