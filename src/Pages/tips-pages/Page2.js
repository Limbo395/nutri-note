import React, { Component } from "react";
import { Container } from "react-bootstrap";
import eatRight from "../../Pictures/eat-right.png";

export default class Page2 extends Component {
  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <img
            src={eatRight}
            height="350"
            width="350"
            className="d-inline-block align-top"
            alt="Logo"
          />
          <h2>Benefits of a Balanced Diet</h2>
        </div>
        <p>
          A balanced diet is not just about eating a mix of different foods;
          it's about ensuring your body receives all the essential nutrients it
          needs to function optimally. By incorporating a variety of foods into
          your daily meals, you can ensure that you're getting a full range of
          vitamins, minerals, and other important nutrients.
        </p>
        <p>
          One of the primary benefits of a balanced diet is that it supports
          overall health and well-being. When you provide your body with the
          right nutrients in the right proportions, you're better equipped to
          maintain a healthy weight, support proper growth and development, and
          reduce your risk of chronic diseases such as heart disease, diabetes,
          and certain cancers.
        </p>
        <p>
          Another advantage of a balanced diet is that it helps to keep your
          energy levels stable throughout the day. By including a combination of
          complex carbohydrates, protein, and healthy fats in your meals and
          snacks, you can avoid the energy crashes that often accompany diets
          high in refined sugars and processed foods.
        </p>
        <p>
          Furthermore, a balanced diet can support mental health and cognitive
          function. Certain nutrients, such as omega-3 fatty acids found in oily
          fish, and antioxidants found in fruits and vegetables, have been
          linked to improved mood, memory, and concentration.
        </p>
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
        <p>
          For more information, visit the{" "}
          <a href="https://www.nhs.uk/live-well/eat-well/the-eatwell-guide/">
            NHS Eatwell Guide
          </a>
        </p>
      </Container>
    );
  }
}
