
chrome.browserAction.onClicked.addListener(function () {
  chrome.management.getSelf(function (res) {
    chrome.tabs.create({ url: 'chrome-extension://' + res.id + '/index.html#normal' });
  })
  // chrome.tabs.create({ url: 'chrome://newtab' });
});

chrome.webRequest.onHeadersReceived.addListener(
  function (info) {
    var headers = info.responseHeaders;
    for (var i = headers.length - 1; i >= 0; --i) {
      var header = headers[i].name.toLowerCase();
      if (header == 'x-frame-options' || header == 'frame-options') {
        headers.splice(i, 1); // Remove header
      }
    }
    return { responseHeaders: headers };
  },
  {
    urls: ['*://*/*'], // Pattern to match all http(s) pages
    types: ['sub_frame']
  },
  ['blocking', 'responseHeaders']
);
