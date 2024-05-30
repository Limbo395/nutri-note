import React, { Component } from "react";
import Header from "../Components/Header";
import { Container } from "react-bootstrap";
import NotesBlock from "../Components/NotesBlock";
import addNote from "../Pictures/plus-png.png";

export default class History extends Component {
  render() {
    return (
      <>
        <Header />
        <Container>
          <div className="header-div">
            <h1>Notes</h1>
            <div style={{ marginLeft: "auto" }}>
              <img
                src={addNote}
                height="30"
                width="30"
                alt="RemoveFriend"
                style={{ margin: "15px", filter: "brightness(0) invert(1)" }}
              />
            </div>
          </div>

          <NotesBlock data="21-09-2024" />
          <NotesBlock data="20-09-2024" />
          <NotesBlock data="19-09-2024" />
          <NotesBlock data="18-09-2024" />
          <NotesBlock data="17-09-2024" />
        </Container>
      </>
    );
  }
}
