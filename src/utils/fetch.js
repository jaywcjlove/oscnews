import BlockFetch from './BlockFetch';

/**
 * fetchInterval
 * @param {String} url 请求 URL
 * @param {Number} intervals 请求间隔时间
 * @param {Boolean} isDelayed 是否延迟
 */
export function fetchInterval(url, intervals, intervalsType) {
  const isFetch = BlockFetch(intervalsType || url, intervals);
  return !isFetch ? new Promise((resolve, reject) => {
    if (isFetch) resolve('');
    else {
      reject(new Error('wait...'));
    }
  }) : fetch(url).then((response) => {
    return response.text();
  });
}

export function fetchTimely(url) {
  return fetch(url).then((response) => {
    return response.text();
  });
}
