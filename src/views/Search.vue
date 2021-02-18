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
    <div class="search-hot">
      <h3>热门搜索</h3>
      <ul>
        <li
          v-for="item in searchHots"
          :key="item.first"
          @click.stop="selectHot(item.first)"
        >
          {{ item.first }}
        </li>
      </ul>
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

  @Getter('searchHots') searchHots;

  @Action('setSearchList') setSearchList;

  @Action('setFullScreen') setFullScreen;

  @Action('setSongDetail') setSongDetail;

  @Action('setCurrentIndex') setCurrentIndex;

  @Action('setSearchHots') setSearchHots;

  created() {
    this.setSearchHots();
  }

  search() {
    this.setSearchList(this.keywords);
  }

  selectMusic(id: number) {
    this.setFullScreen(true);
    this.setSongDetail([id]);
    this.setCurrentIndex(0);
  }

  selectHot(name: string) {
    this.keywords = name;
    this.search();
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
      width: 100%;
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
  .search-hot {
    h3 {
      @include font_color();
      @include font_size($font_medium);
      padding: 10px 20px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        height: 60px;
        line-height: 60px;
        border: 1px solid #000;
        border-radius: 30px;
        padding: 0 20px;
        @include font_color();
        @include font_size($font_medium_s);
        margin: 10px 20px;
      }
    }
  }
}
</style>
