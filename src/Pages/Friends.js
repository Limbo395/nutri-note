import React, { useState } from "react";
import Header from "../Components/Header";
import { Container } from "react-bootstrap";
import FriendBlock from "../Components/FriendBlock";
import addFriend from "../Pictures/add-friend.png";
import AddFriend from "../Pages/ask-pages/AddFriend";

const Friends = () => {
  const [show, setShow] = useState(false);
  const [records, setRecords] = useState([]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAdd = (newRecord) => {
    setRecords([...records, newRecord]);
  };

  return (
    <>
      <Header />
      <Container>
        <AddFriend
          show={show}
          handleClose={handleClose}
          handleAdd={handleAdd}
        />
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

        <FriendBlock name="Stepan" />
        <FriendBlock name="Roma" />
        <FriendBlock name="Pidor" />
        <FriendBlock name="Ser Gay" />
        <FriendBlock name="Help me" />
      </Container>
    </>
  );
};

export default Friends;
