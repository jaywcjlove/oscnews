import React from 'react';
import classNames from 'classnames';
import styles from './index.less';
import Select from '../Select';

export default function Search({
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
}) {
  return (
    <div className={classNames(styles.search, className)} style={style}>
      <div className={classNames(styles.input, { [`${styles.noSelect}`]: !select })}>
        {select && <Select {...select} />}
        <input placeholder={placeholder} autoFocus={autoFocus} autoComplete={autoComplete} style={inputStyle} value={query} onChange={onChange} onKeyUp={onKeyUp} />
      </div>
      <div className={styles.searchBtn}>
        <button onClick={onSearch}>搜索</button>
      </div>
    </div>
  );
}
