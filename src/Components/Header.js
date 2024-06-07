import React, { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../Pictures/Logo.png";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Header extends Component {
  render() {
    return (
      <>
        <Navbar
          sticky="top"
          collapseOnSelect
          expand="md"
          bg="dark"
          variant="dark"
        >
          <Container>
            <Navbar.Brand href="/home" className="d-flex align-items-center">
              <img
                src={logo}
                height="50"
                width="50"
                className="d-inline-block align-top"
                alt="Logo"
              />
              NutriNote
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="/account"> Profile </Nav.Link>
                <Nav.Link href="/notes"> Notes </Nav.Link>
                <Nav.Link href="/friends"> Friends </Nav.Link>
                <Nav.Link href="/tips"> Tips </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}
