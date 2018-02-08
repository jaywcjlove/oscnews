import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export default function Search({ className, query, onChange, onKeyUp, onSearch, style, inputStyle }) {
  return (
    <div className={classNames(styles.search, className)} style={style}>
      <input style={inputStyle} value={query} onChange={onChange} onKeyUp={onKeyUp} />
      <div className={styles.searchBtn}>
        <button onClick={onSearch}>搜索</button>
      </div>
    </div>
  );
}
