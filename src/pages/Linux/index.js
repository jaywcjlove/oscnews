import React, { Component } from 'react';
import command from 'linux-command';
import classNames from 'classnames';
import styles from './index.less';
import Search from '../../component/Search';
import Footer from '../../component/Footer';
import logo from '../../assets/linux-logo.svg';

export default class Linux extends Component {
  static typeName = 'linux'
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      active: null,
    };
  }
  onChange(e) {
    if (!e.target) return;
    this.setState({ query: e.target.value, active: !e.target.value ? null : 0 });
  }
  openURL() {
    const { query, active } = this.state;
    const ContentData = this.filterItems();
    let queryStr = query;
    if ((active || active === 0) && ContentData[active]) {
      queryStr = ContentData[active].n;
    }
    if ((active || (active === 0 && query === queryStr) || query === queryStr) && queryStr && query) {
      window.open(`https://jaywcjlove.github.io/linux-command/c/${queryStr}.html`);
    } else {
      window.open(`https://jaywcjlove.github.io/linux-command/list.html#!kw=${query}`);
    }
  }
  onSearch() {
    this.openURL();
  }
  onKeyUp(e) {
    const key = e.keyCode || e.which || e.charCode;
    const { active } = this.state;
    if (key === 13) { // 摁Enter
      this.openURL();
    }
    const indexItem = active || active === 0 ? active : -1;
    if (key === 40 && indexItem + 1 < this.filterItems().length) { // 摁下
      this.setState({
        active: indexItem + 1,
      });
    }
    if (key === 38 && indexItem > 0) { // 摁上
      this.setState({
        active: indexItem - 1,
      });
    }
  }
  filterItems() {
    const { query } = this.state;
    const ContentData = Object.keys(command).map(item => command[item]);
    return ContentData.filter((item) => {
      return item.n.indexOf(query) > -1 || item.d.indexOf(query) > -1;
    });
  }
  render() {
    const { query, active } = this.state;
    const ContentData = this.filterItems();
    const Content = ContentData.map((item, idx) => {
      let name = item.n;
      let des = item.d;
      if (query && (name.indexOf(query) > -1 || des.indexOf(query) > -1)) {
        const reg = new RegExp(`(${query})`, 'ig');
        name = name.replace(reg, `<i class="kw">$1</i>`); // eslint-disable-line
        des = des.replace(reg, `<i class="kw">$1</i>`); // eslint-disable-line
      }
      if (idx > 10) return null;
      return (
        <div title={idx} className={classNames(styles.item, { active: active || active === 0 ? idx === active : item.n === query })} key={idx}>
          <a
            className={styles.title}
            href={`https://jaywcjlove.github.io/linux-command/c/${item.n}.html`}
            dangerouslySetInnerHTML={{ __html: `${name} - ${des}` }}
          />
          <a className={styles.edit} target="_blank" href={`https://github.com/jaywcjlove/linux-command/edit/master/command/${item.n}.md`}>编辑</a>
        </div>
      );
    });
    return (
      <div className={styles.warpper}>
        <div className={styles.header}>
          <a href="https://github.com/jaywcjlove/linux-command" rel="noopener noreferrer" target="_blank" title="Linux命令搜索工具"><img alt="linux-command logo" src={logo} /></a>
        </div>
        <Search style={{ width: 430 }} onChange={this.onChange.bind(this)} onKeyUp={this.onKeyUp.bind(this)} onSearch={this.onSearch.bind(this)} />
        <div className={styles.list}>
          {Object.keys(command).length > 0 && (
            <div className={styles.infoTotal}>
              <span>共 {Object.keys(command).length} 个Linux命令</span>
              <a href="https://github.com/jaywcjlove/linux-command/new/master/command">添加命令</a>
            </div>
          )}
          {Content.length === 0 ? <div className={styles.info}>没有搜索到内容</div> : Content}
        </div>
        <Footer>Copyright © 2018 <a href="https://github.com/jaywcjlove/linux-command">linux-command</a></Footer>
      </div>
    );
  }
}
