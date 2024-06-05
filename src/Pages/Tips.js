import React, { Component } from "react";
import Header from "../Components/Header";
import { Col, Container, Row, Nav, Tab } from "react-bootstrap";
import Page1 from "./tips-pages/Page1";
import Page2 from "./tips-pages/Page2";
import Page3 from "./tips-pages/Page3";
import Page4 from "./tips-pages/Page4";
import Page5 from "./tips-pages/Page5";
import backgroundImage from "../Pictures/tips-background.png";

export default class Tips extends Component {
  render() {
    const backgroundStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    };

    return (
      <>
        <div style={backgroundStyle}>
          <Header />
          <Container>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row style={{justifyContent: "center"}}>
                <Col
                  sm={1}
                  style={{
                    
                    borderRadius: "15px",
                    backgroundColor: "#22262a",
                    height: "215px",
                    maxWidth: "300px",
                    minWidth: "200px",
                    marginTop: "15px"
                  }}
                >
                  <Nav variant="pills" className="flex-column mt-2">
                    <Nav.Item>
                      <Nav.Link
                        eventKey="first"
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        Introduction
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="second"
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        Benefits
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="third"
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        Regularity
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="fourth"
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        Mental Health
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="fifth"
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        Useful videos
                      </Nav.Link>
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
        </div>
      </>
    );
  }
}
// просто що-небудь
// просто що-небудь №2
