import { $request, $requestAll } from '@/helpers';

/**
 * 获取 Banner 数据
 * @param {number} type 0: pc 1: android 2: iphone 3: ipad
 * */
export function getBanner(type: number): Promise<any> {
  return $request('/banner', {
    params: {
      type,
    },
  });
}

/**
 * 获取推荐歌单
 * @param {number} limit 取出数量 , 默认为 30
 * */
export function getPersonalized(limit: number): Promise<any> {
  return $request('/personalized', {
    params: {
      limit,
    },
  });
}

/**
 * 获取最新专辑
 * */
export function getNewAlbum(): Promise<any> {
  return $request('/album/newest', {});
}

/**
 * 获取最新音乐
 * @param {number} limit 取出数量 , 默认为 10
 * */
export function getNewSong(limit?: number): Promise<any> {
  return $request('/personalized/newsong', {
    params: {
      limit,
    },
  });
}

/**
 * 获取歌单详情
 * @param {number} id 歌单 id
 * */
export function getDetail(id: number): Promise<any> {
  return $request('/playlist/detail', {
    params: {
      id,
    },
  });
}

/**
 * 获取专辑内容
 * @param {number} id 专辑 id
 * */
export function getAlbum(id: number): Promise<any> {
  return $request('/album', {
    params: {
      id,
    },
  });
}

/**
 * 获取歌曲详情
 * @param {string} ids 音乐 id (支持多个 id, 用 , 隔开)
 * */
export function getSongDetail(ids: string): Promise<any> {
  return $request('/song/detail', {
    params: {
      ids,
    },
  });
}

/**
 * 获取歌词
 * @param {number} id 音乐 id
 * */
export function getSongLyric(id: number): Promise<any> {
  return $request('/lyric', {
    params: {
      id,
    },
  });
}

/**
 * 歌手分类列表
 * @param {number} limit 返回数量 , 默认为 30
 * @param {number} offset 偏移数量，用于分页, 默认为 0
 * @param {string} initial 按首字母索引查找参数 热门传-1, #传0
 * @param {number} type -1:全部 1:男歌手 2:女歌手 3:乐队
 * @param {number} area -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
 * */
export function getArtistList({
  initial,
  limit = 30,
  offset = 0,
  type = -1,
  area = -1,
}): Promise<any> {
  return $request('/artist/list', {
    params: {
      limit,
      offset,
      initial,
      type,
      area,
    },
  });
}

/**
 * 获取所有歌手分类列表
 * @param Array<object> list 每个请求的参数列表
 * */
export function getAllArtists(list: Array<object>): Promise<any> {
  const requests = list.map((item: any) => getArtistList(item));
  return new Promise((resolve, reject) => {
    $requestAll(requests)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 获取歌手单曲
 * @param {number} id 歌手 id
 * */
export function getArtistSongs(id: number): Promise<any> {
  return $request('/artists', {
    params: {
      id,
    },
  });
}

/**
 * 所有榜单内容摘要
 * */
export function getTopListDetail(): Promise<any> {
  return $request('/toplist/detail', {});
}

/**
 * 搜索
 *
 * @param {string} keywords 关键词 (必选)
 * @param {number} limit 返回数量 , 默认为 30
 * @param {number} offset 偏移数量，用于分页，默认为 0
 * @param {number} type 搜索类型，默认为 1。取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 * */
export function getSearchList({ keywords, limit = 30, offset = 0, type = 1 }): Promise<any> {
  return $request('/cloudsearch', {
    params: {
      keywords,
      limit,
      offset,
      type,
    },
  });
}

/**
 * 热搜列表(简略)
 * */
export function getSearchHots(): Promise<any> {
  return $request('/search/hot', {});
}
