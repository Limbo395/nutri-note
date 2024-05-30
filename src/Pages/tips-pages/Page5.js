import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "./Page5.css";
import VideoWithHeader from "../../Components/VideoWithHeader";

export default class Page5 extends Component {
  render() {
    return (
      <Container style={{ marginBottom: "150px", marginTop: "30px" }}>
        <VideoWithHeader
          text="The Science of Sleep: How to Sleep Better"
          link="https://www.youtube.com/embed/pwaWilO_Pig"
        />

        <VideoWithHeader
          text="How to Stay Calm When You Know You'll Be Stressed"
          link="https://www.youtube.com/embed/8jPQjjsBbIc"
        />

        <VideoWithHeader
          text="The Art of Stress-Free Productivity"
          link="https://www.youtube.com/embed/CHxhjDPKfbY"
        />

        <VideoWithHeader
          text="The Happy Secret to Better Work"
          link="https://www.youtube.com/embed/fLJsdqxnZb0"
        />
      </Container>
    );
  }
}
