import React, { Component } from 'react';
import Header from './component/Header';
import OSCNews from './component/OSCNews';
import Github from './component/Github';
import styles from './Root.less';

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.warpper}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.content}>
          <div className={styles.oscnews}>
            <OSCNews />
          </div>
          <div className={styles.trending}>
            <Github />
          </div>
        </div>
      </div>
    );
  }
}
