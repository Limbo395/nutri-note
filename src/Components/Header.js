import React, { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../Pictures/Logo.png";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../Pages/Home";
import Account from "../Pages/Account";
import Calendar from "../Pages/Calendar";
import History from "../Pages/History";
import Friends from "../Pages/Friends";
import Tips from "../Pages/Tips";

export default class Header extends Component {
  render() {
    return (
      <>
        <Navbar sticky="top" collapseOnSelect expand="md" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/" className="d-flex align-items-center">
              <img
                src={logo}
                height="50"
                width="50"
                className="d-inline-block align-top"
                alt="Logo"
              /> NutriNote
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="/account"> Профіль </Nav.Link>
                <Nav.Link href="/calendar"> Календар </Nav.Link>
                <Nav.Link href="/history"> Історія </Nav.Link>
                <Nav.Link href="/friends"> Друзі </Nav.Link>
                <Nav.Link href="/tips"> Поради </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/account" element={<Account/>}/>
            <Route path="/calendar" element={<Calendar/>}/>
            <Route path="/history" element={<History/>}/>
            <Route path="/friends" element={<Friends/>}/>
            <Route path="/tips" element={<Tips/>}/>
          </Routes>
        </Router>
      </>
    );
  }
}
