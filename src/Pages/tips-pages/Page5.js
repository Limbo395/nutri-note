import React, { Component } from "react";
import { Container } from "react-bootstrap";

export default class Page5 extends Component {
  render() {
    return (
      <Container style={{ marginTop: '20px' }}>
        <h1>Tips for Healthy Eating</h1>
        <p>
          Healthy eating doesn't have to be complicated. Focus on incorporating
          a variety of foods from all food groups, controlling portion sizes,
          and staying hydrated.
        </p>
        <p>
          For practical tips on healthy eating, visit{" "}
          <a href="https://www.choosemyplate.gov/">ChooseMyPlate.gov</a>.
        </p>
      </Container>
    );
  }
}
