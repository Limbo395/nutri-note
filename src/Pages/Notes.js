import React, { useState } from "react";
import Header from "../Components/Header";
import { Container } from "react-bootstrap";
import NotesBlock from "../Components/NotesBlock";
import addNote from "../Pictures/plus-png.png";
import AddRecordForm from "./ask-pages/AddRecordForm";

const History = () => {
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
      <AddRecordForm
        show={show}
        handleClose={handleClose}
        handleAdd={handleAdd}
        editParametrs={0}
      />
        <div className="header-div">
          <h1>Notes</h1>
          <div style={{ marginLeft: "auto" }}>
            <img
              src={addNote}
              height="30"
              width="30"
              alt="RemoveFriend"
              style={{ margin: "15px", filter: "brightness(0) invert(1)" }}
              onClick={handleShow}
            />
          </div>
        </div>

        <NotesBlock data="21-09-2024" />
        <NotesBlock data="20-09-2024" />
        <NotesBlock data="19-09-2024" />
        <NotesBlock data="18-09-2024" />
        <NotesBlock data="17-09-2024" />
      </Container>
    </>
  );
};

export default History;
