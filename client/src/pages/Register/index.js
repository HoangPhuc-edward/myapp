import React from "react";
import { RegisterForm } from "../../components/RegisterForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRegisterLogic } from "./script";

const Register = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    reEnterPassword,
    setReEnterPassword,
    accountType,
    setAccountType,
    handleSubmit,
    handleTypeChange,
  } = useRegisterLogic();

  return (
    <RegisterForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      reEnterPassword={reEnterPassword}
      setReEnterPassword={setReEnterPassword}
      accountType={accountType}
      setAccountType={setAccountType}
      handleSubmit={handleSubmit}
      handleTypeChange={handleTypeChange}
    />
  );
};

export default Register;
