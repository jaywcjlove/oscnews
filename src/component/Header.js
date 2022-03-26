import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '@wcj/dark-mode';
import classNames from 'classnames';
import Dropdown from './Dropdown';
import Switch from './Switch';
import logo from '../assets/oschina.svg';
import chromeApp from '../assets/chrome-app.svg';
// import gitee from '../assets/gitee.svg';
// import github from '../assets/github.svg';
// import apple from '../assets/apple.svg';
import styles from './Header.module.less';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.conf.pageType,
      menus: props.menus,
      option: [
        {
          title: this.renderFeature.bind(this),
          panel: true, // 这是一个面包
        },
        {
          line: true,
        },
        {
          title: <span><img alt="" src={chromeApp} /> Chrome Apps</span>,
          onClick: this.openChromeApps.bind(this),
        },
        {
          title: '应用选项',
          divider: true,
          line: true,
        },
        {
          title: this.renderSiwtchOption.bind(this, 'isNewTab'),
        },
        {
          title: this.renderSiwtchOption.bind(this, 'isHideOSC'),
        },
        {
          title: this.renderSiwtchOption.bind(this, 'isHideNav'),
        },
        {
          title: <dark-mode light="Dart" dark="Light"></dark-mode>,
          divider: true,
          line: true,
        },
        {
          title: '关于应用',
          divider: true,
          line: true,
        },
        {
          title: '问题帮助',
          url: 'https://github.com/jaywcjlove/oscnews/issues',
          target: '_blank',
        },
        {
          title: '应用主页',
          url: 'https://github.com/jaywcjlove/oscnews',
          target: '_blank',
        },
      ],
    };
    this.renderSiwtchOption = this.renderSiwtchOption.bind(this);
  }
  openChromeApps() {
    // eslint-disable-next-line
    chrome.tabs.update({ url: 'chrome://apps/' });
  }
  renderFeature() {
    return (
      <div className={styles.navPanel}>
        {this.state.menus.map((item, idx) => {
          return (
            <span key={idx} className={classNames({ active: this.state.type === item.type })} onClick={this.onChange.bind(this, item.type)}>{item.title}</span>
          );
        })}
      </div>
    );
  }
  onClickSwitch(ty, e) {
    e.preventDefault();
    const { storage, conf } = this.props;
    conf[ty] = !conf[ty];
    storage.set({ conf });
  }
  renderSiwtchOption(ty) {
    const { conf } = this.props;
    let label = '';
    if (ty === 'isNewTab') label = '在新标签页显示';
    if (ty === 'isHideOSC') label = '隐藏新闻';
    if (ty === 'isHideNav') label = '显示导航';
    return (
      <div className={styles.switchItem} onClick={this.onClickSwitch.bind(this, ty)}>
        <span>{label}</span>
        <Switch className={styles.switch} checked={conf[ty]} />
      </div>
    );
  }
  onChange(type) {
    const { onChange } = this.props;
    this.setState({ type });
    onChange(type);
  }
  onDropDown() {
    const { storage, conf } = this.props;
    conf.isHideNav = !conf.isHideNav;
    storage.set({ conf });
  }
  render() {
    const { conf } = this.props;
    return (
      <div className={styles.warpper} style={{ marginTop: conf.isHideNav ? 0 : -50 }}>
        {conf.isHideNav && <div onClick={this.onDropDown.bind(this)} className={styles.dropDown} />}
        <div className={styles.logo} >
          <a href="http://www.oschina.net/" rel="noopener noreferrer" target="_blank" >
            <img title="开源中国" alt="开源中国" src={logo} />
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
        </div>
        <Dropdown menu={this.state.option} className={styles.setting}>
          <svg width="22" height="21" viewBox="0 0 22 7">
            <path d="M2.56463093,0.969052402 C1.14826215,0.969052402 0,2.11682243 0,3.53368333 C0,4.95007673 1.14826215,6.09784675 2.56463093,6.09784675 C3.98099972,6.09784675 5.12926187,4.95007673 5.12926187,3.53368333 C5.12926187,2.11682243 3.98097511,0.969052402 2.56463093,0.969052402 Z M10.7443686,0.969052402 C9.3279998,0.969052402 8.17973766,2.11682243 8.17973766,3.53368333 C8.17973766,4.95007673 9.32802441,6.09784675 10.7443686,6.09784675 C12.1607128,6.09784675 13.3089995,4.95007673 13.3089995,3.53368333 C13.3089995,2.11682243 12.1607374,0.969052402 10.7443686,0.969052402 Z M19.4353691,0.969052402 C18.0189757,0.969052402 16.8706889,2.11682243 16.8706889,3.53368333 C16.8706889,4.95007673 18.0189757,6.09784675 19.4353691,6.09784675 C20.8517625,6.09784675 22,4.95007673 22,3.53368333 C21.9999754,2.11682243 20.8517379,0.969052402 19.4353691,0.969052402 Z" />
          </svg>
        </Dropdown>
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
