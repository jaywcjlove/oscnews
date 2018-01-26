export default function BlockFetch(key = 'old-fetch-time', time = 2) {
  let oldTime = localStorage.getItem(key);
  const newTime = new Date().getTime();
  if (!oldTime) {
    localStorage.setItem(key, newTime);
    return true;
  }
  oldTime = parseInt(oldTime, 10);

  const intervals = parseInt(((newTime - oldTime) / 1000 / 60), 10);
  if (intervals >= time) {
    localStorage.setItem(key, newTime);
    return true;
  }
  return false;
}
