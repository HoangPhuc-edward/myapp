import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AddressApi from "../../api/addressApi";
import VolunteerApi from "../../api/volunteerApi";
import useFetch from "../../hooks/useFetch";
import { uploadImage } from "../../firebase/storage";

export const useVolunteerInfoLogic = () => {
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
    const addressData = {
      SoNha: formData.SoNha,
      TenDuong: formData.TenDuong,
      KhuVuc: formData.KhuVuc,
      MaPhuongXa: formData.MaPhuongXa,
      GhiChu: "Khong co ghi chu",
    };

    const addressId = await AddressApi.addAddress(addressData);

    const userData = {
      HoTen: formData.HoTen,
      NgaySinh: formData.NgaySinh,
      SDT: formData.SDT,
      GioiTinh: formData.GioiTinh,
      MaDiaChi: addressId,
      Email: formData.email,
      HinhAnh: formData.HinhAnh,
    };

    const userId = await VolunteerApi.addVolunteer(userData);

    if (userId) {
      alert(`Đăng ký tài khoản thành công: ${userId}`);
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
    console.log(formData);
    const url = await uploadImage(img);
    formData.HinhAnh = url;
    addUserToDatabase(formData);
  };

  const handleImageChange = (event) => {
    setImg(event.target.files[0]);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    handleImageChange,
  };
};
