import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './index.module.less';


const rotations = [0, 0, 0]; // [seconds, minutes, hours]

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  setTime() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12;

    if (seconds === 0) {
      rotations[0] += 1;
    }

    if (minutes === 0 && seconds === 0) {
      rotations[1] += 1;
    }

    if (hours === 0 && minutes === 0 && seconds === 0) {
      rotations[2] += 1;
    }

    const secondsDeg = ((seconds / 60) * 360) + (rotations[0] * 360);
    const minutesDeg = ((minutes / 60) * 360) + (rotations[1] * 360);
    const hoursDeg = ((hours / 12) * 360) + ((minutes / 60) * 30) + (rotations[2] * 360);
    if (this.handHour) {
      this.handHour.style.transform = `rotate(${hoursDeg}deg)`;
    }
    if (this.handMinute) {
      this.handMinute.style.transform = `rotate(${minutesDeg}deg)`;
    }
    if (this.handSecond) {
      this.handSecond.style.transform = `rotate(${secondsDeg}deg)`;
    }
  }
  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }
  componentDidMount() {
    this.setTime();
    this.interval = setInterval(() => {
      this.setTime();
    }, 1000);
  }
  render() {
    return (
      <svg className={classNames(styles.clock)} viewBox="0 0 100 100">
        <g className={classNames(styles.marks)}>
          <line className={classNames(styles.marks, styles.mark1)} x1="50" y1="5" x2="50" y2="10" />
          <line className={classNames(styles.marks, styles.mark2)} x1="50" y1="5" x2="50" y2="10" />
          <line className={classNames(styles.marks, styles.mark3)} x1="50" y1="5" x2="50" y2="10" />
          <line className={classNames(styles.marks, styles.mark4)} x1="50" y1="5" x2="50" y2="10" />
          <line className={classNames(styles.marks, styles.mark5)} x1="50" y1="5" x2="50" y2="10" />
          <line className={classNames(styles.marks, styles.mark6)} x1="50" y1="5" x2="50" y2="10" />
          <line className={classNames(styles.marks, styles.mark7)} x1="50" y1="5" x2="50" y2="10" />
          <line className={classNames(styles.marks, styles.mark8)} x1="50" y1="5" x2="50" y2="10" />
          <line className={classNames(styles.marks, styles.mark9)} x1="50" y1="5" x2="50" y2="10" />
          <line className={classNames(styles.marks, styles.mark10)} x1="50" y1="5" x2="50" y2="10" />
          <line className={classNames(styles.marks, styles.mark11)} x1="50" y1="5" x2="50" y2="10" />
          <line className={classNames(styles.marks, styles.mark12)} x1="50" y1="5" x2="50" y2="10" />
        </g>
        <line ref={node => this.handHour = node} className={classNames(styles.hand, styles.handHour)} x1="50" y1="25" x2="50" y2="50" />
        <line ref={node => this.handMinute = node} className={classNames(styles.hand, styles.handMinute)} x1="50" y1="10" x2="50" y2="50" />
        <circle cx="50" cy="50" r="3" />
        <g ref={node => this.handSecond = node} className={classNames(styles.hand, styles.handSecond)}>
          <line x1="50" y1="10" x2="50" y2="60" />
          <circle cx="50" cy="50" r="1.5" />
        </g>
      </svg>
    );
  }
}
