<template>
  <div class="singer">
    <div class="singer-wrapper">
      <ScrollView>
        <ul class="list-wrapper">
          <li
            class="list-group"
            v-for="(item, index) in artistList"
            :key="index"
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
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import ScrollView from '../components/ScrollView.vue';

@Component({
  name: 'Singer',
  components: {
    ScrollView,
  },
})
export default class Singer extends Vue {
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
  }
}
</style>
