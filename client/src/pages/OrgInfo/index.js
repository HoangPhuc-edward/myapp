import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useOrgInfoLogic } from "./script";
import OrgForm from "../../components/OrgForm";

const OrgInfo = () => {
  const {
    // provincesList,
    // districtsList,
    // wardsList,
    formData,
    handleChange,
    handleSubmit,
  } = useOrgInfoLogic();

  return (
    <OrgForm
      // provincesList={provincesList}
      // districtsList={districtsList}
      // wardsList={wardsList}
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default OrgInfo;
