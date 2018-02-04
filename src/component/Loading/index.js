import React from 'react';
import styles from './index.less';

export default function Loading({ visible }) {
  if (!visible) return null;
  return (
    <div className={styles.warpper}>
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
