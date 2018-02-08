
import Blank from './pages/Blank';
import Github from './pages/Github';
import Historys from './pages/History';
import Documents from './pages/Document';
import Linux from './pages/Linux';
import Search from './pages/Search';

export const getNavData = () => [
  {
    title: '空白页',
    type: 'blank',
    component: Blank,
  }, {
    title: '搜索',
    type: 'search',
    component: Search,
  }, {
    title: '命令大全',
    type: 'linux',
    component: Linux,
  }, {
    title: '开发文档',
    type: 'document',
    component: Documents,
  }, {
    title: '趋势榜',
    type: 'trending',
    component: Github,
  }, {
    title: '历史记录',
    type: 'history',
    component: Historys,
  },
];
