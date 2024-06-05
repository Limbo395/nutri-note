import React, { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";

const AccountForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Валідація та логіка зміни даних акаунта
  };

  return (
    <Row className="justify-content-md-center">
      <Col
        md="8"
        style={{
          marginTop: "10px",
          padding: "30px",
          paddingBottom: "5px",
          backgroundColor: "#22262a",
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        <div className="form-header">
          <h2 style={{ color: "white" }}>{"Account Settings"}</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group controlId="formBasicUsername">
            <Form.Label style={{ color: "white" }}>Nickname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter nickname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ color: "white" }}>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{ color: "white" }}>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPasswordRepeat">
            <Form.Label style={{ color: "white" }}>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <div className="form-footer">
            <Button variant="primary" type="submit" block>
              Save Changes
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default AccountForm;
