import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import AvocadoCool from "../../Pictures/avocado-cool.png";

const AddRecordForm = ({ show, handleClose, handleAdd }) => {
  const [calories, setCalories] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAdd({ calories: parseInt(calories, 10), comment });
    setCalories("");
    setComment("");
    handleClose();
  };

  return (
    <Modal style={{ color: "black" }} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "40px" }}>
          <img
            src={AvocadoCool}
            height="65"
            width="auto"
            className="d-inline-block align-top"
            alt="Logo"
          />
          Add New Record
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ margin: "10px", marginTop: "0px" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCalories">
            <Form.Label style={{ fontSize: "25px" }}>
              Calories(kkal):
            </Form.Label>
            <Form.Control
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formComment">
            <Form.Label style={{ fontSize: "25px" }}>Comment:</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              style={{ resize: "none" }}
            />
          </Form.Group>
          <div style={{ justifyContent: "center", display: "flex" }}>
            <Button
              style={{ marginTop: "15px", width: "100px" }}
              variant="primary"
              type="submit"
            >
              Add
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddRecordForm;
