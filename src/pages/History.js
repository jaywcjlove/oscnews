import React, { PureComponent } from 'react';
import styles from './History.less';

export default class History extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  componentWillMount() {
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
  render() {
    return (
      <div className={styles.warpper}>
        <h1 className={styles.title}>历史记录</h1>
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
      </div>
    );
  }
}

History.typeName = 'history';
