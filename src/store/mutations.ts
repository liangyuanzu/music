import { SET_BANNERS } from './mutations-type';

export default {
  [SET_BANNERS](state, list: Array<object>) {
    state.banners = list;
  },
};
