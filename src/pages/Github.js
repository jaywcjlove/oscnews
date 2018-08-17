import React, { Component } from 'react';
import cheerio from 'cheerio';
import { fetchInterval, fetchTimely } from '../utils/';
import Footer from '../component/Footer';
import Select from '../component/Select';
import Loading from '../component/Loading';
import styles from './Github.less';
import optionLang from '../source/trending.json';

const githublist = localStorage.getItem('github-list');

export default class Github extends Component {
  static typeName = 'trending'
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
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
      suggest: ['go', 'html', 'javascript', 'python', 'swift'],
      since: props.conf.githubSince,
      lang: props.conf.githubLang,
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
    const localContent = localStorage.getItem('github-list');
    if (!localContent) type = 'select'; // 判断是否直接选择
    this.setState({ loading: true });
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
      $('.starring-container').empty();
      const _html = $('div.explore-content').html();
      if (!_html) return;
      localStorage.setItem('github-list', _html);
      if (!this.mounted) return;
      this.setState({
        loading: false,
        content: _html,
      });
    }).catch(() => {
      this.setState({ loading: false });
      if (!this.mounted) return;
      this.setState({
        content: githublist || '请求错误，请检查网路，或者重新刷新请求数据！',
      });
    });
  }
  onSelect(type, item) {
    const { storage, conf } = this.props;
    this.setState({ loading: false });
    if (!type) return;
    this.setState({
      [`${type}`]: item.value,
    }, () => {
      conf[type === 'since' ? 'githubSince' : 'githubLang'] = item.value;
      storage.set({ conf }, () => {
        this.getTrending('select');
      });
    });
  }
  render() {
    return (
      <div className={styles.warpper}>
        <div className={styles.header}>
          <span className={styles.title}><a target="_blank" rel="noopener noreferrer" href="http://github.com/trending">Github Trending</a></span>
          <div className={styles.select}>
            <Loading visible={this.state.loading} />
            <Select onSelect={this.onSelect.bind(this, 'since')} value={this.state.since} option={this.state.option} />
            <Select
              showSearch
              suggest={this.state.suggest}
              onSelect={this.onSelect.bind(this, 'lang')}
              optionStyle={{ right: 0 }}
              value={this.state.lang}
              option={this.state.optionLang}
            />
          </div>
        </div>
        <div className={styles.list} dangerouslySetInnerHTML={{ __html: this.state.content || 'loading...' }} />
        {githublist && <Footer>已显示全部内容</Footer>}
      </div>
    );
  }
}
