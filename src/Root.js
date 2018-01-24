import React from 'react';
import Header from './component/Header';
import styles from './Root.less'

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newList: 'loading...',
    };
  }
  componentDidMount() {
    fetch('http://www.oschina.net/action/ajax/get_more_news_list', {
      p: 1,
      newsType: 'project',
    }).then((response) => {
      return response.text();
    }).then((response) => {
      response = response.replace(/<a\b[^>]+\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (node, url, text) => {
        if (/^\//.test(url)) {
          node = `<a href="http://www.oschina.net/${url}" class="title">${text}</a>`;
        }
        return node;
      }).replace(/<img\b[^>]+\bsrc="([^"]*)"[^>]/gi, (node, url) => {
        if (/^\//.test(url)) {
          return node.replace(url, `https://static.oschina.net${url}`);
        }
        return node;
      });
      this.setState({
        newList: response,
      });
    }).catch(error => this.setState({ newList:'请求失败！' }));
  }
  render() {
    return (
      <div> 
        <Header />  
        <div className={styles.newList} dangerouslySetInnerHTML={{ __html: this.state.newList }} />
      </div>
    );
  }
}