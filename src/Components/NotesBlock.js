import notePng from "../Pictures/note-png.png";
import React, { useState } from "react";
import "./NotesBlock.css";
import AddRecordForm from "../Pages/ask-pages/AddRecordForm";

const NotesBlock = ({ data, link }) => {
  const [show, setShow] = useState(false);
  const [records, setRecords] = useState([]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAdd = (newRecord) => {
    setRecords([...records, newRecord]);
  };

  return (
    <>
      <AddRecordForm
        show={show}
        handleClose={handleClose}
        handleAdd={handleAdd}
        editParametrs={1}
      />
      <div className="div-border">
        <img
          style={{ margin: "10px" }}
          src={notePng}
          alt="Self account"
          className="image"
          
        />
        <strong style={{ fontSize: "20px" }}>{data}</strong>

        <button style={{ marginLeft: "auto", borderEndEndRadius: "15px", borderStartEndRadius: "15px" }} onClick={handleShow}>
          <h5 style={{ margin: "20px" }}>
            <strong>Edit</strong>
          </h5>
        </button>
      </div>
    </>
  );
};

export default NotesBlock;
