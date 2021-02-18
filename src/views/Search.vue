<template>
  <div class="search">
    <div class="search-box">
      <img :src="searchImgUrl" alt="" />
      <input
        type="text"
        placeholder="搜索歌曲、歌手、专辑"
        v-model="keywords"
        v-debounce="search"
      />
    </div>
    <div class="search-suggest" v-show="keywords">
      <ScrollView>
        <ul>
          <li
            v-for="song in searchList"
            :key="song.id"
            @click.stop="selectMusic(song.id)"
          >
            <img :src="searchImgUrl" alt="" />
            <p>{{ song.name }} - {{ song.ar[0].name }}</p>
          </li>
        </ul>
      </ScrollView>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import config from '@/config/config';
import ScrollView from '../components/ScrollView.vue';

@Component({
  name: 'Search',
  components: {
    ScrollView,
  },
  // 自定义局部指令
  directives: {
    debounce: {
      inserted(el, binding) {
        let timer;
        el.addEventListener('input', () => {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            binding.value();
          }, 500);
        });
      },
    },
  },
})
export default class Search extends Vue {
  searchImgUrl = config.searchImgUrl;

  keywords = '';

  @Getter('searchList') searchList;

  @Action('setSearchList') setSearchList;

  @Action('setFullScreen') setFullScreen;

  @Action('setSongDetail') setSongDetail;

  @Action('setCurrentIndex') setCurrentIndex;

  search() {
    this.setSearchList(this.keywords);
  }

  selectMusic(id: number) {
    this.setFullScreen(true);
    this.setSongDetail([id]);
    this.setCurrentIndex(0);
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';

.search {
  position: fixed;
  left: 0;
  right: 0;
  top: 184px;
  bottom: 0;
  @include bg_sub_color();
  .search-box {
    display: flex;
    align-items: center;
    margin: 40px 20px;
    background: #ebecec;
    border-radius: 30px;
    border-bottom: 1px solid #ccc;
    img {
      width: 40px;
      height: 40px;
      margin-left: 20px;
    }
    input {
      border: none;
      outline: none;
      background: transparent;
      @include font_size($font_medium);
      height: 60px;
      margin-left: 20px;
    }
  }
  .search-suggest {
    position: fixed;
    left: 0;
    right: 0;
    top: 300px;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
    li {
      display: flex;
      align-items: center;
      padding: 20px 40px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      img {
        width: 40px;
        height: 40px;
      }
      p {
        margin-left: 20px;
        @include font_color();
        @include font_size($font_medium);
      }
    }
  }
}
</style>
