import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.less';

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: props.value,
    };
  }
  onClick() {
    this.setState({
      visible: !this.state.visible,
    });
  }
  onSelect(item) {
    const { onSelect } = this.props;
    this.setState({
      value: item.value,
      visible: !this.state.visible,
    }, () => {
      onSelect(item, item.value);
    });
  }
  render() {
    const { option, ...resetProps } = this.props;
    const { visible, value } = this.state;
    const title = option.filter(item => item.value === value);
    return (
      <div
        className={classNames(styles.select, {
          visible, hide: !visible,
        })}
        {...resetProps}
      >
        <div className={styles.title} onClick={this.onClick.bind(this)}>
          {title && title.length > 0 && title[0].label}
        </div>
        <div className={styles.option} >
          {option.map((item, idx) => {
            return (
              <div
                key={idx}
                className={classNames('item', {
                  selected: item.value === value,
                })}
                onClick={this.onSelect.bind(this, item)}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Select.propsTypes = {
  value: PropTypes.string,
  option: PropTypes.array,
  onSelect: PropTypes.func,
};

Select.defaultProps = {
  option: [],
  onSelect() {},
};
