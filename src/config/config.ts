export default {
  mode: {
    // 播放模式
    loop: 0,
    one: 1,
    random: 2,
  },
  category: {
    officialList: [
      { name: '飙升榜', id: 3 },
      { name: '新歌榜', id: 0 },
      { name: '原创榜', id: 2 },
      { name: '热歌榜', id: 1 },
    ],
    recList: [
      { name: '云音乐说唱榜', id: 23 },
      { name: '云音乐电音榜', id: 25 },
      { name: '云音乐欧美新歌榜', id: 32 },
      { name: '黑胶VIP爱听榜', id: 26 },
      { name: '云音乐ACG榜', id: 22 },
      { name: '云音乐古典榜', id: 24 },
    ],
    globalList: [
      { name: '美国Billboard榜', id: 6 },
      { name: 'UK排行榜周榜', id: 5 },
      { name: 'Beatport全球电子舞曲榜', id: 21 },
      { name: '日本Oricon榜', id: 10 },
      { name: 'iTunes榜', id: 8 },
      { name: '法国 NRJ Vos Hits 周榜', id: 29 },
    ],
    otherList: [
      { name: 'KTV唛榜', id: 7 },
      { name: '云音乐日语榜', id: 19 },
      { name: '云音乐韩语榜', id: 27 },
      { name: '云音乐欧美热歌榜', id: 28 },
      { name: '云音乐ACG游戏榜', id: 30 },
      { name: '云音乐民谣榜', id: 31 },
    ],
    titles: {
      officialList: '官方榜',
      recList: '推荐榜',
      globalList: '全球榜',
      otherList: '更多榜单',
    },
  },
};
