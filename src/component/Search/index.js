import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './index.less';
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
      autoFocus,
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
          <input ref={input => this.input = input} placeholder={placeholder} autoFocus={autoFocus} autoComplete={autoComplete} style={inputStyle} value={query} onChange={onChange} onKeyUp={onKeyUp} />
        </div>
        <div className={styles.searchBtn}>
          <button onClick={onSearch}>搜索</button>
        </div>
      </div>
    );
  }
}
