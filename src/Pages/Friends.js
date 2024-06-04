import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { Container } from "react-bootstrap";
import FriendBlock from "../Components/FriendBlock";
import addFriend from "../Pictures/add-friend.png";
import AddFriend from "../Pages/ask-pages/AddFriend";
import axios from "axios";

const Friends = () => {
  const [show, setShow] = useState(false);
  const [records, setRecords] = useState([]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://34.79.184.250/api/friends", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setRecords(response.data.friends);
        } else {
          console.error("Error fetching friends:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, []);

  const handleAdd = (newRecord) => {
    setRecords([...records, newRecord]);
  };

  return (
    <>
      <Header />
      <Container>
        <AddFriend show={show} handleClose={handleClose} handleAdd={handleAdd} />
        <div className="header-div">
          <h1>Friends</h1>
          <div style={{ marginLeft: "auto" }}>
            <img
              src={addFriend}
              height="30"
              width="30"
              alt="AddFriend"
              style={{ margin: "15px", filter: "brightness(0) invert(1)" }}
              onClick={handleShow}
            />
          </div>
        </div>

        {records.map((friend) => (
          <FriendBlock key={friend.Id} name={friend.Tag} />
        ))}
      </Container>
    </>
  );
};

export default Friends;
