import { $request } from '@/helpers';

/**
 * 获取 Banner 数据
 * @param {number} type 0: pc 1: android 2: iphone 3: ipad
 * */
export function getBanner(type: number): Promise<any> {
  return $request('/api/banner', {
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
  return $request('/api/personalized', {
    params: {
      limit,
    },
  });
}

/**
 * 获取最新专辑
 * */
export function getNewAlbum(): Promise<any> {
  return $request('/api/album/newest', {});
}

/**
 * 获取最新音乐
 * @param {number} limit 取出数量 , 默认为 10
 * */
export function getNewSong(limit?: number): Promise<any> {
  return $request('/api/personalized/newsong', {
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
  return $request('/api/playlist/detail', {
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
  return $request('/api/album', {
    params: {
      id,
    },
  });
}
