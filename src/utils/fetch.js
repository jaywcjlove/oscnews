export default function fetchs(url) {
  return fetch(url).then((response) => {
    return response.text();
  });
}
