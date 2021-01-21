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
