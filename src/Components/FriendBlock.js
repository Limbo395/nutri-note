import React, { useEffect, useState } from "react";
import standartAavatar from "../Pictures/standart-avatar.png";
import deletePng from "../Pictures/trashPng.png";
import "./FriendBlock.css";
import axios from "axios";

const FriendBlock = ({ name, id }) => {
  const [lastCalories, setLastCalories] = useState(null);

  useEffect(() => {
    const fetchLastCalories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/last-calories/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setLastCalories(response.data.lastCalories);
        } else {
          console.error("Failed to fetch last calorie record: " + response.data.message);
        }
      } catch (error) {
        console.error("Error fetching last calorie record:", error);
      }
    };

    fetchLastCalories();
  }, [id]);

  const handleRemoveFriend = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/remove-friend",
        { friendId: id },
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
      <strong style={{ fontSize: "20px" }}>{name}</strong>
      {lastCalories && (
        <div style={{ fontSize: "20px", marginLeft: "30px", paddingTop:"16px" }}>
          <p>Last note: {lastCalories.Callories}</p>
        </div>
      )}
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
