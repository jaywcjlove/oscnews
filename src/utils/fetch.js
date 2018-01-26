import BlockFetch from './BlockFetch';

export default function fetchs(url, intervals) {
  const isFetch = BlockFetch(url, intervals);
  if (!isFetch) {
    return new Promise((resolve, reject) => {
      if (isFetch) resolve('');
      else {
        reject(new Error('wait...'));
      }
    });
  }
  return fetch(url).then((response) => {
    return response.text();
  });
}
