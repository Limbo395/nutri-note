import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { Container, Card } from "react-bootstrap";
import axios from "axios";
import avocado from "../Pictures/avocado-love.png";

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Home = () => {
  const [caloriesData, setCaloriesData] = useState([]);
  const [userData, setUserData] = useState({ height: 0, weight: 0 });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, please log in again.");
          return;
        }

        const userResponse = await axios.get(
          "http://localhost:3000/api/get-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const caloriesResponse = await axios.get(
          "http://localhost:3000/api/get-calories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(userResponse.data);
        setCaloriesData(caloriesResponse.data.calories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  const calculateBMI = (height, weight) => {
    if (height === 0 || weight === 0) return 0;
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  return (
    <>
      <Header />
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div style={{ justifyContent: "center" }}>
          <h1 style={{ textAlign: "center" }}>Home page</h1>
          <div style={{ textAlign: "center" }}>
            <img
              src={avocado}
              alt="Avocado"
              style={{ width: "300px", height: "auto" }}
            />
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <div style={{ textAlign: "center", marginRight: "50px" }}>
              <h2>Body Mass Index</h2>
              <p>
                Height: {userData.height} cm <br />
                Weight: {userData.weight} kg <br />
                BMI: {calculateBMI(userData.height, userData.weight)}
              </p>
            </div>
            <div style={{ textAlign: "center", fontSize: "15px" }}>
              <h2>Calories Data </h2>
              {caloriesData.slice(0, 5).map((calories, index) => (
                <Card key={index} style={{ margin: "10px", paddingTop:"3px", paddingBottom: "3px", paddingRight: "1px", paddingLeft:"1px" }}>
                  <Card.Body style={{padding: "5px"}}>
                    <Card.Title style={{fontSize: "17px", marginBottom: "1px"}}>{formatDate(calories.Date)}</Card.Title>
                    <Card.Text>Calories: {calories.TotalCalories} kcal</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
