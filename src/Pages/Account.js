import React, { Component } from "react";
import Header from "../Components/Header";
import { Button, Container } from "react-bootstrap";
import standartAavatar from "../Pictures/standart-avatar.png";
import AccountForm from "../Components/AccountForm";
import "./Account.css";

export default class Account extends Component {
  logOut = () => {
    window.location.href = "/";
  };

  render() {
    return (
      <>
        <Header />
        <Container>
          <div className="header-div">
          <img
            src={standartAavatar}
            alt="My avatar"
            className="circular-image-standart-for-account-page"
          />
            <h1>Account</h1>
            <Button style={{ marginLeft: "auto" }} onClick={this.logOut}>
              LogOut
            </Button>
          </div>
          <div className="header">
          
          </div>
          <AccountForm/>
          
        </Container>
      </>
    );
  }
}
