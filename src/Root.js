import React, { Component } from 'react';
import Container from './component/container';
import Github from './pages/Github';
import History from './pages/History';

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <History />
        <Github />
      </Container>
    );
  }
}
