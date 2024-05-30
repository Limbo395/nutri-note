import React, { Component } from "react";
import { Container } from "react-bootstrap";

export default class PageFirst extends Component {
  render() {
    return (
      <Container style={{ marginBottom: "150px", marginTop: "30px" }}>
        <h1 className="header">
          <strong>Introduction to Healthy Living</strong>
        </h1>
        <p>
          Healthy living involves making positive choices that enhance your
          physical, mental, and emotional well-being. It is more than just
          eating right and exercising; it's about maintaining a balanced
          lifestyle that promotes overall health.
        </p>
        <h2>Check this video:</h2>
        <div class="ratio ratio-16x9" style={{ marginBottom: "30px" }}>
          <iframe
            src="https://www.youtube.com/embed/c06dTj0v0sM"
            title="YouTube video"
            allowfullscreen
          />
        </div>
        <p>
          Learn more about healthy living from the{" "}
          <a href="https://www.who.int/health-topics/healthy-living">
            World Health Organization
          </a>
        </p>
      </Container>
    );
  }
}
