import React, { Component } from 'react';
import { theWeek } from '../utils';
import styles from './Blank.less';

// 搜索地点
// http://toy1.weather.com.cn/search?cityname=%E5%8C%97%E4%BA%AC
// 根据id查询天气
// http://www.weather.com.cn/data/sk/101010300.html

const time = () => {
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const seconds = new Date().getSeconds();
  return (
    <div>
      <span className={styles.hours}>{`${hours < 10 ? `0${hours}` : hours}`}</span>
      <span className={styles.minutes}>{`${minutes < 10 ? `0${minutes}` : minutes}`}</span>
      <span className={styles.seconds}>{`${seconds < 10 ? `0${seconds}` : seconds}`}</span>
    </div>
  );
};

const date = () => {
  return (
    <div className={styles.date}>
      {`${new Date().getMonth() + 1}月${new Date().getDate()}日  ${['周日', '周一', '周二', '周三', '周四', '周五', '周六'][new Date().getDay()]} `}
      <sup>{`第${theWeek() + 1}周`}</sup>
    </div>
  );
};

export default class Blank extends Component {
  static typeName = 'blank'
  constructor(props) {
    super(props);
    this.state = {
      time: time(),
      date: date(),
    };
  }
  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        time: time(),
        date: date(),
      });
    }, 1000);
  }
  render() {
    return (
      <div className={styles.warpper}>
        <div className={styles.calendar}>
          {this.state.time}
          {this.state.date}
        </div>
      </div>
    );
  }
}
