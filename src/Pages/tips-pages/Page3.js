import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "./Page3.css";

export default class Page3 extends Component {
  render() {
    return (
      <Container
        style={{
          marginTop: "10px",
          padding: "40px",
          backgroundColor: "#22262a",
          borderRadius: "20px",
        }}
      >
        <h1 className="header">
          <strong>Regular Exercise</strong>
        </h1>
        <h4>Importance of regular exercise</h4>
        <p>
          Regular exercise is crucial for maintaining physical fitness and
          overall health, with benefits that extend to both physical and mental
          well-being. The Centers for Disease Control and Prevention (
          <a href="https://www.cdc.gov">CDC</a>) provides comprehensive
          guidelines on the amount and type of exercise needed to achieve these
          health benefits.
        </p>
        <h4>Physical activity guidelines for adults</h4>
        <p>
          The CDC recommends that adults engage in at least 150 minutes of
          moderate-intensity aerobic activity, such as brisk walking, or 75
          minutes of vigorous-intensity aerobic activity, like running, each
          week. This can be spread out over the week in increments of at least
          10 minutes. Additionally, muscle-strengthening activities should be
          performed on two or more days a week, targeting all major muscle
          groups (legs, hips, back, abdomen, chest, shoulders, and arms)​ (
          <a href="https://www.cdc.gov/physical-activity-basics/guidelines/adults.html">
            CDC
          </a>
          ) (
          <a href="https://www.cdc.gov/healthyschools/physicalactivity/guidelines.htm">
            CDC
          </a>
          ).
        </p>
        <h4>Benefits of regular exercise</h4>
        <ol>
          <li>
            <strong>Chronic Disease Prevention:</strong> Regular physical
            activity helps reduce the risk of developing chronic diseases such
            as heart disease, stroke, type 2 diabetes, and certain cancers ​(
            <a href="https://www.cdc.gov/physical-activity-basics/guidelines/adults.html">
              CDC
            </a>
            ).
          </li>
          <li>
            <strong>Mental Health Improvement:</strong> Exercise is known to
            reduce symptoms of depression and anxiety, improve mood, and enhance
            overall mental well-being ​(
            <a href="https://www.cdc.gov/physical-activity-basics/guidelines/adults.html">
              CDC
            </a>
            ).
          </li>
          <li>
            <strong>Weight Management:</strong> Weight Management: Engaging in
            regular physical activity helps maintain a healthy weight by burning
            calories and building muscle mass ​(
            <a href="https://www.cdc.gov/physical-activity-basics/guidelines/adults.html">
              CDC
            </a>
            ).
          </li>
          <li>
            <strong>Bone and Muscle Health:</strong> Activities like weight
            lifting and resistance training strengthen bones and muscles, which
            can help prevent osteoporosis and frailty as one ages ​(
            <a href="https://www.cdc.gov/physical-activity-basics/guidelines/adults.html">
              CDC
            </a>
            ).
          </li>
          <li>
            <strong>Enhanced Mobility and Flexibility:</strong> Regular exercise
            improves mobility, balance, and flexibility, which are important for
            maintaining independence, especially in older adults ​(
            <a href="https://www.cdc.gov/arthritis/basics/physical-activity/index.html">
              CDC
            </a>
            ).
          </li>
        </ol>
        <h4>Exercise for different age groups</h4>
        <p>
          The CDC also provides guidelines tailored for children, adolescents,
          and older adults:
        </p>
        <ul>
          <li>
            <strong>Children and Adolescents:</strong> They should engage in at
            least 60 minutes of physical activity daily. This should include
            aerobic activities, muscle-strengthening, and bone-strengthening
            exercises​ (
            <a href="https://www.cdc.gov/healthyschools/physicalactivity/guidelines.htm">
              CDC
            </a>
            ) (
            <a href="https://www.cdc.gov/healthyschools/physicalactivity/guidelines_backup.htm">
              CDC
            </a>
            ).
          </li>
          <li>
            <strong>Older Adults:</strong> Similar to adults, older individuals
            should aim for 150 minutes of moderate-intensity aerobic activity
            weekly, with an emphasis on activities that improve balance to
            prevent falls (
            <a href="https://www.cdc.gov/physical-activity-basics/guidelines/adults.html">
              CDC
            </a>
            ) (
            <a href="https://www.cdc.gov/arthritis/basics/physical-activity/index.html">
              CDC
            </a>
            )​.
          </li>
        </ul>
        <h4>Tips for Staying Active</h4>
        <ul>
          <li>
            <strong>Start Slow:</strong> Begin with activities you enjoy and
            gradually increase the intensity and duration.
          </li>
          <li>
            <strong>Mix It Up:</strong> Incorporate a variety of exercises to
            work different muscle groups and prevent boredom.
          </li>
          <li>
            <strong>Stay Consistent:</strong> Make physical activity a regular
            part of your routine, aiming for at least 30 minutes a day, five
            days a week (
            <a href="https://www.cdc.gov/physical-activity-basics/guidelines/adults.html">
              CDC
            </a>
            ).
          </li>
          <li>
            <strong>Break It Up:</strong> If you find it difficult to fit in
            longer sessions, break your activity into shorter periods throughout
            the day.
          </li>
        </ul>
        <p>
          For more detailed information and additional resources on how to stay
          active, visit the CDC's{" "}
          <a href="https://www.cdc.gov/physicalactivity/basics/adults/index.htm">
            Physical Activity Guidelines for Americans​
          </a>{" "}
          (
          <a href="https://www.cdc.gov/physical-activity-basics/guidelines/adults.html">
            CDC
          </a>
          ) .
        </p>
      </Container>
    );
  }
}
