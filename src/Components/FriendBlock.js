import React from "react";
import standartAavatar from "../Pictures/standart-avatar.png";
import deletePng from "../Pictures/trashPng.png";
import "./FriendBlock.css";
import axios from "axios";

const FriendBlock = ({ friend }) => {
  const { Id, Tag } = friend;

  const handleRemoveFriend = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://34.79.184.250/api/remove-friend",
        { friendId: Id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        alert("Friend removed successfully!");
      } else {
        alert("Failed to remove friend: " + response.data.message);
      }
    } catch (error) {
      console.error("Error removing friend:", error);
      alert("Error removing friend");
    }
  };

  return (
    <div className="div-border">
      <img
        style={{ margin: "10px" }}
        src={standartAavatar}
        alt="Friend avatar"
        className="circular-image-standart"
      />
      <strong style={{ fontSize: "20px" }}>{Tag}</strong>
      <div style={{ marginLeft: "auto" }}>
        <img
          src={deletePng}
          height="20"
          width="20"
          alt="Remove friend"
          style={{ margin: "15px", filter: "brightness(0) invert(1)", cursor: "pointer" }}
          onClick={handleRemoveFriend}
        />
      </div>
    </div>
  );
};

export default FriendBlock;
