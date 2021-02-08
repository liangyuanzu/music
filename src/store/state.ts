import config from '@/config/config';

export default {
  banners: [],
  personalized: [],
  newAlbums: [],
  newSongs: [],
  detail: {},
  albumData: {},
  isFullScreen: false, // 默认播放界面显示/隐藏
  isShowMiniPlayer: false,
  isShowListPlayer: false,
  isPlaying: false,
  modeType: (config as any).mode.loop, // 播放模式
};
