import {
  getBanner,
  getPersonalized,
  getNewAlbum,
  getNewSong,
  getDetail,
  getAlbum,
} from '@/api/index';
import {
  SET_BANNERS,
  SET_PERSONALIZED,
  SET_NEW_ALBUMS,
  SET_NEW_SONGS,
  SET_DETAIL,
  SET_ALBUM_DATA,
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
};
