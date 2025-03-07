import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";

import LoginScreen from "./screens/LoginScreen.jsx";
import DashboardScreen from "./screens/DashboardScreen";
import UsersScreen from "./screens/UsersScreen";
import RequestsScreen from "./screens/RequestsScreen";
import RequestDetailScreen from "./screens/RequestDetailScreen";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/users" element={<UsersScreen />} />
        <Route path="/requests" element={<RequestsScreen />} />
        <Route path="/requests/:id" element={<RequestDetailScreen />} />
      </Routes>
      
    </Router>
  );
}

export default App;
