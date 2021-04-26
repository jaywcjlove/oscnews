import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './index.less';

// eslint-disable-next-line
const storage = chrome.storage.sync;

storage.get(['oscconfig', 'visible', 'conf', 'dbs', 'todo'], (items) => {
  // 默认顶部菜单，和新闻是否展示判断
  if (!items.visible) items.visible = {};
  if (items.visible.header === undefined) items.visible.header = true;
  if (items.visible.newBar === undefined) items.visible.newBar = true;
  // 数据存储
  if (!items.dbs) items.dbs = {};
  if (items.dbs.nav === undefined) items.dbs.nav = [];

  // 默认清单(Todo)数据内容
  if (!items.todo) items.todo = {};
  if (items.todo.active < 0) items.todo.active = 0;
  if (!items.todo.list) {
    items.todo.list = [
      { label: '旅游', list: [] },
      { label: '私人', list: [] },
      { label: '家庭', list: [] },
      {
        label: '工作',
        list: [
          {
            id: new Date().getTime(), // TODO ID
            task: '欢迎使用 TODO 任务清单！', // 任务描述
            complete: false, // 完成状态
            comment: '这里放任务注释！', // 注释
            star: false, // 是否收藏
          },
          {
            id: (new Date().getTime()) + 1, // TODO ID
            task: '开发 TODO 功能！', // 任务描述
            complete: true, // 完成状态
            comment: '这里放任务注释！', // 注释
            star: false, // 是否收藏
          },
        ],
      },
    ];
  }

  // 默认选中的栏目
  if (!items.conf) items.conf = {};
  // 默认是否在新标签页显示
  if (items.conf.isNewTab === undefined) items.conf.isNewTab = true;
  // 默认是否在界面上展示 OSC 新闻，包括隐藏按钮
  if (items.conf.isHideOSC === undefined) items.conf.isHideOSC = true;
  // 默认是否隐藏导航
  if (items.conf.isHideNav === undefined) items.conf.isHideNav = true;
  // 默认是否在新标签页显示
  if (items.conf.historyTabType === undefined) items.conf.historyTabType = 'today';
  // 默认展示页面
  if (!items.conf.pageType) items.conf.pageType = 'document';
  // 默认新闻展示tab类型
  if (!items.conf.oscType) items.conf.oscType = '';
  // 默认新闻展示宽度设置
  if (!items.conf.siderBarWidth) items.conf.siderBarWidth = 360;
  // 开发文档导航设置
  if (!items.conf.docTag) items.conf.docTag = '';
  if (!items.conf.docStar) items.conf.docStar = [];
  // 空白页背景颜色
  if (!items.conf.BlankColor) items.conf.BlankColor = 'clouds';
  // GitHub趋势榜设置
  if (!items.conf.githubSince) items.conf.githubSince = '';
  if (!items.conf.githubLang) items.conf.githubLang = '';
  // 搜索默认选中设置
  if (!items.conf.selectType) items.conf.selectType = 'web';
  if (!items.conf.selectSubType) items.conf.selectSubType = ''; // 为空默认数组第一个

  items.storage = storage;
  if (!/#normal$/.test(window.location.hash) && items.conf.isNewTab === false) {
    // eslint-disable-next-line
    chrome.tabs.update({ url: 'chrome-search://local-ntp/local-ntp.html' });
  } else {
    ReactDOM.render(
      <Root config={items} />,
      document.getElementById('root')
    );
  }
});
