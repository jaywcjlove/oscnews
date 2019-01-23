import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Footer from '../component/Footer';
import styles from './History.module.less';

function isToday(str) {
  const d = new Date(str.replace(/-/g, '/'));
  const todaysDate = new Date();
  if (d.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)) {
    return true;
  }
  return false;
}

const time = (str) => {
  const date = str ? new Date(str) : new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  // const seconds = date.getSeconds();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const today = isToday(`${year}/${month}/${day}`);
  return (
    <div>
      {!today && <span className={styles.hours}>{`${month}/${day} `}</span>}
      <span className={styles.hours}>{`${hours < 10 ? `0${hours}` : hours}`}</span>
      <span className={styles.minutes}>{`${minutes < 10 ? `0${minutes}` : minutes}`}</span>
    </div>
  );
};

export default class History extends PureComponent {
  static typeName = 'history'
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      tab: props.conf.historyTabType,
      // tab: 'today',
    };
    this.getHistory();
  }
  getHistory() {
    const { tab } = this.state;
    let microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    if (tab === 'today') {
      microsecondsPerWeek = (new Date()).getTime() - (new Date('2018/02/13 00:00:00')).getTime();
    }
    if (tab === 'week') {
      microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    }
    if (tab === 'all') {
      microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    }
    const oneWeekAgo = (new Date()).getTime() - microsecondsPerWeek;
    // eslint-disable-next-line
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
    // eslint-disable-next-line
    chrome.history.deleteAll(() => {
      this.setState({
        list: [],
      });
    });
  }
  onClickGetData(type) {
    const { storage, conf } = this.props;
    conf.historyTabType = type;
    storage.set({ conf });

    this.setState({ tab: type }, () => {
      this.getHistory();
    });
  }
  render() {
    const { tab } = this.state;
    return (
      <div className={styles.warpper}>
        <div className={styles.header}>
          <span className={styles.title}>历史记录</span>
          <div className={styles.setting}>
            <span className={classNames({ active: tab === 'today' })} onClick={this.onClickGetData.bind(this, 'today')}>今天</span>
            <span className={classNames({ active: tab === 'week' })} onClick={this.onClickGetData.bind(this, 'week')}>一周</span>
            <span className={classNames({ active: tab === 'all' })} onClick={this.onClickGetData.bind(this, 'all')}>全部</span>
            <span onClick={this.onClickClean.bind(this)}>清空所有</span>
          </div>
        </div>
        <ul className={styles.list}>
          {this.state.list.length === 0 && <li>没有历史记录！</li>}
          {this.state.list.map((item, idx) => {
            // console.log(new Date(item.lastVisitTime));
            // const date = new Date(item.lastVisitTime)
            return (
              <li key={idx}>
                <div className={styles.favicon} style={{ backgroundImage: `-webkit-image-set(url("chrome://favicon/size/16@1x/${item.url}") 1x, url("chrome://favicon/size/16@2x/${item.url}") 2x)` }} />
                <div>{time(item.lastVisitTime)}</div>
                <a target="_blank" rel="noopener noreferrer" href={item.url}>{item.title || item.url}</a>
              </li>
            );
          })}
        </ul>
        <Footer>已显示全部内容</Footer>
      </div>
    );
  }
}
