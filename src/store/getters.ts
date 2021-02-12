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

  isShowMiniPlayer(state): boolean {
    return state.isShowMiniPlayer;
  },

  isShowListPlayer(state): boolean {
    return state.isShowListPlayer;
  },

  isPlaying(state): boolean {
    return state.isPlaying;
  },

  modeType(state): number {
    return state.modeType;
  },

  songs(state): Array<object> {
    return state.songs;
  },

  currentSong(state): object {
    let obj = {
      name: '',
      singer: '',
      picUrl: null,
    };
    if (state.songs.length !== 0) {
      obj = state.songs[state.currentIndex];
    }
    return obj;
  },
};
