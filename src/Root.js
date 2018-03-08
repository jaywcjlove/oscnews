import React, { Component } from 'react';
import Container from './component/container';
import { getNavData } from './Route';

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: props.config,
    };
  }
  componentDidMount() {
    const { config } = this.state;
    chrome.storage.onChanged.addListener((changes) => {
      for (const i in changes) {
        if (Object.prototype.hasOwnProperty.call(changes, i)) {
          config[i] = changes[i].newValue;
        }
      }
      this.setState({ config });
    });
  }
  render() {
    const { config } = this.state;
    config.menus = getNavData().filter((item) => {
      return { title: item.title, type: item.type };
    });
    return (
      <Container config={config} >
        {getNavData().map((item, idx) => {
          if (!item.component) return null;
          const Comp = item.component.default || item.component;
          return Comp ? <Comp key={idx} /> : null;
        })}
      </Container>
    );
  }
}
