

import React, { Component } from "react";
import Header from "../Components/Header";
import { Container } from "react-bootstrap";

export default class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <Container>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h1>Поставте 100 балів🥺</h1>
            <div class="ratio ratio-16x9" style={{ marginBottom: "30px" }}>
              <iframe
                src="https://www.youtube.com/embed/bMiZkmqMIK0"
                title="YouTube video"
                allowfullscreen
              />
            </div>
          </div>
        </Container>
      </>
    );
  }
}