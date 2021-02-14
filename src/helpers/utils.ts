/**
 * 格式化歌词
 * @param {string} lrc 歌词
 * @return {object}
 */
export function parseLyric(lrc: string) {
  const lyrics = lrc.split('\n');
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  const reg1 = /\[\d*:\d*\.\d*\]/g;
  // 2.定义正则表达式提取 [00
  const reg2 = /\[\d*/i;
  // 3.定义正则表达式提取 :00
  const reg3 = /:\d*/i;
  // 4.定义对象保存处理好的歌词
  const lyricObj = {};
  lyrics.forEach((lyric: string) => {
    // 1.提取时间
    const timeStr = lyric.match(reg1);
    if (!timeStr) return;
    // timeStr = timeStr[0];
    const time: any = timeStr[0];
    // 2.提取分钟
    const minStr = time.match(reg2)[0].substr(1);
    // 3.提取秒钟
    const secondStr = time.match(reg3)[0].substr(1);
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    const newTime = parseInt(minStr, 10) * 60 + parseInt(secondStr, 10);
    // 5.处理歌词
    const text = lyric.replace(reg1, '').trim();
    // 6.保存数据
    lyricObj[newTime] = text;
  });
  return lyricObj;
}

/**
 * 格式化时间
 * @param {number} time 时间
 * @return {object}
 */
export function formatTime(time: number): object {
  // 2.得到两个时间之间的差值(秒)
  const differSecond = time;
  // 3.利用相差的总秒数 / 每一天的秒数 = 相差的天数
  let day: any = Math.floor(differSecond / (60 * 60 * 24));
  day = day >= 10 ? day : `0${day}`;
  // 4.利用相差的总秒数 / 小时 % 24;
  let hour: any = Math.floor((differSecond / (60 * 60)) % 24);
  hour = hour >= 10 ? hour : `0${hour}`;
  // 5.利用相差的总秒数 / 分钟 % 60;
  let minute: any = Math.floor((differSecond / 60) % 60);
  minute = minute >= 10 ? minute : `0${minute}`;
  // 6.利用相差的总秒数 % 秒数
  let second: any = Math.floor(differSecond % 60);
  second = second >= 10 ? second : `0${second}`;
  return {
    day,
    hour,
    minute,
    second,
  };
}

/**
 * 生成随机数 (含最大值，含最小值)
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @return {number}
 */
export function getRandomIntInclusive(min: number, max: number): number {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
}

/**
 * 对象转字符串
 * @return {any}
 */
export function obj2string(data: any): any {
  if (typeof data === 'string' || typeof data === 'number') return data;
  if (typeof data === 'object') return JSON.stringify(data);
  return '';
}

/**
 * 字符串转对象
 * @return {any}
 */
export function string2obj(data: any): any {
  if (!data) return '';
  let value;
  try {
    value = JSON.parse(data);
  } catch {
    value = data;
  }
  return value;
}
