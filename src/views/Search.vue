<template>
  <div class="search">
    <div class="search-box">
      <img :src="searchImgUrl" alt="" />
      <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="keyword" />
    </div>
    <div class="search-suggest" v-show="keyword">
      <ScrollView>
        <ul>
          <li>
            <img :src="searchImgUrl" alt="" />
            <p>演员 - 薛之谦</p>
          </li>
        </ul>
      </ScrollView>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import config from '@/config/config';
import ScrollView from '../components/ScrollView.vue';

@Component({
  name: 'Search',
  components: {
    ScrollView,
  },
})
export default class Search extends Vue {
  searchImgUrl = config.searchImgUrl;

  keyword = '';
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
