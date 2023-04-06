import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Query from "./pages/Query.js";
import Home from "./pages/Home.js";
import UserLogin from "./pages/UserLogin.js";
import UserSignUp from "./pages/UserSignUp.js";
import AdminLogin from "./pages/AdminLogin.js";
import AdminSignUp from "./pages/AdminSignUp.js";
import DriverLogin from "./pages/DriverLogin.js";
import DriverSignUp from "./pages/DriverSignUp.js";
import Dashboard from "./pages/Dashboard.js";
export const UserContext = React.createContext();

export default function App() {

  const [user, setUser] = useState({});

  return (
    <div>
      <UserContext.Provider value={[user, setUser]}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/userlogin" element={<UserLogin />} />
            <Route path="/usersignup" element={<UserSignUp />} />
            <Route path="/query" element={Object.keys(user).length > 0 ? <Query /> : <UserLogin />} />
            <Route path="/dashboard" element={Object.keys(user).length > 0 ? <Dashboard /> : <UserLogin />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div >
  );
}
