import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Alert, Container } from "react-bootstrap";
import axios from "axios";

const AccountForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentHeight, setCurrentHeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [currentAge, setCurrentAge] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found, please log in again.");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/get-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        const userData = response.data;
        setCurrentUsername(userData.username);
        setCurrentEmail(userData.email);
        setCurrentHeight(userData.height);
        setCurrentWeight(userData.weight);
        setCurrentAge(userData.age);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data: " + (error.response?.data?.message || error.message));
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found, please log in again.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/edit-user",
        { username, email, password, height, weight, age },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.data.success) {
        setSuccess("Account updated successfully!");
      } else {
        setError("Failed to update account: " + response.data.message);
      }
    } catch (error) {
      console.error("Error updating account:", error);
      setError("Error updating account: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Container style={{maxWidth:"750px"}}>
      <div style={{ backgroundColor: "#1b1e21", borderRadius: "60px", marginBottom: "20px", paddingTop: "30px"  }}>
        <Row className="justify-content-md-center" style={{ margin: "20px"}} >
          <Col md="10">
            <div className="form-header">
              <h2 style={{ color: "white" }}>{"Account Settings"}</h2>
            </div>
            <Form onSubmit={handleSubmit}>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form.Group controlId="formBasicUsername">
                <Form.Label style={{ color: "white" }}>Nickname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={currentUsername || "Enter nickname"}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label style={{ color: "white" }}>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={currentEmail || "Enter email"}
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
              <Form.Group controlId="formHeight">
                <Form.Label style={{ color: "white" }}>Height (cm)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={currentHeight || "Enter height"}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formWeight">
                <Form.Label style={{ color: "white" }}>Weight (kg)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={currentWeight || "Enter weight"}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formAge">
                <Form.Label style={{ color: "white" }}>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={currentAge || "Enter age"}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="form-footer">
                <Button variant="primary" type="submit" block style={{ marginBottom: "25px" }}>
                  Save Changes
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default AccountForm;
