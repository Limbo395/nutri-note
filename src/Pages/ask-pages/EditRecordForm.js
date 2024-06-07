import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import AvocadoGentelmen from "../../Pictures/avocado-gentelman.png";

const EditRecordForm = ({ show, handleClose, recordId, initialCalories, initialComment }) => {
  const [calories, setCalories] = useState(initialCalories);
  const [comment, setComment] = useState(initialComment);

  const handleEdit = async ({ recordId, calories, comment, date }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found, please log in again.");
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/api/edit-note",
        { noteId: recordId, calories, comment, date},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (response.data.success) {
        alert("Record edited successfully!");
      } else {
        alert("Failed to edit record: " + response.data.message);
      }
    } catch (error) {
      console.error("Error editing record:", error);
      alert("Error editing record: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found, please log in again.");
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/api/delete-note",
        { noteId: recordId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (response.data.success) {
        alert("Record deleted successfully!");
        handleClose();
      } else {
        alert("Failed to delete record: " + response.data.message);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Error deleting record: " + (error.response?.data?.message || error.message));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleEdit({ recordId, calories: parseInt(calories, 10), comment });
    handleClose();
  };

  return (
    <Modal style={{ color: "black" }} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "40px" }}>
          <img
            src={AvocadoGentelmen}
            height="65"
            width="auto"
            className="d-inline-block align-top"
            alt="Logo"
          />
          Edit Record
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ margin: "10px", marginTop: "0px" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCalories">
            <Form.Label style={{ fontSize: "25px" }}>
              Calories (kkal):
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
          <div style={{ justifyContent: "center", display: "flex", gap: "15px" }}>
            <Button
              style={{ marginTop: "15px", width: "100px" }}
              variant="primary"
              type="submit"
            >
              Save
            </Button>
            <Button
              style={{ marginTop: "15px", width: "100px" }}
              variant="secondary"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditRecordForm;
