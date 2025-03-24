import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useVolunteerInfoLogic } from "./script";
import VolunteerForm from "../../components/VolunteerForm";
import cityOrgImg from "../../assets/img/cityOrg.jpg";

const VolunteerInfo = () => {
  const { formData, handleChange, handleSubmit, handleImageChange } =
    useVolunteerInfoLogic();

  return (
    <div
      style={{
        backgroundImage: `url(${cityOrgImg})`,
        backgroundSize: "cover",
        position: "relative",
        padding: "20px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(245, 39, 145, 0.6)",
          zIndex: 1,
        }}
      ></div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <VolunteerForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleImageChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default VolunteerInfo;
