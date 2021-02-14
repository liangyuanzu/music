import {
  getBanner,
  getPersonalized,
  getNewAlbum,
  getNewSong,
  getDetail,
  getAlbum,
  getSongDetail,
  getSongLyric,
  getSongURL,
} from '@/api/index';
import { parseLyric } from '@/helpers';
import {
  SET_BANNERS,
  SET_PERSONALIZED,
  SET_NEW_ALBUMS,
  SET_NEW_SONGS,
  SET_DETAIL,
  SET_ALBUM_DATA,
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_LIST_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC,
  SET_DEL_SONG,
  SET_CURRENT_INDEX,
  SET_CURRENT_TIME,
  SET_TOTAL_TIME,
  SET_FAVORITE_SONG,
  SET_FAVORITE_LIST,
} from './mutations-type';

export default {
  async getBannerData({ commit }, type: number) {
    const { banners } = await getBanner(type);
    commit(SET_BANNERS, banners);
  },

  async getPersonalizedData({ commit }, limit: number) {
    const { result } = await getPersonalized(limit);
    commit(SET_PERSONALIZED, result);
  },

  async getNewAlbumData({ commit }) {
    const { albums } = await getNewAlbum();
    commit(SET_NEW_ALBUMS, albums);
  },

  async getNewSongData({ commit }, limit?: number) {
    const { result } = await getNewSong(limit);
    commit(SET_NEW_SONGS, result);
  },

  async getDetailData({ commit }, id: number) {
    const { playlist } = await getDetail(id);
    commit(SET_DETAIL, playlist);
  },

  async getAlbumData({ commit }, id: number) {
    const { album, songs } = await getAlbum(id);
    commit(SET_ALBUM_DATA, { album, songs });
  },

  setFullScreen({ commit }, flag: boolean) {
    commit(SET_FULL_SCREEN, flag);
  },

  setMiniPlayer({ commit }, flag: boolean) {
    commit(SET_MINI_PLAYER, flag);
  },

  setListPlayer({ commit }, flag: boolean) {
    commit(SET_LIST_PLAYER, flag);
  },

  setIsPlaying({ commit }, flag: boolean) {
    commit(SET_IS_PLAYING, flag);
  },

  setModeType({ commit }, type: number) {
    commit(SET_MODE_TYPE, type);
  },

  async setSongDetail({ commit }, ids: Array<number>) {
    const { songs } = await getSongDetail(ids.join(','));
    const { data: urls } = await getSongURL(ids.join(','));
    const list: any = [];
    songs.forEach((val) => {
      const obj: any = {};
      urls.forEach((item) => {
        if (val.id === item.id) obj.url = item.url;
      });
      obj.id = val.id;
      obj.name = val.name;
      let singer = '';
      val.ar.forEach((item, index) => {
        if (index === 0) {
          singer = item.name;
        } else {
          singer += `-${item.name}`;
        }
      });
      obj.singer = singer;
      obj.picUrl = val.al.picUrl;
      list.push(obj);
    });
    commit(SET_SONG_DETAIL, list);
  },

  async setSongLyric({ commit }, id: number) {
    const {
      lrc: { lyric },
    } = await getSongLyric(id);
    const obj = parseLyric(lyric);
    commit(SET_SONG_LYRIC, obj);
  },

  setDelSong({ commit }, index?: number) {
    commit(SET_DEL_SONG, index);
  },

  setCurrentIndex({ commit }, index: number) {
    commit(SET_CURRENT_INDEX, index);
  },

  setCurrentTime({ commit }, time: number) {
    commit(SET_CURRENT_TIME, time);
  },

  setTotalTime({ commit }, time: number) {
    commit(SET_TOTAL_TIME, time);
  },

  setFavoriteSong({ commit }, song: object) {
    commit(SET_FAVORITE_SONG, song);
  },

  setFavoriteList({ commit }, list: Array<object>) {
    commit(SET_FAVORITE_LIST, list);
  },
};
