import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { fetchInterval, fetchTimely } from '../utils';
import styles from './OSCNews.module.less';

const messgeIcon = '<svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2904"><path d="M768 384C732.672 384 704 412.672 704 448 704 483.328 732.672 512 768 512 803.328 512 832 483.328 832 448 832 412.672 803.328 384 768 384L768 384ZM512 832C474.624 832 438.528 827.648 403.84 820.256L253.184 910.816 255.2 762.368C139.712 692.928 64 578.112 64 448 64 235.936 264.576 64 512 64 759.424 64 960 235.936 960 448 960 660.096 759.424 832 512 832L512 832ZM512 0C229.248 0 0 200.608 0 448 0 589.408 75.04 715.328 192 797.408L192 1024 416.288 887.904C447.328 893.024 479.264 896 512 896 794.752 896 1024 695.424 1024 448 1024 200.608 794.752 0 512 0L512 0ZM256 384C220.672 384 192 412.672 192 448 192 483.328 220.672 512 256 512 291.328 512 320 483.328 320 448 320 412.672 291.328 384 256 384L256 384ZM512 384C476.672 384 448 412.672 448 448 448 483.328 476.672 512 512 512 547.328 512 576 483.328 576 448 576 412.672 547.328 384 512 384L512 384Z" p-id="2905"></path></svg>';

export default class OSCNews extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newList: 'loading...',
      visible: props.visible.newBar,
      newType: props.conf.oscType, // '' | ndustry | project
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
        },
      ],
    };
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  componentDidMount() {
    this.mounted = true;
    this.setState({
      newList: this.getNewListStore(),
    });
    this.getNewsList();
  }
  getNewListStore() {
    const { newType } = this.state;
    return localStorage.getItem(`osc-list${newType}`);
  }
  getNewsList() {
    const { newType, newPage, visible } = this.state;
    const { storage, conf } = this.props;
    const newList = this.getNewListStore();
    if (!visible && newList) return;
    conf.oscType = newType;
    storage.set({ conf });
    fetchInterval(`https://www.oschina.net/action/ajax/get_more_news_list?newsType=${newType}&p=${newPage}`, 1).then((response) => {
      if (!this.mounted) return;
      const html = this.normalizeAjaxNewsHtml(response);
      if (this.isStaleNews(html)) throw new Error('stale_news');
      this.setState({
        newList: html,
      }, () => {
        localStorage.setItem(`osc-list${newType}`, html);
      });
    }).catch((error) => {
      const isBlockedByInterval = error && error.message === 'wait...';
      if (isBlockedByInterval) {
        if (!this.mounted) return;
        this.setState({
          newList: this.getNewListStore() || '请求错误，请检查网路！',
        });
        return;
      }
      fetchTimely(this.getRssURL(newType)).then((response) => {
        if (!this.mounted) return;
        const html = this.normalizeRssNewsHtml(response);
        this.setState({
          newList: html,
        }, () => {
          localStorage.setItem(`osc-list${newType}`, html);
        });
      }).catch(() => {
        if (!this.mounted) return;
        this.setState({
          newList: this.getNewListStore() || '请求错误，请检查网路！',
        });
      });
    });
  }
  normalizeAjaxNewsHtml(response) {
    return response.replace(/<a\b[^>]+\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (node, url, text) => {
      if (/^\//.test(url)) {
        node = `<a href="http://www.oschina.net${url}" class="title">${text}</a>`;
      }
      return node;
    }).replace(/<img\b[^>]+\bsrc="([^"]*)"[^>]/gi, (node, url) => {
      if (/^\//.test(url)) {
        return node.replace(url, `https://static.oschina.net${url}`);
      }
      return node;
    }).replace(/<svg[\s\S]*?<\/svg>/gi, () => {
      return messgeIcon;
    });
  }
  getRssURL(type = '') {
    const map = {
      '': 'https://www.oschina.net/news/rss',
      industry: 'https://www.oschina.net/news/industry/rss',
      project: 'https://www.oschina.net/news/project/rss',
    };
    return map[type] || map[''];
  }
  normalizeRssNewsHtml(xmlText) {
    const doc = new window.DOMParser().parseFromString(xmlText, 'application/xml');
    const list = Array.from(doc.querySelectorAll('item')).slice(0, 20);
    if (list.length < 1) return this.getNewListStore() || '暂无新闻数据';
    return list.map((item) => {
      const titleNode = item.querySelector('title');
      const linkNode = item.querySelector('link');
      const pubDateNode = item.querySelector('pubDate');
      const title = this.escapeHtml(titleNode ? titleNode.textContent : '无标题');
      const link = this.safeURL(linkNode ? linkNode.textContent : '#');
      const date = this.escapeHtml(pubDateNode ? pubDateNode.textContent : '');
      return `<div class="item"><a href="${link}" class="title"><span class="text-ellipsis">${title}</span></a><div class="from"><span class="mr">${date}</span></div></div>`;
    }).join('');
  }
  escapeHtml(text = '') {
    return String(text).replace(/[&<>"']/g, (char) => {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;',
      };
      return map[char] || char;
    });
  }
  safeURL(urlText = '') {
    try {
      const url = new URL(String(urlText), window.location.origin);
      if (!/^https?:$/.test(url.protocol)) return '#';
      return url.href;
    } catch (error) {
      return '#';
    }
  }
  isStaleNews(content = '') {
    const matches = content.match(/\b20\d{2}-\d{2}-\d{2}\b/g);
    if (!matches || matches.length < 1) return false;
    const latestTime = matches.reduce((max, dateString) => {
      const time = new Date(`${dateString}T00:00:00`).getTime();
      if (Number.isNaN(time)) return max;
      return Math.max(max, time);
    }, 0);
    if (!latestTime) return false;
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    return (Date.now() - latestTime) > sevenDays;
  }
  onChangeTab(item) {
    this.setState({
      newType: item.type,
      newPage: 1,
    }, () => {
      this.getNewsList();
    });
  }
  render() {
    const { newType, newTabs } = this.state;
    return (
      <div className={styles.warpper}>
        <div className={styles.tabs}>
          {newTabs.map((item, idx) => {
            return (
              <div key={idx}
                className={classNames({
                  active: item.type === newType,
                })}
                onClick={this.onChangeTab.bind(this, item)}
              >
                {item.title}
              </div>
            );
          })}
        </div>
        <div className={styles.newList} dangerouslySetInnerHTML={{ __html: this.state.newList }} />
      </div>
    );
  }
}
