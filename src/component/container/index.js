import React, { Component } from 'react';
import classNames from 'classnames';
import Header from '../Header';
import OSCNews from '../OSCNews';
import styles from './index.less';

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.config.conf.pageType,
      visible: props.config.visible.newBar,
    };
  }
  onSwitchBtn() {
    const { storage, visible } = this.props.config;
    visible.newBar = !this.state.visible;
    storage.set({ visible }, () => {
      this.setState({
        visible: !this.state.visible,
      });
    });
  }
  render() {
    const { children, config } = this.props;
    const { visible } = this.state;
    return (
      <div className={styles.warpper}>
        <div className={styles.header}>
          <Header
            {...config}
            pageType={this.state.type}
            onChange={(type) => {
              const { conf, storage } = config;
              conf.pageType = type;
              storage.set({ conf }, () => {
                this.setState({ type });
              });
            }}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.oscnews} style={{ marginLeft: visible ? 0 : -360 }}>
            <div className={classNames(styles.switchBtn, { show: visible, hidden: !visible })} onClick={this.onSwitchBtn.bind(this)}>
              {visible ? '隐藏' : '显示新闻'}
            </div>
            <OSCNews {...config} />
          </div>
          <div className={styles.trending}>
            {React.Children.map(children, (Child) => {
              if (!Child || Child.type.typeName !== this.state.type) return null;
              return React.cloneElement(Child, {
                contentType: this.state.type,
                ...config,
              });
            })}
          </div>
        </div>
      </div>
    );
  }
}
