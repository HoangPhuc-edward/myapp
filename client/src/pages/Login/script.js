import { useState } from "react";
import { handleLogin } from "../../firebase/auth";
import { getRoleByEmail } from "../../api/accountApi";
import { useNavigate } from "react-router-dom";

export const useLoginLogic = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(email, password);
    const roleid = await getRoleByEmail(email);
    if (roleid === 2) {
      navigate(`/org-home`);
    } else navigate(`/vol-home`);
  };

  return { email, setEmail, password, setPassword, handleSubmit };
};
