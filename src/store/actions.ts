import { getBanner, getPersonalized } from '@/api/index';
import { SET_BANNERS, SET_PERSONALIZED } from './mutations-type';

export default {
  async getBannerData({ commit }, type: number) {
    const { banners } = await getBanner(type);
    commit(SET_BANNERS, banners);
  },

  async getPersonalizedData({ commit }, limit: number) {
    const { result } = await getPersonalized(limit);
    commit(SET_PERSONALIZED, result);
  },
};
