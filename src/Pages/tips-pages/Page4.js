import React, { Component } from "react";
import { Container } from "react-bootstrap";

export default class Page4 extends Component {
  render() {
    return (
      <Container style={{ marginTop: '20px' }}>
        <h1>Mental Health and Well-being</h1>
        <p>
          Mental health is a vital part of overall wellness. It affects how we
          think, feel, and act. Good mental health allows individuals to cope
          with the stresses of life, work productively, and contribute to their
          community.
        </p>
        <p>
          Find more resources on mental health at{" "}
          <a href="https://www.mentalhealth.gov/">MentalHealth.gov</a>.
        </p>
      </Container>
    );
  }
}
