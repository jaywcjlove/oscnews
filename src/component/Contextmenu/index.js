import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './index.module.less';

export default class Contextmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
    this.handleContextmenu = this.handleContextmenu.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('contextmenu', this.handleContextmenu, false);
    document.addEventListener('mousedown', this.handleClickOutside, true);
  }
  componentWillUnmount() {
    document.removeEventListener('contextmenu', this.handleContextmenu, false);
    document.removeEventListener('mousedown', this.handleClickOutside, true);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.visible !== this.props.visible) {
      this.setState({ visible: this.props.visible });
    }
  }
  handleClickOutside(e) {
    const { onClickOutside } = this.props;
    // Ignore clicks on the component it self
    // https://codepen.io/graubnla/pen/EgdgZm
    // Detect a click outside of a React Component
    // https://www.dhariri.com/posts/57c724e4d1befa66e5b8e056
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(e.target) || domNode === e.target) {
      this.setState({ visible: false }, () => {
        onClickOutside();
      });
    }
  }
  handleContextmenu(e) {
    e.preventDefault();
    this.setState({ visible: true }, () => {
      if (!e || !this.menu) return;
      // 根据事件对象中鼠标点击的位置，进行定位
      const winHeight = document.documentElement.clientHeight;
      const winWidth = document.documentElement.clientWidth;
      if (winHeight - e.clientY > this.menu.clientHeight) {
        this.menu.style.top = `${e.clientY}px`;
      } else {
        this.menu.style.bottom = 0;
      }
      if (winWidth - e.clientX > this.menu.clientWidth) {
        this.menu.style.left = `${e.clientX}px`;
      } else {
        this.menu.style.bottom = 0;
      }
    });
  }
  onClickMenuItem(item) {
    const { onClick } = this.props;
    this.setState({ visible: false });
    onClick(item);
  }
  render() {
    const { visible } = this.state;
    const { option } = this.props;
    if (!visible || option.length < 1) return null;
    return (
      <div className={styles.menu} ref={node => this.menu = node}>
        {option.map((item, idx) => (
          <div className={styles.item} onClick={this.onClickMenuItem.bind(this, item)} key={idx}>{item.label}</div>
        ))}
      </div>
    );
  }
}

Contextmenu.propsTypes = {
  option: PropTypes.array,
  onClick: PropTypes.func,
  onClickOutside: PropTypes.func,
  visible: PropTypes.bool,
};

Contextmenu.defaultProps = {
  visible: false,
  option: [],
  onClick() {},
  onClickOutside() {},
};
