import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './index.less';

export default class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _checked: props.checked || false,
    };
    this.onChange = this.onChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.checked !== nextProps.checked) {
      this.setState({ _checked: nextProps.checked });
    }
  }
  onChange(e) {
    const { onChange } = this.props;
    this.setState({
      _checked: e.target.checked,
    });
    onChange && onChange(e, e.target.checked);
  }
  render() {
    const { className, disabled, style, ...resetProps } = this.props;
    const { _checked } = this.state;
    const cls = classNames(className, styles.switch, {
      [`${styles.disabled}`]: disabled,
      [`${styles.checked}`]: _checked,
    });
    return (
      <label style={{ ...style }} className={cls} {...resetProps}>
        <input
          disabled={disabled}
          checked={_checked}
          onChange={this.onChange}
          type="checkbox"
        />
      </label>
    );
  }
}
