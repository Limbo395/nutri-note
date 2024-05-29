import React, { Component } from "react";
import Header from "../Components/Header";
import { Container } from "react-bootstrap";

export default class Friends extends Component {
  render() {
    return (
      <>
        <Header />
        <Container>
          <h2>Friends</h2>
        </Container>
      </>
    );
  }
}
