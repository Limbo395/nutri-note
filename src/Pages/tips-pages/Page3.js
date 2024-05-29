import React, { Component } from "react";
import { Container } from "react-bootstrap";

export default class Page3 extends Component {
  render() {
    return (
      <Container style={{ marginTop: '20px' }}>
        <h1>Importance of Regular Exercise</h1>
        <p>
          Regular exercise is crucial for maintaining physical fitness and
          overall health. It helps to reduce the risk of chronic diseases,
          improve mental health, and enhance the quality of life.
        </p>
        <p>
          Check out the exercise guidelines by the{" "}
          <a href="https://www.cdc.gov/physicalactivity/basics/index.htm">
            CDC
          </a>
          .
        </p>
      </Container>
    );
  }
}
