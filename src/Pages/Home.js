import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { Container, Card } from "react-bootstrap";
import axios from "axios";
import avocado from "../Pictures/avocado-love.png";

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

        const userResponse = await axios.get("http://localhost:3000/api/get-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const caloriesResponse = await axios.get("http://localhost:3000/api/get-calories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
      <Container>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "20px" }}>
          <div>
            <img src={avocado} alt="Avocado" style={{ width: "200px", height: "200px" }} />
          </div>
          <div>
            <h2>Calories Data</h2>
            {caloriesData.map((calories, index) => (
              <Card key={index} style={{ margin: "10px", padding: "10px" }}>
                <Card.Body>
                  <Card.Title>{calories.date}</Card.Title>
                  <Card.Text>Calories: {calories.amount}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
          <div>
            <h2>Body Mass Index (BMI)</h2>
            <p>
              Height: {userData.height} cm <br />
              Weight: {userData.weight} kg <br />
              BMI: {calculateBMI(userData.height, userData.weight)}
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
