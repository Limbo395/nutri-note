import React, { Component } from "react";
import Header from "../Components/Header";
import { Button } from "react-bootstrap";

export default class Account extends Component {
  logOut = () => {
    window.location.href = '/';
  };

  render() {
    return (
      <>
        <Header />
        <h2>Account</h2>
        <Button onClick={this.logOut}>LogOut</Button>
      </>
    );
  }
}
