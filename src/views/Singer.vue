<template>
  <div>歌手</div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

@Component({
  name: 'Singer',
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
</style>
