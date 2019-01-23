import React from 'react';
import styles from './Footer.module.less';

export default function Footer({ children }) {
  return (
    <div className={styles.footer}><span>{children}</span></div>
  );
}
