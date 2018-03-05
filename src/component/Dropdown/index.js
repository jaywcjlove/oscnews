import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from './index.less';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  onClick() {
    this.setState({
      visible: !this.state.visible,
    });
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, true);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, true);
  }
  handleClickOutside(e) {
    // Ignore clicks on the component it self
    // https://codepen.io/graubnla/pen/EgdgZm
    // Detect a click outside of a React Component
    // https://www.dhariri.com/posts/57c724e4d1befa66e5b8e056
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(e.target) || domNode === e.target) {
      this.setState({ visible: false });
    }
  }
  renderObjectMenu(menu) {
    return menu.map(({ title, line, panel, url, divider, target, ...otherProps }, idx) => {
      const titleView = title && typeof title === 'function' ? title() : title;
      const cls = classNames(styles.item, { panel });
      if (divider) {
        return (
          <div {...otherProps} key={idx} className={classNames(styles.divider, { line })}>{titleView}</div>
        );
      } else if (url) {
        return <a {...otherProps} key={idx} className={cls} target={target} href={url}>{titleView}</a>;
      } else if (titleView) {
        return <div {...otherProps} key={idx} className={cls}>{titleView}</div>;
      }
      return null;
    });
  }
  render() {
    const { className, children, menu } = this.props;
    const { visible } = this.state;
    const objectView = typeof menu !== 'object' ? menu : this.renderObjectMenu(menu);
    return (
      <div className={classNames(styles.warpper, className)}>
        <div className={classNames(styles.btn)} onClick={this.onClick.bind(this)}>{children}</div>
        <div className={classNames(styles.menu, {
          show: visible,
          hide: !visible,
        })}
        >
          {React.isValidElement(menu) ? menu : objectView}
        </div>
      </div>
    );
  }
}
