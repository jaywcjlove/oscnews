import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './index.module.less';
import Select from '../Select';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      className,
      placeholder,
      autoComplete = 'off',
      // autoFocus,
      select,
      query,
      onChange,
      onKeyUp,
      onSearch,
      style,
      inputStyle,
    } = this.props;

    return (
      <div className={classNames(styles.search, className)} style={style}>
        <div className={classNames(styles.input, { [`${styles.noSelect}`]: !select })}>
          {select && <Select {...select} />}
          <input type="text" ref={input => this.input = input} placeholder={placeholder} autoComplete={autoComplete} style={inputStyle} value={query} onChange={onChange} onKeyUp={onKeyUp} />
        </div>
        <div className={styles.searchBtn}>
          <button type="button" onClick={onSearch}>搜索</button>
        </div>
      </div>
    );
  }
}
