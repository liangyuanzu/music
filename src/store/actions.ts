import { getBanner, getPersonalized, getNewAlbum } from '@/api/index';
import { SET_BANNERS, SET_PERSONALIZED, SET_NEW_ALBUMS } from './mutations-type';

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
};
