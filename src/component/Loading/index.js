import React from 'react';
import classNames from 'classnames';
import styles from './index.module.less';

export default function Loading({ visible, className }) {
  if (!visible) return null;
  return (
    <div className={classNames(styles.warpper, className)}>
      <div className={styles.ballSpinFadeLoader}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
