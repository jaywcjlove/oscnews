import React from 'react';
import styles from './Footer.less';

export default function Footer({ children }) {
  return (
    <div className={styles.footer}><span>{children}</span></div>
  );
}
