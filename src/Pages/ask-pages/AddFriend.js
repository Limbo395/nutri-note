import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import AvocadoFriend from "../../Pictures/avocado-friend.png";
import axios from "axios";

const AddFriend = ({ show, handleClose }) => {
  const [friendTag, setFriendTag] = useState("");

  const handleAdd = async ({ friendTag }) => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.post(
        "http://34.79.184.250/api/add-friend",
        { friendTag },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        alert("Friend added successfully!");
      } else {
        alert("Failed to add friend: " + response.data.message);
      }
    } catch (error) {
      console.error("Error adding friend:", error);
      alert("Error adding friend");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleAdd({ friendTag });
    setFriendTag("");
    handleClose();
  };

  return (
    <Modal style={{ color: "black" }} show={show} onHide={handleClose}>
      <Modal.Header
        style={{ alignItems: "center", display: "flex" }}
        closeButton
      >
        <Modal.Title style={{ fontSize: "30px" }}>
          <img
            style={{ marginRight: "10px" }}
            src={AvocadoFriend}
            height="60"
            width="auto"
            className="d-inline-block align-top"
            alt="Logo"
          />
          Add New Friend
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ margin: "10px", marginTop: "0px" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFriendTag">
            <Form.Label style={{ fontSize: "20px" }}>Friend tag:</Form.Label>
            <Form.Control
              type="text"
              value={friendTag}
              onChange={(e) => setFriendTag(e.target.value)}
              required
            />
          </Form.Group>
          <div style={{ justifyContent: "center", display: "flex" }}>
            <Button
              style={{ marginTop: "15px", width: "150px" }}
              variant="primary"
              type="submit"
            >
              Find and Add
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddFriend;
