import React, { Component } from 'react';
import classNames from 'classnames';
import Search from '../../component/Search';
import Select from '../../component/Select';
import searchdb from '../../source/search.json';
import styles from './index.less';

export default class SearchView extends Component {
  static typeName = 'search';
  constructor(props) {
    super(props);
    this.state = {
      searchNav: searchdb || [],
      select: 'web',
    };
  }
  onClick() { }
  getSubNavData() {
    const { select, searchNav } = this.state;
    const menu = searchNav.filter(item => item.value === select);
    if (menu && menu.length > 0) {
      return menu[0].children || [];
    }
    return [];
  }
  render() {
    const { select } = this.state;
    const option = this.getSubNavData();
    return (
      <div className={styles.warpper}>
        <div className={styles.topNav}>
          {this.state.searchNav.map((item, idx) => (
            <div className={classNames({ active: item.value === select })} key={idx} onClick={this.onClick.bind(this)}>
              {item.label}
            </div>
          ))}
        </div>
        <div className={styles.content}>
          <Search inputStyle={{ paddingLeft: 68 }} />
          <Select className={styles.searchSelect} option={option} />
        </div>
      </div>
    );
  }
}
