import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Account from "./Pages/Account";
import Calendar from "./Pages/Calendar";
import Notes from "./Pages/Notes";
import Friends from "./Pages/Friends";
import Tips from "./Pages/Tips";
import AuthPage from "./Pages/AuthPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/tips" element={<Tips />} />
      </Routes>
    </Router>
  );
}

export default App;