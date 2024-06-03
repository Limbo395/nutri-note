import notePng from "../Pictures/note-png.png";
import "./NotesBlock.css";

export default function FriendBlock({ data, link }) {
  return (
    <>
      <div className="div-border">
        <img
          style={{ margin: "10px" }}
          src={notePng}
          alt="Self account"
          className="image"
        />
        <strong style={{ fontSize: "20px" }}>{data}</strong>

        <div style={{ marginLeft: "auto" }}>
          <h5 style={{ margin: "20px" }}>
            <strong>Edit</strong>
          </h5>
        </div>
      </div>
    </>
  );
}
