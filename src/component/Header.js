import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import logo from '../assets/oschina.svg';
import gitee from '../assets/gitee.svg';
import github from '../assets/github.svg';
import apple from '../assets/apple.svg';
// import setting from '../assets/setting.svg';
import styles from './Header.less';

const storage = chrome.storage.local;

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.contentType || 'trending',
      visible: false,
      menus: [
        {
          title: '空白页',
          type: 'blank',
        }, {
          title: '开发文档',
          type: 'document',
        }, {
          title: '趋势榜',
          type: 'trending',
        }, {
          title: '历史记录',
          type: 'history',
        },
      ],
    };
  }
  componentDidMount() {
    storage.get('oscHeader', (items) => {
      this.setState({
        visible: items.oscHeader,
      });
    });
  }
  onChange(type) {
    const { onChange } = this.props;
    storage.set({ contentType: type });
    localStorage.setItem('content-type', type);
    this.setState({ type });
    onChange(type);
  }
  onDropDown() {
    this.setState({
      visible: !this.state.visible,
    }, () => {
      storage.set({ oscHeader: this.state.visible });
    });
  }
  render() {
    return (
      <div className={styles.warpper} style={{ marginTop: this.state.visible ? 0 : -50 }}>
        <div className={ styles.logo } >
          <a href="http://www.oschina.net/" rel="noopener noreferrer" target="_blank" >
            <img title="开源中国" alt="开源中国" src={ logo } />
          </a>
        </div>
        <div className={styles.menu}>
          <div className={styles.nav}>
            {this.state.menus.map((item, idx) => {
              return (
                <span key={idx} className={classNames({ active: this.state.type === item.type })} onClick={this.onChange.bind(this, item.type)}>{item.title}</span>
              );
            })}
          </div>
          <a href="https://gitee.com/" > <img title="码云" alt="码云" src={ gitee } /></a>
          <a href="https://github.com/" > <img title="Github" alt="Github" src={ github } /></a>
          <a href="http://wangchujiang.com/awesome-mac/index.zh.html" > <img title="Mac精品软件推荐" alt="Mac精品软件推荐" src={ apple } /></a>
          {/* <span className={styles.setting}> <img title="" alt="" src={setting} /> </span> */}
        </div>
        <div onClick={this.onDropDown.bind(this)} className={styles.dropDown} />
      </div>
    );
  }
}

Header.propTypes = {
  onChange: PropTypes.func,
};

Header.defaultProps = {
  onChange() {},
};
