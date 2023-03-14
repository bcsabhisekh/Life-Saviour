import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Drag from "./pages/Drag.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/drag" element={<Drag />} />
        </Routes>
      </Router>
    </div>
  );
}
