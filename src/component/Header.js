import React from 'react';
import logo from '../assets/oschina.svg';
import gitee from '../assets/gitee.svg';
import github from '../assets/github.svg';
import styles from './Header.less';

// export default class Header extends PureComponent {
export default function Header() {
  return (
    <div className={styles.warpper}>
      <div className={styles.logo}>
        <a href="http://www.oschina.net/" rel="noopener noreferrer" target="_blank"><img title="开源中国" alt="开源中国" src={logo} /></a>
      </div>
      <div className={styles.menu}>
        <a href="https://gitee.com/"><img title="码云" alt="码云" src={gitee} /></a>
        <a href="https://github.com/"><img title="Github" alt="Github" src={github} /></a>
      </div>
    </div>
  );
}
