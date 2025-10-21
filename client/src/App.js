import React from "react";
import "./App.css";

import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import OrgInfo from "./pages/OrgInfo/index";
import VolunteerInfo from "./pages/VolunteerInfo";
import OrgHome from "./pages/OrgHome";
import VolHome from "./pages/VolHome";
import CaptureFromIPWebcam from "./pages/CaptureFromIPWebcam";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Intro from "./pages/Intro";
import VerificationPage from "./pages/VerificationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/org-info" element={<OrgInfo />} />
        <Route path="/vol-info" element={<VolunteerInfo />} />
        <Route path="/org-home" element={<OrgHome />} />
        <Route path="/vol-home" element={<VolHome />} />
        <Route path="/capture" element={<CaptureFromIPWebcam />} />
        <Route path="/verification" element={<VerificationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
