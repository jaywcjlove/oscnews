
function createTabs() {
  chrome.tabs.create({ url: 'chrome://newtab' });
}

chrome.browserAction.onClicked.addListener(createTabs);
