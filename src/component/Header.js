import React, { PureComponent } from 'react';
import logo from '../assets/oschina.svg';
import styles from './Header.less'

export default class Header extends PureComponent {
  render() {
    return (
      <div className={styles.warpper}>
        <a href="http://www.oschina.net/"><img src={logo} /></a>
      </div>
    );
  }
}