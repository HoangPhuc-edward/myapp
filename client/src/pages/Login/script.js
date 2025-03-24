import { useState } from "react";
import { handleLogin } from "../../firebase/auth";

import { useNavigate } from "react-router-dom";
import VolunteerApi from "../../api/volunteerApi";
import OrgApi from "../../api/orgApi";

export const useLoginLogic = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState(1);
  const navigate = useNavigate();

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setAccountType(value);
  };

  const navigateToHome = async () => {
    if (accountType === 1) {
      const id = await VolunteerApi.getVolIdByEmail(email);
      if (!id) {
        alert("Không tìm thấy tình nguyện viên đã cho");
        return;
      }

      navigate(`/vol-home`);
    } else {
      const id = await OrgApi.getOrgIdByEmail(email);
      console.log(id);
      console.log(email);
      if (!id) {
        alert("Không tìm thấy tổ chức");
        return;
      }
      navigate(`/org-home`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(email, password, navigateToHome);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    accountType,
    handleTypeChange,
    handleSubmit,
  };
};
