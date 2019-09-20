import React, { Component } from 'react';
import cheerio from 'cheerio';
import { fetchInterval, fetchTimely } from '../utils';
import Footer from '../component/Footer';
import Select from '../component/Select';
import Loading from '../component/Loading';
import styles from './Github.module.less';
import optionLang from '../source/trending.json';

const githublist = localStorage.getItem('github-list');

const starSVG = (
  <svg viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img">
    <path fillRule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z" />
  </svg>
);

export default class Github extends Component {
  static typeName = 'trending';
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      content: githublist ? JSON.parse(githublist) : null,
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
    let localContent = localStorage.getItem('github-list');
    if (!localContent) type = 'select'; // 判断是否直接选择
    else {
      localContent = JSON.parse(localContent);
    }
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
      const resultData = [];
      const $ = cheerio.load(response);
      $('.Box-row').each((idx, item) => {
        // 不需要头像，避免被和谐
        /* eslint-disable */
        const fullName = $(item).find('h1 a').text().replace(/(\n|\s)/g, '');
        const href = $(item).find('h1 a').attr('href').replace(/(\n|\s)/g, '');
        const language = $(item).find('span[itemprop=programmingLanguage]').text().replace(/(\n|\s)/g, '');
        const languageColor = $(item).find('span.repo-language-color');
        const stargazersCount = $(item).find('span[aria-label="star"] svg[aria-label="star"].octicon.octicon-star').parent().parent().text().replace(/(\n|\s|,)/g, '');
        const forked = $(item).find('span[aria-label="fork"] svg.octicon.octicon-repo-forked').parent().parent().text().replace(/(\n|\s|,)/g, '');
        const todayStar = $(item).find('span.float-sm-right').text().replace(/(\n|,)/g, '').trim();
        const description = $(item).find('p.text-gray').text().replace(/(\n)/g, '').trim();
        /* eslint-enable */
        let color = '';
        if (language && languageColor && languageColor.css) {
          color = languageColor.css('background-color');
        }
        resultData.push({ full_name: fullName, language, color, description, forked, stargazers_count: parseInt(stargazersCount, 10), todayStar, html_url: href, rank: idx + 1 });
      });
      if (!resultData) return;
      localStorage.setItem('github-list', JSON.stringify(resultData));
      if (!this.mounted) return;
      this.setState({
        loading: false,
        content: resultData,
      });
    }).catch(() => {
      this.setState({ loading: false });
      if (!this.mounted) return;
      this.setState({
        content: this.state.content || '请求错误，请检查网路，或者重新刷新请求数据！',
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
    const { content } = this.state;
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
        <div className={styles.list}>
          {!content ? (
            <div>Loading...</div>
          ) : (
            <ul>
              {content.map((item, idx) => {
                return (
                  <li key={idx}>
                    <h3>
                      <a href={item.html_url}>{item.full_name}</a>
                    </h3>
                    <div className={styles.description}>
                      {item.description}
                    </div>
                    <div>
                      <span className={styles.language}><span style={{ backgroundColor: item.color }}/>{item.language}</span>
                      <span className={styles.star}>
                        {starSVG}
                        <span>{item.stargazers_count}</span>
                      </span>
                      <span className={styles.forked}>
                        <svg viewBox="0 0 10 16" version="1.1" width="10" height="16" role="img">
                          <path fillRule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z" />
                        </svg>
                        <span>{item.forked}</span>
                      </span>
                      <span className={styles.todayStar}>{starSVG}<span>{item.todayStar}</span></span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {githublist && <Footer>已显示全部内容</Footer>}
      </div>
    );
  }
}
