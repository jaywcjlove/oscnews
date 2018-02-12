
chrome.browserAction.onClicked.addListener(function () {
  chrome.management.getSelf(function (res) {
    chrome.tabs.create({ url: 'chrome-extension://' + res.id + '/index.html#normal' });
  });
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
      csp = csp.replace(/frame-ancestors (.*?);/ig, "");
      // header.value = csp;
      header.value = csp + 'sandbox;';
    } else if (isFrameHeader) {
      header.value = 'ALLOWALL';
    }
    return header
  });
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