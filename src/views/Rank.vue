<template>
  <div class="rank">
    <div class="rank-wrapper">
      <ScrollView>
        <ul>
          <li v-for="(title, key) in rankCategory.titles" :key="title">
            <h3 class="group-title">{{ title }}</h3>
            <ul class="normal-group" v-if="title === '官方榜'">
              <li
                v-for="item in rankCategory[key]"
                :key="item.rank.id"
                @click.stop="selectedItem(item.rank.id)"
              >
                <div class="rank-left">
                  <img v-lazy="item.rank.coverImgUrl" alt="" />
                  <p>{{ item.rank.updateFrequency }}</p>
                </div>
                <div class="rank-right">
                  <p
                    v-for="(song, index) in item.rank.tracks"
                    :key="song.first"
                  >
                    {{ index }}.{{ song.first }} - {{ song.second }}
                  </p>
                </div>
              </li>
            </ul>
            <ul class="other-group" v-else>
              <li
                v-for="item in rankCategory[key]"
                :key="item.rank.id"
                @click.stop="selectedItem(item.rank.id)"
              >
                <div class="rank-top">
                  <img v-lazy="item.rank.coverImgUrl" alt="" />
                  <p>{{ item.rank.updateFrequency }}</p>
                </div>
                <div class="rank-bottom">
                  <p>{{ item.rank.name }}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
    </div>

    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import ScrollView from '../components/ScrollView.vue';

@Component({
  name: 'Rank',
  components: {
    ScrollView,
  },
})
export default class Rank extends Vue {
  @Getter('rankCategory') rankCategory;

  @Action('setRankCategory') setRankCategory;

  created() {
    this.setRankCategory();
  }

  selectedItem(id: number) {
    this.$router.push({
      path: `/rank/detail/${id}/rank`,
    });
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';

.rank {
  width: 100%;
  height: 100%;
  .rank-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 184px;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
    .group-title {
      padding: 10px 20px;
      box-sizing: border-box;
      @include font_color();
      @include font_size($font_large);
      font-weight: bold;
    }
    .normal-group {
      li {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        box-sizing: border-box;
        .rank-left {
          position: relative;
          img {
            width: 200px;
            height: 200px;
            border-radius: 10px;
          }
          p {
            position: absolute;
            left: 10px;
            bottom: 10px;
            color: #fff;
            @include font_size($font_medium_s);
          }
        }
        .rank-right {
          margin-left: 20px;
          p {
            @include font_color();
            @include font_size($font_medium_s);
            padding: 10px 0;
          }
        }
      }
    }
    .other-group {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        padding: 10px 20px;
        box-sizing: border-box;
        .rank-top {
          position: relative;
          img {
            width: 200px;
            height: 200px;
            border-radius: 10px;
          }
          p {
            position: absolute;
            left: 10px;
            bottom: 10px;
            color: #fff;
            @include font_size($font_medium_s);
          }
        }
        .rank-bottom {
          width: 200px;
          p {
            padding: 10px 0;
            @include font_color();
            @include font_size($font_medium_s);
            @include no-wrap();
          }
        }
      }
    }
  }
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
