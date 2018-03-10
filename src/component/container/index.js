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
      siderBarWidth: props.config.conf.siderBarWidth,
    };
    this.onDragging = this.onDragging.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
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
  onDragEnd() {
    const { storage, conf } = this.props.config;
    document.body.style.userSelect = 'text';
    conf.siderBarWidth = this.siderBar.clientWidth;
    storage.set({ conf }, () => {
      this.setState({
        siderBarWidth: this.siderBar.clientWidth,
      });
    });
    window.removeEventListener('mousemove', this.onDragging, true);
    window.removeEventListener('mouseup', this.onDragEnd, true);
  }
  onDragging(e) {
    const currentX = e.clientX;
    if (this.siderBar && this.barWidth) {
      let width = this.barWidth + (currentX - this.startX);
      if (width < 200) width = 200;
      this.siderBar.style.width = `${width}px`;
    }
  }
  onMouseDown(event) {
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.barWidth = this.siderBar.clientWidth;
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', this.onDragging, true);
    window.addEventListener('mouseup', this.onDragEnd, true);
  }
  render() {
    const { children, config } = this.props;
    const { visible, siderBarWidth } = this.state;
    const OSCNewsLeft = () => {
      if (config.conf.isHideOSC) return visible ? 0 : -siderBarWidth;
      return -siderBarWidth;
    };
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
          <div ref={node => this.siderBar = node} className={styles.oscnews} style={{ marginLeft: OSCNewsLeft(), width: siderBarWidth }}>
            {config.conf.isHideOSC && (
              <div className={classNames(styles.switchBtn, { show: visible, hidden: !visible })} onClick={this.onSwitchBtn.bind(this)}>
                {visible ? '隐藏' : '显示新闻'}
              </div>
            )}
            <OSCNews {...config} />
            <div
              onMouseDown={this.onMouseDown.bind(this)}
              className={styles.newsBar}
            />
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
