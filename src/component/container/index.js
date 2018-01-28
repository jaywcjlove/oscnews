import React, { Component } from 'react';
import Header from '../Header';
import OSCNews from '../OSCNews';
import styles from './index.less';

const contentType = localStorage.getItem('content-type');

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: contentType || 'trending',
    };
  }
  render() {
    const { children } = this.props;
    return (
      <div className={styles.warpper}>
        <div className={styles.header}>
          <Header onChange={(type) => { this.setState({ type }); }} />
        </div>
        <div className={styles.content}>
          <div className={styles.oscnews}>
            <OSCNews />
          </div>
          <div className={styles.trending}>
            {React.Children.map(children, (Child) => {
              if (!Child || Child.type.typeName !== this.state.type) return null;
              return React.cloneElement(Child, {
                contentType: this.state.contentType,
              });
            })}
          </div>
        </div>
      </div>
    );
  }
}
