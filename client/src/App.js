import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import Login from "./components/Login";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import AdminDashboard from "./components/AdminDashboard";
import ManagerDashboard from "./components/ManagerDashboard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setUser({ token, role });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <Router>
      <div>
        {user && <button onClick={handleLogout} style={{ float: "right", margin: "10px" }}>Logout</button>}
        <Routes>
          <Route path="/" element={user ? <Navigate to={`/${user.role}`} /> : <Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboards */}
          <Route path="/user" element={user?.role === "user" ? <UserProfile /> : <Navigate to="/" />} />
          <Route path="/admin" element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />} />
          <Route path="/manager" element={user?.role === "manager" ? <ManagerDashboard /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
