import React, { Component } from "react";
import Header from "../Components/Header";
import { Button, Container } from "react-bootstrap";

export default class Account extends Component {
  logOut = () => {
    window.location.href = "/";
  };

  render() {
    return (
      <>
        <Header />
        <Container>
          <h2>Account</h2>
          <Button onClick={this.logOut}>LogOut</Button>
        </Container>
      </>
    );
  }
}
