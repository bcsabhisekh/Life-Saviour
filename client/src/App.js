import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Query from "./pages/Query.js";
import Home from "./pages/Home.js";
import UserLogin from "./pages/UserLogin.js";
import UserSignUp from "./pages/UserSignUp.js";
import AdminLogin from "./pages/AdminLogin.js";
import AdminSignUp from "./pages/AdminSignUp.js";
import DriverLogin from "./pages/DriverLogin.js";
import DriverSignUp from "./pages/DriverSignUp.js";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/usersignup" element={<UserSignUp />} />
          <Route path="/driversignup" element={<DriverSignUp />} />
          <Route path="/driverlogin" element={<DriverLogin />} />
          <Route path="/adminsignup" element={<AdminSignUp />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/query" element={<Query />} />
        </Routes>
      </Router>
    </div>
  );
}
