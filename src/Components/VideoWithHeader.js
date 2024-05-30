import React, { Component } from "react";

export default function VideoWithHeader({ text, link }) {
  return (
    <>
      <h3>{text}</h3>
      <div class="ratio ratio-16x9" style={{ marginBottom: "30px" }}>
        <iframe src={link} title="YouTube video" allowfullscreen />
      </div>
    </>
  );
}
