import React, { Component } from 'react';
import cheerio from 'cheerio';
import { fetchs } from '../utils/';
import styles from './Github.less';

const githublist = localStorage.getItem('github-list');

export default class Github extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: githublist || 'loading...',
    };
  }
  componentDidMount() {
    this.getTrending();
  }
  getTrending() {
    fetchs('https://github.com/trending', 3).then((response) => {
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
      this.setState({
        content: _html,
      }, () => {
        localStorage.setItem('github-list', _html);
      });
    }).catch(() => {
      this.setState({
        content: githublist || '请求错误，请检查网路！',
      });
    });
  }
  render() {
    return (
      <div className={styles.warpper}>
        <h1 className={styles.title}>Github Trending</h1>
        <div className={styles.list} dangerouslySetInnerHTML={{ __html: this.state.content }} />
      </div>
    );
  }
}
