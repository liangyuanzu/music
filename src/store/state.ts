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
  songs: [], // 歌曲详情
  currentSong: {},
  currentIndex: 0,
  currentLyric: {},
  currentTime: 0, // 当前播放时间
  totalTime: 0, // 当前歌曲总时长
};
