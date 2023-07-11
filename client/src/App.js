import React, { useEffect, useState } from "react";
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
import axios from "axios";
export const UserContext = React.createContext();

export default function App() {

  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/checkauth').then((res) => { if (res.data.valid) { setUser(res.data.data); } }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div>
      <UserContext.Provider value={[user, setUser]}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/userlogin" element={Object.keys(user).length > 0 ? <Home /> : <UserLogin />} />
            <Route path="/usersignup" element={Object.keys(user).length > 0 ? <Home /> : <UserSignUp />} />
            <Route path="/query" element={Object.keys(user).length > 0 ? <Query /> : <UserLogin />} />
            <Route path="/dashboard" element={Object.keys(user).length > 0 ? <Dashboard /> : <UserLogin />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div >
  );
}
