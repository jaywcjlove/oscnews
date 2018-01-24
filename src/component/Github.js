import React, { Component } from 'react';
import classNames from 'classnames';
import fetchs from '../utils/fetch';
import styles from './Github.less';

export default class Github extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'loading...',
    };
  }
  componentDidMount() {
    this.getTrending();
  }
  getTrending() {
    fetchs('https://github.com/trending').then((response) => {
      response = response.replace(/<div class="explore-content">([^<]+)<\/div >/, (node,list) => {
      // response = response.replace(/<div\b[^>]+\bclass="explore-content"[^>]*>([\s\S]*?)<\/div>/gi, (node,list) => {
        console.log('list:', list)
        return node;
      });
      // console.log('response:', response)
    }).catch((err) => {
      console.log('value:', err)
    })
  }
  render() {
    return (
      <div>
        {this.state.content}
      </div>
    )
  }
}