import { useState } from "react";
import { handleLogin } from "../../firebase/auth";

import { useNavigate } from "react-router-dom";
import AccountApi from "../../api/accountApi";

export const useLoginLogic = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(email, password);
    const roleid = await AccountApi.getRoleByEmail(email);
    if (roleid === 2) {
      navigate(`/org-home/1`);
    } else navigate(`/vol-home`);
  };

  return { email, setEmail, password, setPassword, handleSubmit };
};
