import {
  SET_BANNERS,
  SET_PERSONALIZED,
  SET_NEW_ALBUMS,
  SET_NEW_SONGS,
  SET_DETAIL,
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
};
