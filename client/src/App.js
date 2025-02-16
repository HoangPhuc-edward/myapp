import React from "react";
import "./App.css";

import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import OrgInfo from "./pages/OrgInfo/index";
import VolunteerInfo from "./pages/VolunteerInfo";
import OrgHome from "./pages/OrgHome";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/org-info/:id" element={<OrgInfo />} />
        <Route path="/vol-info/:id" element={<VolunteerInfo />} />
        <Route path="/org-home/:id" element={<OrgHome />} />
      </Routes>
    </Router>
  );
}

export default App;
