import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { Container } from "react-bootstrap";
import NotesBlock from "../Components/NotesBlock";
import addNote from "../Pictures/plus-png.png";
import AddRecordForm from "./ask-pages/AddRecordForm";
import axios from "axios";

const History = () => {
  const [show, setShow] = useState(false);
  const [records, setRecords] = useState([]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setRecords(response.data.records);
        } else {
          console.error("Error fetching records:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords();
  }, []);

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
              alt="Add Note"
              style={{ margin: "15px", filter: "brightness(0) invert(1)" }}
              onClick={handleShow}
            />
          </div>
        </div>

        {records && records.length > 0 ? (
          records.map((record) => (
            <NotesBlock
              key={record.RecordId}
              id={record.IdOfRecord}
              data={record.Date}
              calories={record.Callories}
              comment={record.Comment}
            />
          ))
        ) : (
          <p>No records available</p>
        )}
      </Container>
    </>
  );
};

export default History;