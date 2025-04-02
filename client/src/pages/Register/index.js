import React from "react";
import { RegisterForm } from "../../components/Form/RegisterForm";
import "bootstrap/dist/css/bootstrap.min.css";
import registerImg from "../../assets/img/register.png";
import color from "../../assets/color";
import { isValidEmail, isShorterThan } from "../../utils/validationUtils";
import { registerUser } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [accountType, setAccountType] = useState(1);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Email không hợp lệ");
      return;
    }

    if (isShorterThan(password, 6)) {
      alert("Mật khẩu phải chứa ít nhất 6 ký tự");
      return;
    }

    if (password !== reEnterPassword) {
      alert("Mật khẩu không khớp");
      return;
    }

    try {
      await registerUser(auth, email, password);
    } catch (error) {
      let message = "Lỗi đăng ký tài khoản";
      if (error.code === "auth/email-already-in-use") {
        message = "Email đã được sử dụng";
      }

      alert(message);
      return;
    }

    if (accountType === 1)
      navigate(`/vol-info`, { state: { user_email: email } });
    else navigate(`/org-info`, { state: { user_email: email } });
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setAccountType(value);
  };

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
