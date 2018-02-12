
chrome.browserAction.onClicked.addListener(function () {
  chrome.management.getSelf(function (res) {
    chrome.tabs.create({ url: 'chrome-extension://' + res.id + '/index.html#normal' });
  })
  // chrome.tabs.create({ url: 'chrome://newtab' });
});


chrome.webRequest.onHeadersReceived.addListener(details => {
  const responseHeaders = details.responseHeaders.map(header => {
    const isCSPHeader = /content-security-policy/i.test(header.name);
    const isFrameHeader = /x-frame-options/i.test(header.name);
    if (isCSPHeader) {
      let csp = header.value
      // csp = csp.replace('script-src', `script-src ${hosts}`)
      // csp = csp.replace('style-src', `style-src ${hosts}`)
      // csp = csp.replace('frame-src', `frame-src ${iframeHosts}`)
      // csp = csp.replace('child-src', `child-src ${hosts}`)
      csp = csp.replace(/frame-ancestors (.*?);/ig, "")
      // console.log('csp::', csp);
      header.value = csp;
    } else if (isFrameHeader) {
      header.value = 'ALLOWALL';
    }
    return header
  });
  // var headers = responseHeaders;
  // for (var i = headers.length - 1; i >= 0; --i) {
  //   var header = headers[i].name.toLowerCase();
  //   if (header === 'x-frame-options' || header === 'frame-options') {
  //     headers.splice(i, 1); // Remove header
  //   }
  //   // Refused to display 'https://github.com/search?q=chrome.tabs.create' in a frame because an ancestor violates the following 
  //   // Content Security Policy directive: "frame-ancestors 'none'".
  // }
  // console.log('headers:', headers)
  return { responseHeaders };
},
  {
    urls: ['<all_urls>', '*://*/*'],
    types: ['sub_frame']
  },
  [
    'blocking',
    'responseHeaders'
  ]
)