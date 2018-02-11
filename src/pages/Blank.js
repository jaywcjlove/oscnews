import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
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

const colorFill = (
  <svg t="1518280277504" viewBox="0 0 1024 760" width="32" height="32">
    <path d="M810.666667 490.666667s-85.333333 92.586667-85.333334 149.333333a85.333333 85.333333 0 0 0 85.333334 85.333333 85.333333 85.333333 0 0 0 85.333333-85.333333c0-56.746667-85.333333-149.333333-85.333333-149.333333M222.293333 426.666667L426.666667 222.293333 631.04 426.666667m75.52-45.226667L325.12 0 264.96 60.16l101.546667 101.546667-219.733334 219.733333c-25.173333 23.893333-25.173333 65.28 0 90.453333l234.666667 234.666667c12.373333 12.373333 29.013333 18.773333 45.226667 18.773333s32.853333-6.4 45.226666-18.773333l234.666667-234.666667c25.173333-25.173333 25.173333-66.56 0-90.453333z" />
  </svg>
);

export default class Blank extends Component {
  static typeName = 'blank'
  constructor(props) {
    super(props);
    this.state = {
      time: time(),
      date: date(),
      color: [
        { color: '#34495e', lable: 'wet asphalt', value: 'wet-asphalt' },
        { color: '#2ecc71', lable: 'emerald', value: 'emerald' },
        { color: '#1abc9c', lable: 'turquoise', value: 'turquoise' },
        { color: '#f1c40f', lable: 'sun flower', value: 'sun-flower' },
        { color: '#e74c3c', lable: 'alizarin', value: 'alizarin' },
        { color: '#f1f1f1', lable: 'clouds', value: 'clouds' },
        { color: '#3498db', lable: 'peter river', value: 'peter-river' },
        { color: '#9b59b6', lable: 'amethyst', value: 'amethyst' },
      ],
      bgName: props.conf.BlankColor,
      colorVisibel: false,
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
    document.removeEventListener('mousedown', this.handleClickOutside, true);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, true);
    this.interval = setInterval(() => {
      this.setState({
        time: time(),
        date: date(),
      });
    }, 1000);
  }
  handleClickOutside(e) {
    // Ignore clicks on the component it self
    // https://codepen.io/graubnla/pen/EgdgZm
    // Detect a click outside of a React Component
    // https://www.dhariri.com/posts/57c724e4d1befa66e5b8e056
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(e.target) || domNode === e.target) {
      this.setState({ colorVisibel: false });
    }
  }
  onClick(item) {
    const { storage, conf } = this.props;
    conf.BlankColor = item.value;
    storage.set({ conf });
    this.setState({ bgName: item.value });
  }
  onClickColorPanel() {
    const { colorVisibel } = this.state;
    this.setState({ colorVisibel: !colorVisibel });
  }
  render() {
    const { color, bgName, colorVisibel } = this.state;
    return (
      <div className={classNames(styles.warpper, bgName)}>
        <div className={styles.calendar}>
          {this.state.time}
          {this.state.date}
        </div>
        <div className={styles.setting}>
          <div className={classNames(styles.panel, {
            hiden: !colorVisibel,
            show: colorVisibel,
          })}
          >
            {color.map((item, key) => (
              <div
                key={key}
                onClick={this.onClick.bind(this, item)}
                style={{ backgroundColor: item.color }}
                className={classNames(styles.item, styles.value)}
              />
            ))}
          </div>
          <div onClick={this.onClickColorPanel.bind(this)} className={styles.btn}>{colorFill}</div>
        </div>
      </div>
    );
  }
}
