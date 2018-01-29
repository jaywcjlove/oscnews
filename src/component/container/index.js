import React, { Component } from 'react';
import classNames from 'classnames';
import Header from '../Header';
import OSCNews from '../OSCNews';
import styles from './index.less';

const contentType = localStorage.getItem('content-type');

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: contentType || 'document',
      visible: localStorage.getItem('oscnew-bar') === 'true' || false,
    };
  }
  onSwitchBtn() {
    localStorage.setItem('oscnew-bar', !this.state.visible);
    this.setState({
      visible: !this.state.visible,
    });
  }
  render() {
    const { children } = this.props;
    const { visible } = this.state;
    return (
      <div className={styles.warpper}>
        <div className={styles.header}>
          <Header contentType={this.state.type} onChange={(type) => { this.setState({ type }); }} />
        </div>
        <div className={styles.content}>
          <div className={styles.oscnews} style={{ marginLeft: visible ? 0 : -360 }}>
            <div className={classNames(styles.switchBtn, { show: visible, hidden: !visible })} onClick={this.onSwitchBtn.bind(this)}>
              {visible ? '隐藏' : '显示新闻'}
            </div>
            <OSCNews />
          </div>
          <div className={styles.trending}>
            {React.Children.map(children, (Child) => {
              if (!Child || Child.type.typeName !== this.state.type) return null;
              return React.cloneElement(Child, {
                contentType: this.state.type,
              });
            })}
          </div>
        </div>
      </div>
    );
  }
}
