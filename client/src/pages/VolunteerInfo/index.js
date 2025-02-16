import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useVolunteerInfoLogic } from "./script";
import VolunteerForm from "../../components/VolunteerForm";

const VolunteerInfo = () => {
  const {
    provincesList,
    districtsList,
    wardsList,
    formData,
    handleChange,
    handleSubmit,
  } = useVolunteerInfoLogic();

  return (
    <VolunteerForm
      provincesList={provincesList}
      districtsList={districtsList}
      wardsList={wardsList}
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default VolunteerInfo;
