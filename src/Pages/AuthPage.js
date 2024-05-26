import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";
import logo from "../Pictures/Logo.png";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Тут потрібно додати логіку для обробки логіна/реєстрації
    // Наприклад, відправити дані на сервер

    // Після успішного проходження перекинути на головну сторінку
    navigate("/home");
  };

  return (
    <div className="auth-wrapper">
      <Container className="auth-container">
        <Row className="justify-content-md-center">
          <Col md="6">
            <div className="form-header">
              <img
                src={logo}
                height="250"
                width="250"
                className="d-inline-block align-top"
                alt="Logo"
              />
              <h2>{"NutriNote"}</h2>
            </div>
            <Form onSubmit={handleSubmit}>
              {!isLogin && (
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Nickname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter nickname"
                    required
                  />
                </Form.Group>
              )}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  required
                />
              </Form.Group>
              {!isLogin && (
                <Form.Group controlId="formBasicPasswordRepeat">
                  <Form.Label>Repeat Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Repeat password"
                    required
                  />
                </Form.Group>
              )}
              <div className="form-footer">
                <Button variant="primary" type="submit" block>
                  {isLogin ? "Login" : "Register"}
                </Button>
              </div>
            </Form>
            <div className="form-footer">
              <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Switch to Register" : "Switch to Login"}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuthPage;
