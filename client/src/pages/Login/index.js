import React from "react";
import { useLoginLogic } from "./script";
import { LoginForm } from "../../components/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const { email, setEmail, password, setPassword, handleSubmit } =
    useLoginLogic();

  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
