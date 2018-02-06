import React, { Component } from 'react';
import Container from './component/container';
import Blank from './pages/Blank';
import Github from './pages/Github';
import History from './pages/History';
import Document from './pages/Document';
import Linux from './pages/Linux';
import Search from './pages/Search';

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {
          title: '空白页',
          type: 'blank',
        }, {
          title: '搜索',
          type: 'search',
        }, {
          title: '命令大全',
          type: 'linux',
        }, {
          title: '开发文档',
          type: 'document',
        }, {
          title: '趋势榜',
          type: 'trending',
        }, {
          title: '历史记录',
          type: 'history',
        },
      ],
    };
  }
  render() {
    const { config } = this.props;
    config.menus = this.state.menu;
    return (
      <Container config={config} >
        <Blank />
        <History />
        <Github />
        <Document />
        <Linux />
        <Search />
      </Container>
    );
  }
}
