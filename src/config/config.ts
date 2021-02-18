export default {
  mode: {
    // 播放模式
    loop: 0,
    one: 1,
    random: 2,
  },
  category: {
    officialList: [{ name: '飙升榜' }, { name: '新歌榜' }, { name: '原创榜' }, { name: '热歌榜' }],
    recList: [
      { name: '云音乐说唱榜' },
      { name: '云音乐电音榜' },
      { name: '云音乐欧美新歌榜' },
      { name: '黑胶VIP爱听榜' },
      { name: '云音乐ACG榜' },
      { name: '云音乐古典榜' },
    ],
    globalList: [
      { name: '美国Billboard榜' },
      { name: 'UK排行榜周榜' },
      { name: 'Beatport全球电子舞曲榜' },
      { name: '日本Oricon榜' },
      { name: 'iTunes榜' },
      { name: '法国 NRJ Vos Hits 周榜' },
    ],
    otherList: [
      { name: 'KTV唛榜' },
      { name: '云音乐日语榜' },
      { name: '云音乐韩语榜' },
      { name: '云音乐欧美热歌榜' },
      { name: '云音乐ACG游戏榜' },
      { name: '云音乐民谣榜' },
    ],
    titles: {
      officialList: '官方榜',
      recList: '推荐榜',
      globalList: '全球榜',
      otherList: '更多榜单',
    },
  },
};
