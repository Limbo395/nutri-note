import React, { Component } from "react";
import { Container } from "react-bootstrap";
import eatRight from "../../Pictures/eat-right.png";
import "./Page2.css"; // Import the CSS file

export default class Page2 extends Component {
  render() {
    return (
      <Container style={{ marginBottom: "150px", marginTop: "30px" }}>
        <h1 className="header">
          <strong>Benefits of a Balanced Diet</strong>
        </h1>
        <div className="content">
          <img
            src={eatRight}
            height="350"
            width="350"
            className="d-inline-block align-top"
            alt="Logo"
          />
          <div className="text">
            <p>
              A balanced diet is not just about eating a mix of different foods;
              it's about ensuring your body receives all the essential nutrients
              it needs to function optimally. By incorporating a variety of
              foods into your daily meals, you can ensure that you're getting a
              full range of vitamins, minerals, and other important nutrients.
            </p>
            <p>
              Another advantage of a balanced diet is that it helps to keep your
              energy levels stable throughout the day. By including a
              combination of complex carbohydrates, protein, and healthy fats in
              your meals and snacks, you can avoid the energy crashes that often
              accompany diets high in refined sugars and processed foods.
            </p>
            <p>
              Furthermore, a balanced diet can support mental health and
              cognitive function. Certain nutrients, such as omega-3 fatty acids
              found in oily fish, and antioxidants found in fruits and
              vegetables, have been linked to improved mood, memory, and
              concentration.
            </p>
          </div>
        </div>

        <p>
          Additionally, eating a variety of foods can enhance the enjoyment of
          meals and promote a healthy relationship with food. By exploring
          different flavors, textures, and cuisines, you can expand your palate
          and make eating a more pleasurable experience.
        </p>
        <p>
          Overall, a balanced diet is essential for supporting your body's
          overall health and functioning. By prioritizing nutrient-rich foods
          and incorporating a variety of foods into your meals, you can reap the
          numerous benefits of a well-rounded eating plan.
        </p>
        <p style={{ marginBottom: "100px" }}>
          For more information, visit the{" "}
          <a href="https://www.nhs.uk/live-well/eat-well/the-eatwell-guide/">
            NHS Eatwell Guide
          </a>
        </p>
      </Container>
    );
  }
}
