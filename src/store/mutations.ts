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
} from './mutations-type';

export default {
  [SET_BANNERS](state, list: Array<object>) {
    state.banners = list;
  },

  [SET_PERSONALIZED](state, list: Array<object>) {
    state.personalized = list;
  },

  [SET_NEW_ALBUMS](state, list: Array<object>) {
    state.newAlbums = list;
  },

  [SET_NEW_SONGS](state, list: Array<object>) {
    state.newSongs = list;
  },

  [SET_DETAIL](state, data: object) {
    state.detail = data;
  },

  [SET_ALBUM_DATA](state, data: object) {
    state.albumData = data;
  },

  [SET_FULL_SCREEN](state, flag: boolean) {
    state.isFullScreen = flag;
    if (flag) {
      state.isShowMiniPlayer = false;
    }
  },

  [SET_MINI_PLAYER](state, flag: boolean) {
    state.isShowMiniPlayer = flag;
  },

  [SET_LIST_PLAYER](state, flag: boolean) {
    state.isShowListPlayer = flag;
  },

  [SET_IS_PLAYING](state, flag: boolean) {
    state.isPlaying = flag;
  },

  [SET_MODE_TYPE](state, type: number) {
    state.modeType = type;
  },

  [SET_SONG_DETAIL](state, list: Array<object>) {
    state.songs = list;
  },

  [SET_SONG_LYRIC](state, lyric: object) {
    state.currentLyric = lyric;
  },

  [SET_DEL_SONG](state, index?: number) {
    if (index !== undefined) {
      state.songs.splice(index, 1);
      if (index < state.currentIndex) {
        state.currentIndex -= 1;
      }
    } else {
      state.songs = [];
    }
    if (state.songs.length === 0) {
      state.isFullScreen = false;
      state.isShowMiniPlayer = false;
      state.isShowListPlayer = false;
    }
  },

  [SET_CURRENT_INDEX](state, index: number) {
    state.currentIndex = index;
  },
};
