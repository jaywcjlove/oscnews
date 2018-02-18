import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

export default class Contexmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleContextmenu = this.handleContextmenu.bind(this);
  }
  componentDidMount() {
    window.addEventListener('contextmenu', this.handleContextmenu, true);
  }
  handleContextmenu(e) {
    e.preventDefault();
    // 根据事件对象中鼠标点击的位置，进行定位
    this.menu.style.left = `${e.clientX}px`;
    this.menu.style.top = `${e.clientY}px`;
  }
  render() {
    // const { option } = this.props;
    return (
      <div className={styles.menu} ref={node => this.menu = node}>
        <div>功能1</div>
        <div>功能2</div>
        <div>功能3</div>
        <div>功能4</div>
        <div>功能5</div>
      </div>
    );
  }
}

Contexmenu.propsTypes = {
  option: PropTypes.array,
};

Contexmenu.defaultProps = {
  option: [],
};
