import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './index.less';

const storage = chrome.storage.sync;

storage.get(['oscconfig', 'visible', 'conf'], (items) => {
  // 默认顶部菜单，和新闻是否展示判断
  if (!items.visible) items.visible = {};
  if (items.visible.header === undefined) items.visible.header = true;
  if (items.visible.newBar === undefined) items.visible.newBar = true;

  // 默认选中的栏目
  if (!items.conf) items.conf = {};
  // 默认展示页面
  if (!items.conf.pageType) items.conf.pageType = 'document';
  // 默认新闻展示tab类型
  if (!items.conf.oscType) items.conf.oscType = '';
  // 默认新闻展示宽度设置
  if (!items.conf.siderBarWidth) items.conf.siderBarWidth = 360;
  // 开发文档导航设置
  if (!items.conf.docTag) items.conf.docTag = '';
  if (!items.conf.docStar) items.conf.docStar = [];
  // GitHub趋势榜设置
  if (!items.conf.githubSince) items.conf.githubSince = '';
  if (!items.conf.githubLang) items.conf.githubLang = '';

  items.storage = storage;

  ReactDOM.render(
    <Root config={items} />,
    document.getElementById('root')
  );
});
