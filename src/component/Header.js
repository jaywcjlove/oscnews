import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dropdown from '../component/Dropdown';
import Switch from '../component/Switch';
import logo from '../assets/oschina.svg';
import chromeApp from '../assets/chrome-app.svg';
// import gitee from '../assets/gitee.svg';
import github from '../assets/github.svg';
// import apple from '../assets/apple.svg';
import styles from './Header.less';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.conf.pageType,
      visible: props.visible.header,
      menus: props.menus,
      isNewTab: props.conf.isNewTab,
      option: [
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
          title: this.renderSiwtchOption.bind(this),
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
          title: '反馈意见',
          url: 'https://github.com/jaywcjlove/oscnews/issues',
          target: '_blank',
        },
        {
          title: <span><img alt="" src={github} /> 收集【Star】</span>,
          url: 'https://github.com/jaywcjlove/oscnews/stargazers',
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
    chrome.tabs.update({ url: 'chrome://apps/' });
  }
  onChangeSwitch(_, checked) {
    this.setState({ isNewTab: checked });
  }
  onClickSwitch(e) {
    e.preventDefault();
    const { storage, conf } = this.props;
    conf.isNewTab = !this.state.isNewTab;
    storage.set({ conf });
    this.setState({ isNewTab: !this.state.isNewTab });
  }
  renderSiwtchOption() {
    return (
      <div className={styles.switchItem} onClick={this.onClickSwitch.bind(this)}>
        <span>在新标签页显示</span>
        <Switch className={styles.switch} checked={this.state.isNewTab} onChange={this.onChangeSwitch.bind(this)} />
      </div>
    );
  }
  onChange(type) {
    const { onChange } = this.props;
    this.setState({ type });
    onChange(type);
  }
  onDropDown() {
    const { storage, visible } = this.props;
    this.setState({
      visible: !this.state.visible,
    }, () => {
      visible.header = this.state.visible;
      storage.set({ visible });
    });
  }
  render() {
    return (
      <div className={styles.warpper} style={{ marginTop: this.state.visible ? 0 : -50 }}>
        <div onClick={this.onDropDown.bind(this)} className={styles.dropDown} />
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
          {/* <a href="https://gitee.com/jaywcjlove/oscnews" rel="noopener noreferrer" target="_blank"> <img title="码云" alt="码云" src={ gitee } /></a> */}
          {/* <a href="https://github.com/jaywcjlove/oscnews" rel="noopener noreferrer" target="_blank"> <img title="Github" alt="Github" src={ github } /></a> */}
          {/* <a href="http://wangchujiang.com/awesome-mac/index.zh.html" > <img title="Mac精品软件推荐" alt="Mac精品软件推荐" src={ apple } /></a> */}
          <Dropdown menu={this.state.option} className={styles.setting}>
            <svg width="22" height="21" viewBox="0 0 22 7">
              <path d="M2.56463093,0.969052402 C1.14826215,0.969052402 0,2.11682243 0,3.53368333 C0,4.95007673 1.14826215,6.09784675 2.56463093,6.09784675 C3.98099972,6.09784675 5.12926187,4.95007673 5.12926187,3.53368333 C5.12926187,2.11682243 3.98097511,0.969052402 2.56463093,0.969052402 Z M10.7443686,0.969052402 C9.3279998,0.969052402 8.17973766,2.11682243 8.17973766,3.53368333 C8.17973766,4.95007673 9.32802441,6.09784675 10.7443686,6.09784675 C12.1607128,6.09784675 13.3089995,4.95007673 13.3089995,3.53368333 C13.3089995,2.11682243 12.1607374,0.969052402 10.7443686,0.969052402 Z M19.4353691,0.969052402 C18.0189757,0.969052402 16.8706889,2.11682243 16.8706889,3.53368333 C16.8706889,4.95007673 18.0189757,6.09784675 19.4353691,6.09784675 C20.8517625,6.09784675 22,4.95007673 22,3.53368333 C21.9999754,2.11682243 20.8517379,0.969052402 19.4353691,0.969052402 Z" />
            </svg>
          </Dropdown>
        </div>
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
