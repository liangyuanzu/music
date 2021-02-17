/**
 * 判断arr是否为一个数组
 * @return {boolean}
 */
function isArray(arr): boolean {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

/**
 * 深度克隆
 * @return {any}
 */
function deepClone(obj): any {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    // 原始类型直接返回
    return obj;
  }
  const o = isArray(obj) ? [] : {};
  Object.keys(obj).forEach((i) => {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
    }
  });
  return o;
}

export default deepClone;
