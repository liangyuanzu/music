import { SET_BANNERS, SET_PERSONALIZED, SET_NEW_ALBUMS } from './mutations-type';

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
};
