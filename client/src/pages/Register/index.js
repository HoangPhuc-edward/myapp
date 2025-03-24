import React from "react";
import { RegisterForm } from "../../components/RegisterForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRegisterLogic } from "./script";
import registerImg from "../../assets/img/register.png";
import color from "../../assets/color";
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
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
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
        </div>
        <div
          className="col-12 col-md-6 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: color.lightPrimary, overflow: "hidden" }}
        >
          <img
            src={registerImg}
            alt="register"
            className="img-fluid"
            style={{ objectFit: "cover", transform: "scale(1.8)" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
