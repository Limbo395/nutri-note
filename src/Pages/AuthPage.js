import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthPage.css";
import logo from "../Pictures/Logo.png";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const endpoint = isLogin ? "/api/login" : "/api/register";
      const payload = isLogin ? { email, password } : { email, password, username };

      const response = await axios.post(endpoint, payload);

      if (response.data.success) {
        navigate("/home");
      } else {
        setError(response.data.message || "An error occurred");
      }
    } catch (error) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="auth-wrapper">
      <Container className="auth-container">
        <Row className="justify-content-md-center">
          <Col md="8">
            <div className="form-header">
              <img
                src={logo}
                height="250"
                width="250"
                className="d-inline-block align-top"
                alt="Logo"
              />
              <h2 style={{ color: "black" }}>{"NutriNote"}</h2>
            </div>
            <Form onSubmit={handleSubmit}>
              {error && <Alert variant="danger">{error}</Alert>}
              {!isLogin && (
                <Form.Group controlId="formBasicUsername">
                  <Form.Label style={{ color: "black" }}>Nickname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter nickname"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
              )}
              <Form.Group controlId="formBasicEmail">
              <Form.Label style={{ color: "black" }}>
                  Email address
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label style={{ color: "black" }}>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              {!isLogin && (
                <Form.Group controlId="formBasicPasswordRepeat">
                  <Form.Label style={{ color: "black" }}>Repeat Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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