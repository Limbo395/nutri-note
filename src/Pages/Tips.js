import React, { Component } from "react";
import Header from "../Components/Header";
import { Col, Container, Row, Nav, Tab } from "react-bootstrap";
import Page1 from "./tips-pages/Page1";
import Page2 from "./tips-pages/Page2";
import Page3 from "./tips-pages/Page3";
import Page4 from "./tips-pages/Page4";
import Page5 from "./tips-pages/Page5";

export default class Tips extends Component {
  render() {
    return (
      <>
        <Header />
        <Container>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column mt-2">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Text1</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Text2</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Text3</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fourth">Text4</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fifth">Text5</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Page1 />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Page2 />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <Page3 />
                  </Tab.Pane>
                  <Tab.Pane eventKey="fourth">
                    <Page4 />
                  </Tab.Pane>
                  <Tab.Pane eventKey="fifth">
                    <Page5 />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </>
    );
  }
}
// просто що-небудь
// просто що-небудь №2
