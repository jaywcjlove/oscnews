import React from 'react';
import styles from './index.module.less';

export default class Modal extends Component {
  render() {
    return (
      <div>
        <div className={styles.mask}>
        </div>
      </div>
    )
  }
}