import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import AddressApi from "../../api/addressApi";
import VolunteerApi from "../../api/volunteerApi";
import useFetch from "../../hooks/useFetch";

export const useVolunteerInfoLogic = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      MaTaiKhoan: id,
    };

    const userId = await VolunteerApi.addVolunteer(userData);

    if (userId) {
      alert(`Đăng ký tài khoản thành công: ${userId}`);
      navigate(`/vol-home`);
    } else alert("Lỗi đăng ký tài khoản!");
  };

  const { data: provincesList } = useFetch(
    "http://localhost:5000/provinces",
    []
  );

  const { data: districtsList } = useFetch(
    `http://localhost:5000/districts/province/${formData.city}`,
    [formData.city]
  );

  const { data: wardsList } = useFetch(
    `http://localhost:5000/wards/district/${formData.district}`,
    [formData.district]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    addUserToDatabase(formData);
  };

  return {
    provincesList,
    districtsList,
    wardsList,
    formData,
    handleChange,
    handleSubmit,
  };
};
