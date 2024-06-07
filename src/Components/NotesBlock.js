
import notePng from "../Pictures/note-png.png";
import React, { useState } from "react";
import "./NotesBlock.css";
import EditRecordForm from "../Pages/ask-pages/EditRecordForm";

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const NotesBlock = ({ id, data, calories, comment }) => {
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleShow = () => {
    setEditId(id);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  return (
    <>
      <EditRecordForm
        show={show}
        handleClose={handleClose}
        recordId={editId}
        initialCalories={calories}
        initialComment={comment}
      />
      <div className="div-border">
        <img
          style={{ margin: "10px" }}
          src={notePng}
          alt="Note"
          className="image"
        />
        <div className="note-content">
          <strong style={{ fontSize: "20px" }}>{formatDate(data)}</strong>
          <p><strong>Cal:</strong> {calories} kcal</p>
        </div>
        <button 
          style={{ marginLeft: "auto", borderEndEndRadius: "15px", borderStartEndRadius: "15px" }} 
          onClick={handleShow}
        >
          <h5 style={{ margin: "20px" }}>
            <strong>Edit</strong>
          </h5>
        </button>
      </div>
    </>
  );
};

export default NotesBlock;