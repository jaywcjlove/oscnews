import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './index.less';
import Footer from '../../component/Footer';
import source from '../../dev-site/src/document.json';
import { github, zhHans, heart, website } from './icons';

if (!localStorage.getItem('osc-doc')) {
  localStorage.setItem('osc-doc', JSON.stringify(source));
}


export default class DevDocument extends Component {
  static typeName = 'document'
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      star: props.conf.docStar,
      tag: props.conf.docTag,
      query: '',
      subMenu: [
        { title: '我的收藏', tag: '__star__' },
        { title: '全部', tag: '' },
        { title: '前端', tag: '前端' },
        { title: '后端', tag: '后端' },
        { title: '工具', tag: '工具库' },
      ],
    };
  }
  componentDidMount() {
    const docs = localStorage.getItem('osc-doc');
    if (!docs) {
      localStorage.setItem('osc-doc', JSON.stringify(source));
    }
    this.setState({
      lists: source,
      query: '',
    });
  }
  onAddStar(title) {
    const { star } = this.state;
    const { storage, conf } = this.props;
    if (star.indexOf(title) === -1) {
      star.push(title);
    } else {
      star.splice(star.indexOf(title), 1);
    }
    conf.docStar = star;
    storage.set({ conf }, () => {
      this.setState({ star });
    });
  }
  onChangeTag(tag) {
    const { storage, conf } = this.props;
    conf.docTag = tag;
    this.setState({ tag, query: '' }, () => {
      storage.set({ conf });
    });
  }
  onSearch(e) {
    const query = e.target.value;
    this.setState({ query });
  }
  getFilterLists() {
    const { query, lists } = this.state;
    return !query ? lists : lists.filter(item => item.title.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }
  render() {
    const lists = this.getFilterLists();
    return (
      <div className={styles.warpper}>
        <div className={styles.header}>
          <span className={styles.title}>开发文档</span>
          <div className={styles.tag}>
            {!this.state.tag && <input placeholder="输入搜索内容" className={styles.search} onChange={this.onSearch.bind(this)} />}
            {this.state.subMenu.map((item, idx) => {
              return (
                <span
                  className={classNames({
                    active: this.state.tag === item.tag,
                  })}
                  key={idx}
                  onClick={this.onChangeTag.bind(this, item.tag)}
                >
                  {item.title}
                </span>
              );
            })}
          </div>
        </div>
        {this.state.star.length === 0 && this.state.tag === '__star__' && <div className={styles.noFind}>还没有收藏，赶紧去收藏吧</div>}
        <ul className={styles.lists}>
          {lists.map((item, idx) => {
            const urls = [];
            for (const i in item.urls) {
              if (Object.prototype.hasOwnProperty.call(item.urls, i)) {
                let icon = '';
                if (i === 'git') icon = github;
                else if (i === 'cn') icon = zhHans;
                else icon = website;
                urls.push(
                  <a key={i} href={item.urls[i]}>{icon}</a>
                );
              }
            }

            const { tag } = this.state;
            const isTag = item.tags.filter(t => t === tag);
            const isStar = this.state.star.filter(t => t === item.title);

            if (tag === '' || (tag === '__star__' && isStar.length > 0) || isTag.length > 0) {
              return (
                <li key={idx}>
                  <a className={styles.itemHeader} href={item.website}>
                    <div className={styles.logo}>
                      {item.title && <h4><span>{item.title}</span></h4>}
                      {item.logo && <img alt={item.title} src={item.logo} />}
                    </div>
                    <div className={styles.details}>
                      {item.des}
                    </div>
                  </a>
                  <div className={styles.bottomBar}>
                    <div className={styles.urls}>{urls}</div>
                    <div
                      className={classNames(styles.star, {
                        active: this.state.star.indexOf(item.title) > -1,
                      })}
                      onClick={this.onAddStar.bind(this, item.title)}
                    >
                      {heart}
                    </div>
                  </div>
                </li>
              );
            }
            return null;
          })}
        </ul>
        <Footer>Copyright © 2018</Footer>
      </div>
    );
  }
}
