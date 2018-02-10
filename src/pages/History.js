import React, { PureComponent } from 'react';
import Footer from '../component/Footer';
import styles from './History.less';

export default class History extends PureComponent {
  static typeName = 'history'
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    this.getHistory();
  }
  componentDidMount() {
    this.getHistory();
  }
  getHistory() {
    const microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    const oneWeekAgo = (new Date()).getTime() - microsecondsPerWeek;
    chrome.history.search({
      text: '',
      startTime: oneWeekAgo,
    }, (historyItems) => {
      this.setState({
        list: historyItems,
      });
    });
  }
  onClickClean() {
    chrome.history.deleteAll((item) => {
      this.setState({
        list: [],
      });
    })
  }
  render() {
    return (
      <div className={styles.warpper}>
        <div className={styles.header}>
          <span className={styles.title}>历史记录</span>
          <div className={styles.setting}>
            <span onClick={this.onClickClean.bind(this)}>清空所有</span>
          </div>
        </div>
        <ul className={styles.list}>
          {this.state.list.length === 0 && <li>没有历史记录！</li>}
          {this.state.list.map((item, idx) => {
            return (
              <li key={idx}>
                <div className={styles.favicon} style={{ backgroundImage: `-webkit-image-set(url("chrome://favicon/size/16@1x/${item.url}") 1x, url("chrome://favicon/size/16@2x/${item.url}") 2x)` }} />
                <a href={item.url}>{item.title || item.url}</a>
              </li>
            );
          })}
        </ul>
        <Footer>已显示全部内容</Footer>
      </div>
    );
  }
}
