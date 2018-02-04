import React, { Component } from 'react';
import cheerio from 'cheerio';
import { fetchInterval, fetchTimely } from '../utils/';
import Footer from '../component/Footer';
import Select from '../component/Select';
import styles from './Github.less';
import optionLang from '../source/trending.json';

const githublist = localStorage.getItem('github-list');

export default class Github extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: githublist,
      option: [
        {
          label: '今天',
          value: '',
        }, {
          label: '本周',
          value: 'weekly',
        }, {
          label: '本月',
          value: 'monthly',
        },
      ],
      optionLang,
      since: localStorage.getItem('github-since') || '',
      lang: localStorage.getItem('github-lang') || '',
    };
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  componentDidMount() {
    this.mounted = true;
    this.getTrending();
  }
  getURL() {
    const { since, lang } = this.state;
    let url = 'https://github.com/trending';
    if (lang) url = `${url}/${lang}`;
    if (since) url = `${url}?since=${since}`;
    return url;
  }
  getTrending(type) {
    // const { content } = this.state;
    const localContent = localStorage.getItem('github-list');
    if (!localContent) type = 'select';
    const getDate = type === 'select' ? fetchTimely(this.getURL()) : fetchInterval(this.getURL(), 3, 'github-trending');
    getDate.then((response) => {
      response.replace(/<body\b[^>]*>([\s\S]*?)<\/body>/gi, (node, body) => {
        response = body;
        return node;
      });
      response = response.replace(/<a\b[^>]+\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (node, url, text) => {
        if (/^\//.test(url)) {
          node = `<a href="https://github.com${url}">${text}</a>`;
        }
        return node;
      });
      const $ = cheerio.load(response);
      // 清除头像，避免被和谐
      $('.f6 .mr-3').not('.mr-3:first-child').empty();
      const _html = $('div.explore-content').html();
      if (!_html) return;
      localStorage.setItem('github-list', _html);
      if (!this.mounted) return;
      this.setState({
        content: _html,
      });
    }).catch(() => {
      if (!this.mounted) return;
      this.setState({
        content: githublist || '请求错误，请检查网路，或者重新刷新请求数据！',
      });
    });
  }
  onSelect(type, item) {
    if (!type) return;
    this.setState({
      [`${type}`]: item.value,
    }, () => {
      localStorage.setItem(`github-${type}`, item.value);
      this.getTrending('select');
    });
  }
  render() {
    return (
      <div className={styles.warpper}>
        <div className={styles.header}>
          <span className={styles.title}><a target="_blank" rel="noopener noreferrer" href="http://github.com/trending">Github Trending</a></span>
          <div className={styles.select}>
            <Select onSelect={this.onSelect.bind(this, 'since')} value={this.state.since} option={this.state.option} />
            <Select onSelect={this.onSelect.bind(this, 'lang')} showSearch value={this.state.lang} option={this.state.optionLang} />
          </div>
        </div>
        <div className={styles.list} dangerouslySetInnerHTML={{ __html: this.state.content || 'loading...' }} />
        {githublist && <Footer>已显示全部内容</Footer>}
      </div>
    );
  }
}

Github.typeName = 'trending';
