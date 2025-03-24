import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import AddressApi from "../../api/addressApi";
import OrgApi from "../../api/orgApi";
import { uploadImage } from "../../firebase/storage";

export const useOrgInfoLogic = () => {
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
    const addressData = {
      SoNha: formData.SoNha,
      TenDuong: formData.TenDuong,
      KhuVuc: formData.KhuVuc,
      MaPhuongXa: formData.MaPhuongXa,
      GhiChu: "Khong co ghi chu",
    };

    const addressId = await AddressApi.addAddress(addressData);

    const orgData = {
      Ten: formData.Ten,
      MieuTa: formData.MieuTa,
      SDT: formData.SDT,
      MaDiaChi: addressId,
      Email: email,
      HinhAnh: formData.HinhAnh,
    };

    const userId = await OrgApi.addOrg(orgData);

    if (userId) {
      alert(`Đăng ký tài khoản thành công: ${userId}`);
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
    const url = await uploadImage(img);
    formData.HinhAnh = url;
    addOrgToDatabase(formData);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    handleImageChange,
  };
};
