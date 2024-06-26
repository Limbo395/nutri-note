import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Account from "./Pages/Account";
import Notes from "./Pages/Notes";
import Friends from "./Pages/Friends";
import Tips from "./Pages/Tips";
import AuthPage from "./Pages/AuthPage";
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/tips" element={<Tips />} />
      </Routes>
    </Router>
  );
}

export default App;