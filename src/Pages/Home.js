import React, { Component } from "react";
import Header from "../Components/Header";
import { Container } from "react-bootstrap";

export default class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <Container>
        <h2>Home</h2>
        </Container>
      </>
    );
  }
}
