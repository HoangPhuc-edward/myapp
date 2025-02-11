import React from "react";
import "./App.css";

import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import OrgInfo from "./pages/OrgInfo/index";
import VolunteerInfo from "./pages/VolunteerInfo";

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

        {/* <Route path="/register" element={<Register />} />
        <Route path="/user-info/:id" element={<UserInfo />} />
        <Route path="/org-info/:id" element={<OrgInfo />} />
        <Route path="/login" element={<LogInPage />} />

        <Route path="/org-home" element={<OrgHome />} />
        <Route path="/vol-home" element={<VolHome />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
