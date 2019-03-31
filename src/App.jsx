import React, { Component } from 'react';
import logo from './logo.svg';
import styled, { keyframes } from 'styled-components';
import Router from './Router';

class App extends Component {
  render() {
    return (
      <Container>
        <Body>
          <Router />
        </Body>
      </Container>
    );
  }
}

const Container = styled.div`
  text-align: 'center';
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Body = styled.div`
  flex: 1 0;
`;

export default App;
