import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import VolunteerForm from "../../components/Form/VolunteerForm";
import cityOrgImg from "../../assets/img/cityOrg.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AddressApi from "../../api/addressApi";
import VolunteerApi from "../../api/volunteerApi";
import { uploadImage } from "../../firebase/storage";
import { isShorterThan } from "../../utils/validationUtils";

const VolunteerInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.user_email;
  const [img, setImg] = useState(null);

  const [formData, setFormData] = useState({
    HoTen: "",
    SDT: "",
    NgaySinh: "",
    GioiTinh: "Nam",
    SoNha: "",
    TenDuong: "",
    KhuVuc: "",
    MaPhuongXa: "",
    district: "",
    city: "",
    email: email,
  });

  const addUserToDatabase = async (formData) => {
    const userData = {
      HoTen: formData.HoTen,
      NgaySinh: formData.NgaySinh,
      SDT: formData.SDT,
      GioiTinh: formData.GioiTinh,
      MaDiaChi: 1,
      Email: formData.email,
      HinhAnh: formData.HinhAnh,
      SoNha: formData.SoNha,
      TenDuong: formData.TenDuong,
      KhuVuc: formData.KhuVuc,
      MaPhuongXa: formData.MaPhuongXa,
    };

    const userId = await VolunteerApi.addVolunteer(userData);

    if (userId) {
      alert(`Đăng ký tài khoản thành công`);
      navigate(`/vol-home`);
    } else alert("Lỗi đăng ký tài khoản!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.HoTen) {
      alert("Họ tên không được để trống!");
      return;
    }

    if (!formData.SDT) {
      alert("Số điện thoại không được để trống!");
      return;
    }

    if (!formData.NgaySinh) {
      alert("Ngày sinh không được để trống!");
      return;
    }

    if (isShorterThan(formData.SDT, 6)) {
      alert("Số điện thoại phải chứa ít nhất 6 ký tự!");
      return;
    }

    const url = await uploadImage(img);
    formData.HinhAnh = url;
    addUserToDatabase(formData);
  };

  const handleImageChange = (event) => {
    setImg(event.target.files[0]);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${cityOrgImg})`,
        backgroundSize: "cover",
        position: "relative",
        padding: "20px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(245, 39, 145, 0.6)",
          zIndex: 1,
        }}
      ></div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <VolunteerForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleImageChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default VolunteerInfo;
