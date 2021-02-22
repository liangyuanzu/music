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
    <ul class="search-history">
      <li
        v-for="item in searchHistory"
        :key="item"
        @click.stop="selectHistory(item)"
      >
        <div class="history-left">
          <img :src="timeImgUrl" alt="" />
          <p>{{ item }}</p>
        </div>
        <div class="history-right">
          <img @click.stop="delHistory(item)" :src="delImgUrl" alt="" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { localStore } from '@/helpers';
import config from '@/config/config';
import MetaInfo from '../../vue-meta-info';
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
  metaInfo: MetaInfo.search,
})
export default class Search extends Vue {
  searchImgUrl = config.searchImgUrl;

  timeImgUrl = config.timeImgUrl;

  delImgUrl = config.delImgUrl;

  keywords = '';

  searchHistory: string[] = [];

  @Getter('searchList') searchList;

  @Getter('searchHots') searchHots;

  @Action('setSearchList') setSearchList;

  @Action('setFullScreen') setFullScreen;

  @Action('setSongDetail') setSongDetail;

  @Action('setCurrentIndex') setCurrentIndex;

  @Action('setSearchHots') setSearchHots;

  @Watch('searchHistory')
  onSearchHistoryChanged(list: Array<string>) {
    localStore.set('searchHistory', list);
  }

  created() {
    this.setSearchHots();
    const searchHistory = localStore.get('searchHistory');
    if (searchHistory) this.searchHistory = searchHistory;
  }

  search() {
    if (this.keywords) this.setSearchList(this.keywords);
  }

  selectMusic(id: number) {
    this.setFullScreen(true);
    this.setSongDetail([id]);
    this.setCurrentIndex(0);
    if (this.searchHistory.includes(this.keywords)) {
      this.searchHistory = this.searchHistory.filter(
        (i) => i !== this.keywords
      );
    }
    this.searchHistory.unshift(this.keywords);
    this.keywords = '';
  }

  selectHot(name: string) {
    this.keywords = name;
    this.search();
  }

  delHistory(name: string) {
    this.searchHistory = this.searchHistory.filter((i) => i !== name);
  }

  selectHistory(name: string) {
    this.keywords = name;
    this.search();
    this.searchHistory = this.searchHistory.filter((i) => i !== name);
    this.searchHistory.unshift(name);
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
  .search-history {
    margin-top: 20px;
    li {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      .history-left {
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
        }
        p {
          margin-left: 20px;
          @include font_color();
          @include font_size($font_medium_s);
        }
      }
      .history-right {
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>
