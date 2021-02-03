export default {
  banners(state): Array<object> {
    return state.banners;
  },

  personalized(state): Array<object> {
    return state.personalized;
  },

  newAlbums(state): Array<object> {
    return state.newAlbums.splice(0, 6);
  },

  newSongs(state): Array<object> {
    return state.newSongs;
  },

  detail(state): object {
    return state.detail;
  },

  albumData(state): object {
    return state.albumData;
  },

  isFullScreen(state): boolean {
    return state.isFullScreen;
  },
};
