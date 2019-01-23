import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.less';

export default class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { percent, ...resetProps } = this.props;
    const percentStyle = {
      width: `${percent}%`,
    };
    return (
      <div className={styles.progress} {...resetProps}>
        <div className={styles.inner}>
          <div className={styles.bar} style={percentStyle} />
        </div>
      </div>
    );
  }
}

Progress.propTypes = {
  percent: PropTypes.number.isRequired,
};

Progress.defaultProps = {
  percent: 0, // 百分比（必填）
};
