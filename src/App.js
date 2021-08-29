import React from 'react';
import Racing from './components/racing.js';
import {Container,Row} from 'react-bootstrap';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }


  render() {
      return (
        <Container md={6} style={{padding:'2rem'}}>
        <Row>
        <Racing/>
        </Row>
    </Container>
      );
    }
  }
