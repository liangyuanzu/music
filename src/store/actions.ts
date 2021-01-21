import { getBanner } from '@/api/index';
import { SET_BANNERS } from './mutations-type';

export default {
  async getBannerData({ commit }, type: number) {
    const { banners } = await getBanner(type);
    commit(SET_BANNERS, banners);
  },
};
