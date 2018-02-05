import React, { Component } from 'react';
import Container from './component/container';
import Blank from './pages/Blank';
import Github from './pages/Github';
import History from './pages/History';
import Document from './pages/Document';
import Linux from './pages/Linux';

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { config } = this.props;
    return (
      <Container config={config} >
        <Blank />
        <History />
        <Github />
        <Document />
        <Linux />
      </Container>
    );
  }
}
