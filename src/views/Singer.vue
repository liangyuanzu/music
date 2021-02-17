<template>
  <div class="singer">
    <div class="singer-wrapper">
      <ScrollView ref="scrollview">
        <ul class="list-wrapper">
          <li
            class="list-group"
            v-for="(item, index) in artistList"
            :key="index"
            ref="group"
          >
            <h2 class="group-title">{{ letters[index] }}</h2>
            <ul>
              <li
                class="group-item"
                v-for="artist in artistList[index]"
                :key="artist.id"
              >
                <img v-lazy="artist.img1v1Url" alt="" />
                <p>{{ artist.name }}</p>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
      <ul class="list-letters">
        <li
          v-for="(letter, index) in letters"
          :key="letter"
          :class="{ active: currentIndex === index }"
          :data-index="index"
          @touchstart.stop.prevent="touchstart"
          @touchmove.stop.prevent="touchmove"
        >
          {{ letter }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import ScrollView from '../components/ScrollView.vue';

@Component({
  name: 'Singer',
  components: {
    ScrollView,
  },
})
export default class Singer extends Vue {
  groupsTop = [];

  currentIndex = 0;

  beginOffsetY = 0;

  moveOffsetY = 0;

  get letters() {
    const keys = ['热'];
    for (let i = 65; i < 91; i += 1) {
      const char = String.fromCharCode(i);
      keys.push(char);
    }
    keys.push('#');
    return keys;
  }

  @Getter('artistList') artistList;

  @Action('setArtistList') setArtistList;

  @Watch('artistList')
  onArtistListChanged() {
    this.$nextTick(() => {
      this.groupsTop = (this.$refs.group as any).map((i) => i.offsetTop);
    });
  }

  created() {
    const letters = [...this.letters];
    letters.splice(0, 1, '-1');
    letters.splice(letters.length - 1, 1, '0');
    const list = letters.map((initial, index) => {
      if (index === 0) return { initial, limit: 5 };
      return { initial, limit: 10 };
    });
    this.setArtistList(list);
  }

  mounted() {
    this.$nextTick(() => {
      (this.$refs.scrollview as any).scrolling((y) => {
        // 处理第一个区域
        if (y >= 0) {
          this.currentIndex = 0;
          return;
        }
        // 处理中间区域
        for (let i = 0; i < this.groupsTop.length - 1; i += 1) {
          const preTop = this.groupsTop[i];
          const nextTop = this.groupsTop[i + 1];
          if (-y >= preTop && -y <= nextTop) {
            this.currentIndex = i;
            return;
          }
        }
        // 处理最后一个区域
        this.currentIndex = this.groupsTop.length - 1;
      });
    });
  }

  private letterDown(index: number) {
    this.currentIndex = index;
    const offsetY = this.groupsTop[index];
    (this.$refs.scrollview as any).scrollTo(0, -offsetY);
  }

  touchstart(e) {
    const index = +e.target.dataset.index;
    this.letterDown(index);
    this.beginOffsetY = e.touches[0].pageY;
  }

  touchmove(e) {
    this.moveOffsetY = e.touches[0].pageY;
    const offsetY =
      (this.moveOffsetY - this.beginOffsetY) / e.target.offsetHeight;
    let index = +e.target.dataset.index + Math.floor(offsetY);
    if (index < 0) {
      index = 0;
    } else if (index > this.letters.length - 1) {
      index = this.letters.length - 1;
    }
    this.letterDown(index);
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';

.singer {
  width: 100%;
  height: 100%;
  .singer-wrapper {
    position: fixed;
    top: 184px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    @include bg_sub_color();
    .list-wrapper {
      .list-group {
        .group-title {
          @include bg_color();
          @include font_size($font_medium);
          color: #fff;
          padding: 10px 20px;
          box-sizing: border-box;
        }
        .group-item {
          display: flex;
          justify-content: flex-start;
          padding: 10px 20px;
          border-bottom: 1px solid #ccc;
          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
          }
          p {
            @include font_size($font_medium);
            @include font_color();
            display: flex;
            align-items: center;
            margin-left: 20px;
          }
        }
      }
    }
    .list-letters {
      position: fixed;
      right: 10px;
      top: 60%;
      transform: translateY(-50%);
      li {
        @include font_color();
        @include font_size($font_medium_s);
        padding: 3px 0;
        text-align: center;
        &.active {
          @include font_active_color();
        }
      }
    }
  }
}
</style>
