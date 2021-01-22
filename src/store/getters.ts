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
};
