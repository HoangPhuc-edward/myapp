import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import OrgForm from "../../components/Form/OrgForm";
import cityOrgImg from "../../assets/img/cityOrg.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AddressApi from "../../api/addressApi";
import OrgApi from "../../api/orgApi";
import { uploadImage } from "../../firebase/storage";
import { isShorterThan } from "../../utils/validationUtils";

const OrgInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.user_email;
  const [img, setImg] = useState(null);

  const [formData, setFormData] = useState({
    Ten: "",
    SDT: "",
    MieuTa: "",

    SoNha: "",
    TenDuong: "",
    KhuVuc: "",
    MaPhuongXa: "",

    district: "",
    city: "",
    email: email,
    HinhAnh: "",
  });

  const addOrgToDatabase = async (formData) => {
    if (!formData.SoNha || !formData.TenDuong || !formData.KhuVuc) {
      alert("Địa chỉ không được để trống!");
      return;
    }
    const orgData = {
      Ten: formData.Ten,
      MieuTa: formData.MieuTa,
      SDT: formData.SDT,
      Email: email,
      HinhAnh: formData.HinhAnh,
      SoNha: formData.SoNha,
      TenDuong: formData.TenDuong,
      KhuVuc: formData.KhuVuc,
      MaPhuongXa: formData.MaPhuongXa,
    };

    const userId = await OrgApi.addOrg(orgData);

    if (userId) {
      alert(`Đăng ký tài khoản thành công`);
      navigate(`/org-home`);
    } else alert("Lỗi đăng ký tài khoản!");
  };

  const handleImageChange = (event) => {
    setImg(event.target.files[0]);
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

    if (!formData.Ten) {
      alert("Tên không được để trống!");
      return;
    }

    if (!formData.SDT) {
      alert("Số điện thoại không được để trống!");
      return;
    }

    if (!formData.MieuTa) {
      alert("Mô tả không được để trống!");
      return;
    }

    if (isShorterThan(formData.SDT, 6)) {
      alert("Số điện thoại không hợp lệ!");
      return;
    }

    const url = await uploadImage(img);
    formData.HinhAnh = url;
    addOrgToDatabase(formData);
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
        <OrgForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleImageChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default OrgInfo;
