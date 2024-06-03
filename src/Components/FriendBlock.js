import standartAavatar from "../Pictures/standart-avatar.png";
import deletePng from "../Pictures/trashPng.png";
import "./FriendBlock.css";

export default function FriendBlock({ name, link }) {
  return (
    <>
      <div className="div-border">
        <img
          style={{ margin: "10px" }}
          src={standartAavatar}
          alt="Self account"
          className="circular-image-standart"
        />
        <strong style={{ fontSize: "20px" }}>{name}</strong>
        <div style={{ marginLeft: "auto" }}>
          <img
            src={deletePng}
            height="20"
            width="20"
            alt="RemoveFriend"
            style={{ margin: "15px", filter: "brightness(0) invert(1)" }}
          />
        </div>
      </div>
    </>
  );
}

