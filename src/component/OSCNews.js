import React, { PureComponent } from 'react';
import classNames from 'classnames';
import fetchs from '../utils/fetch';
import styles from './OSCNews.less';

const osctype = localStorage.getItem('osc-type');
const osclist = localStorage.getItem('osc-list');
const messgeIcon = '<svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2904"><path d="M768 384C732.672 384 704 412.672 704 448 704 483.328 732.672 512 768 512 803.328 512 832 483.328 832 448 832 412.672 803.328 384 768 384L768 384ZM512 832C474.624 832 438.528 827.648 403.84 820.256L253.184 910.816 255.2 762.368C139.712 692.928 64 578.112 64 448 64 235.936 264.576 64 512 64 759.424 64 960 235.936 960 448 960 660.096 759.424 832 512 832L512 832ZM512 0C229.248 0 0 200.608 0 448 0 589.408 75.04 715.328 192 797.408L192 1024 416.288 887.904C447.328 893.024 479.264 896 512 896 794.752 896 1024 695.424 1024 448 1024 200.608 794.752 0 512 0L512 0ZM256 384C220.672 384 192 412.672 192 448 192 483.328 220.672 512 256 512 291.328 512 320 483.328 320 448 320 412.672 291.328 384 256 384L256 384ZM512 384C476.672 384 448 412.672 448 448 448 483.328 476.672 512 512 512 547.328 512 576 483.328 576 448 576 412.672 547.328 384 512 384L512 384Z" p-id="2905"></path></svg>';

export default class OSCNews extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newList: osclist || 'loading...',
      newType: osctype || '', // industry | project
      newPage: 1,
      newTabs: [
        {
          title: '全部',
          type: '',
        }, {
          title: '综合资讯',
          type: 'industry',
        }, {
          title: '软件更新',
          type: 'project',
        }
      ],
    };
  }
  componentDidMount() {
    this.getNewsList();
  }
  getNewsList() {
    const { newType, newList, newPage } = this.state;
    localStorage.setItem('osc-type', newType);
    fetchs(`http://www.oschina.net/action/ajax/get_more_news_list?newsType=${this.state.newType}&p=${this.state.newPage}`).then((response) => {
      response = response.replace(/<a\b[^>]+\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (node, url, text) => {
        if (/^\//.test(url)) {
          node = `<a href="http://www.oschina.net${url}" class="title">${text}</a>`;
        }
        return node;
      }).replace(/<img\b[^>]+\bsrc="([^"]*)"[^>]/gi, (node, url) => {
        if (/^\//.test(url)) {
          return node.replace(url, `https://static.oschina.net${url}`);
        }
        return node;
      }).replace(/<svg[\s\S]*?<\/svg>/gi, (node) => {
        return messgeIcon;
      });
      this.setState({
        newList: response,
      },() => {
        localStorage.setItem('osc-list', response);
      });
    }).catch((error)=>{
      this.setState({
        newList: osclist || `请求错误，请检查网路！`,
      })
    })
  }
  onChangeTab(item) {
    this.setState({
      newType: item.type,
      newPage: 1,
    }, () => {
      this.getNewsList();
    })
  }
  render() {
    const { newType, newTabs } = this.state;
    return (
      <div className={styles.warpper}>
        <div className={styles.tabs}>
          {newTabs.map((item, idx) => {
            return <div key={idx} className={classNames({
              'active': item.type === newType
            })} onClick={this.onChangeTab.bind(this, item)}>{item.title}</div>
          })}
        </div>
        <div className={styles.newList} dangerouslySetInnerHTML={{ __html: this.state.newList }} />
      </div>
    );
  }
}