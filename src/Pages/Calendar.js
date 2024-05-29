import React, { Component } from "react";
import Header from "../Components/Header";
import { Container } from "react-bootstrap";

export default class Calendar extends Component {
  f;
  render() {
    return (
      <>
        <Header />
        <Container>
          <h2>Calendar</h2>
        </Container>
      </>
    );
  }
}
