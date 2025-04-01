import React from "react";

import { useState } from "react";
import { handleLogin } from "../../firebase/auth";

import { useNavigate } from "react-router-dom";
import VolunteerApi from "../../api/volunteerApi";
import OrgApi from "../../api/orgApi";
import { LoginForm } from "../../components/Form/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";
import color from "../../assets/color";
import vol1img from "../../assets/img/vol1.jpg";
import vol2img from "../../assets/img/vol2.jpg";
import waveHandImg from "../../assets/img/waveHand.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faGift,
  faHandshake,
  faHeartCircleBolt,
  faSearch,
  faSearchDollar,
} from "@fortawesome/free-solid-svg-icons";

import font from "../../assets/font";

const TextListElement = ({ text, icon }) => {
  return (
    <div className="my-2 d-flex flex-row align-items-center">
      <div
        style={{
          width: "3rem",
          aspectRatio: "1",
          borderRadius: "50%",
          backgroundColor: color.primary,
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <FontAwesomeIcon icon={icon} color="white" />
      </div>

      <span
        style={{
          fontFamily: font.roboto,
          fontSize: "1rem",
          fontWeight: "500",
          marginLeft: "1rem",
        }}
      >
        {text}
      </span>
    </div>
  );
};

const MainContent = ({ slogan, img, benefits }) => {
  return (
    <div className="row">
      <div
        className="col-md-6 d-flex flex-column justify-content-center"
        style={{ padding: "4rem" }}
      >
        <img
          src={waveHandImg}
          alt=""
          style={{ width: "4rem" }}
          className="my-4"
        />
        <h3
          style={{
            color: "black",
            fontWeight: "bold",
            fontFamily: font.monsterrat,
            marginBottom: "1rem",
          }}
        >
          {slogan}
        </h3>
        {benefits.map((benefit, index) => (
          <TextListElement
            key={index}
            text={benefit.text}
            icon={benefit.icon}
          />
        ))}
      </div>
      <div className="col-md-6 d-flex justify-content-center align-items-center">
        <img
          style={{
            width: "80%",
            height: "90%",
            objectFit: "cover",
            border: `1rem solid ${color.lightGray}`,
            borderRadius: "1rem",
          }}
          src={img}
          alt=""
        />
      </div>
    </div>
  );
};

const Login = () => {
  const volBenefits = [
    {
      icon: faCheckCircle,
      text: "Kết nối với cộng đồng",
    },
    {
      icon: faGift,
      text: "Tìm kiếm công việc tình nguyện",
    },
    {
      icon: faHandshake,
      text: "Tham gia những chiến dịch tình nguyện",
    },
    {
      icon: faSearch,
      text: "Tìm kiếm các tổ chức từ thiện",
    },
    {
      icon: faSearchDollar,
      text: "Đóng góp cho cộng đồng",
    },
  ];

  const orgBenefits = [
    {
      icon: faCheckCircle,
      text: "Kết nối với cộng đồng",
    },
    {
      icon: faGift,
      text: "Tìm kiếm tình nguyện viên",
    },
    {
      icon: faHandshake,
      text: "Tạo chiến dịch tình nguyện",
    },
    {
      icon: faHeartCircleBolt,
      text: "Nhận sự hỗ trợ từ cộng đồng",
    },
    {
      icon: faSearchDollar,
      text: "Đóng góp cho cộng đồng",
    },
  ];

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

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            accountType={accountType}
            handleTypeChange={handleTypeChange}
            handleSubmit={handleSubmit}
          />
        </div>
        <div
          className="col-12 col-md-8 d-flex align-items-center"
          style={{ backgroundColor: color.lightPrimary }}
        >
          {(accountType === "1" || accountType === 1) && (
            <MainContent
              slogan={
                "Chúng tôi là cầu nối để bạn sẻ chia và lan tỏa lòng nhân ái."
              }
              img={vol1img}
              benefits={volBenefits}
            />
          )}

          {accountType === "2" && (
            <MainContent
              slogan={
                "Chúng tôi là cầu nối để bạn sẻ chia và lan tỏa lòng nhân ái."
              }
              img={vol2img}
              benefits={orgBenefits}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
