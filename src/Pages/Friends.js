import React, { Component } from "react";
import Header from "../Components/Header";
import { Container } from "react-bootstrap";
import FriendBlock from "../Components/FriendBlock";
import addFriend from "../Pictures/add-friend.png";

export default class Friends extends Component {
  render() {
    return (
      <>
        <Header />
        <Container>
          <div className="header-div">
            <h1>Friends</h1>
            <div style={{ marginLeft: "auto" }}>
              <img
                src={addFriend}
                height="30"
                width="30"
                alt="RemoveFriend"
                style={{ margin: "15px", filter: "brightness(0) invert(1)" }}
              />
            </div>
          </div>

          <FriendBlock name="Stepan" />
          <FriendBlock name="Roma" />
          <FriendBlock name="Pidor" />
          <FriendBlock name="Ser Gay" />
          <FriendBlock name="Help me" />
        </Container>
      </>
    );
  }
}
