<template>
  <div>
    <div class="personalized">
      <div class="personalized-top">
        <h3>{{ title }}</h3>
      </div>
      <div class="personalized-list">
        <div
          class="item"
          v-for="item in personalized"
          :key="item.id"
          @click="selectItem(item.id)"
        >
          <div class="item-top">
            <img v-lazy="item.picUrl" class="bg" />
            <span class="play-count" v-if="item.playCount">
              <img :src="playCountImgUrl" alt="" />
              <span>{{ formatPlayCount(item.playCount) }}</span>
            </span>
          </div>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
import config from '@/config/config';

@Component({
  name: 'Personalized',
})
export default class Personalized extends Vue {
  id: number;

  playCountImgUrl = config.playCountImgUrl;

  @Prop({ default: [] }) readonly personalized: Array<object>;

  @Prop({ default: '' }) readonly title: string;

  @Prop({ default: '' }) readonly type: string;

  @Emit('select')
  send() {
    return {
      id: this.id,
      type: this.type,
    };
  }

  selectItem(id: number) {
    this.id = id;
    this.send();
  }

  formatPlayCount(count: number) {
    if (count > 0 && count < 100000) return count;
    if (count < 100000000) {
      // 大于等于 10万 小于 1亿
      if ((count / 10000) % 1 > 0) {
        const num = Math.floor(+(count / 10000) * 10) / 10;
        return num % 1 === 0 ? `${num.toFixed(0)}万` : `${num}万`;
      }
      return `${(count / 10000).toFixed(0)}万`;
    }
    // 大于等于 1亿
    if ((count / 100000000) % 1 > 0) {
      const num = Math.floor(+(count / 100000000) * 10) / 10;
      return num % 1 === 0 ? `${num.toFixed(0)}亿` : `${num}亿`;
    }
    return `${(count / 10000).toFixed(0)}亿`;
  }
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
      position: relative;
      .item-top {
        .bg {
          width: 200px;
          height: 200px;
          border-radius: 20px;
        }
        .play-count {
          position: absolute;
          top: 20px;
          right: 10px;
          img {
            width: 24px;
            height: 24px;
            vertical-align: middle;
            margin-right: 5px;
          }
          span {
            @include font_size($font_small);
            color: #fff;
          }
        }
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
