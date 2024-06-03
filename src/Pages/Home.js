// App.js
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddFriend from "./ask-pages/AddFriend";
import Header from "../Components/Header"

const Home = () => {
  const [show, setShow] = useState(false);
  const [records, setRecords] = useState([]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAdd = (newRecord) => {
    setRecords([...records, newRecord]);
  };

  return (
    <>
    <Header/>
      <Button variant="primary" onClick={handleShow}>
        Add Record
      </Button>

      <AddFriend
        show={show}
        handleClose={handleClose}
        handleAdd={handleAdd}
      />
    </>
  );
};

export default Home;
