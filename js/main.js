fetch("http://www.oschina.net/action/ajax/get_more_news_list", {
  p:1,
  newsType:"project",
})
  .then(function (response) {
    return response.text();
  })
  .then(function (response) {
    response = response.replace(/<a\b[^>]+\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (node, url, text) => {
      if (/^\//.test(url)) {
        node = `<a href="http://www.oschina.net/${url}" class="title">${text}</a>`;
      }
      return node;
    });
    document.getElementById('list').innerHTML = response;
  })