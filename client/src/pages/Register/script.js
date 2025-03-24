import { isValidEmail, isShorterThan } from "../../utils/validationUtils";
import { registerUser } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth } from "firebase/auth";

export const useRegisterLogic = () => {
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

  return {
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
  };
};
