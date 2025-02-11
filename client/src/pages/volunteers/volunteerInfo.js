import React, { useState } from "react";
import { useEffect } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { jsonToNameValueTuple } from "../../utils/format";
import { addValuesToDB } from "../../api/api";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const VolunteerInfo = () => {
  const { id } = useParams();

  const [provincesList, getProvincesList] = useState([]);
  const [districtsList, getDistrictsList] = useState([]);
  const [wardsList, getWardsList] = useState([]);
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
    console.log(id);

    // Them Dia Chi va Lay ID
    const addressData = {
      SoNha: formData.SoNha,
      TenDuong: formData.TenDuong,
      KhuVuc: formData.KhuVuc,
      MaPhuongXa: formData.MaPhuongXa,
    };
    const addressTuple = jsonToNameValueTuple(addressData);
    const addressBody = {
      table_name: "DIA_CHI",
      attributes: addressTuple.name,
      values: addressTuple.value,
    };

    const addressId = await addValuesToDB(
      addressBody.table_name,
      addressBody.attributes,
      addressBody.values
    );

    const userData = {
      HoTen: formData.HoTen,
      SDT: formData.SDT,
      NgaySinh: formData.NgaySinh,
      GioiTinh: formData.GioiTinh,
      MaTaiKhoan: id,
      MaDiaChi: addressId,
    };

    const userTuple = jsonToNameValueTuple(userData);
    const userBody = {
      table_name: "TINH_NGUYEN_VIEN",
      attributes: userTuple.name,
      values: userTuple.value,
    };

    const userId = await addValuesToDB(
      userBody.table_name,
      userBody.attributes,
      userBody.values
    );
    if (userId) alert(`Đăng ký tài khoản thành công: ${userId}`);
    else alert("Lỗi đăng ký tài khoản!");
  };

  const fetchProvincesList = async () => {
    fetch("http://localhost:5000/provinces")
      .then((response) => response.json())
      .then((data) => {
        getProvincesList(data.map((province) => province));
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchDistrictsList = async (province) => {
    fetch(`http://localhost:5000/districts/${province}`)
      .then((response) => response.json())
      .then((data) => {
        getDistrictsList(data.map((district) => district));
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchwardsList = async (district) => {
    fetch(`http://localhost:5000/wards/${district}`)
      .then((response) => response.json())
      .then((data) => {
        getWardsList(data.map((ward) => ward));
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchProvincesList();
  }, []);
  useEffect(() => {
    fetchDistrictsList(formData.city);
  }, [formData.city]);
  useEffect(() => {
    fetchwardsList(formData.district);
  }, [formData.district]);

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

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Thông tin cá nhân</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Họ và tên:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="HoTen"
                    value={formData.HoTen}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Giới tính:</label>
                  <select
                    className="form-select"
                    name="GioiTinh"
                    value={formData.GioiTinh}
                    onChange={handleChange}
                    required
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Ngày sinh:</label>
                  <input
                    type="date"
                    className="form-control"
                    name="NgaySinh"
                    value={formData.NgaySinh}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Số điện thoại:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="SDT"
                    value={formData.SDT}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Số nhà</label>
                  <input
                    type="text"
                    className="form-control"
                    name="SoNha"
                    value={formData.SoNha}
                    onChange={handleChange}
                  />
                  <label className="form-label">Tên Đường</label>
                  <input
                    type="text"
                    className="form-control"
                    name="TenDuong"
                    value={formData.TenDuong}
                    onChange={handleChange}
                  />
                  <label className="form-label">Khu vực</label>
                  <input
                    type="text"
                    className="form-control"
                    name="KhuVuc"
                    value={formData.KhuVuc}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tỉnh/Thành phố</label>
                  <select
                    className="form-select"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {provincesList.map((province) => (
                      <option key={province.MaSo} value={province.MaSo}>
                        {province.Ten}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Quận/Huyện</label>
                  <select
                    className="form-select"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn quận/huyện</option>
                    {districtsList.map((district) => (
                      <option key={district.MaSo} value={district.MaSo}>
                        {district.Ten}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Xã/Phường</label>
                  <select
                    className="form-select"
                    name="MaPhuongXa"
                    value={formData.MaPhuongXa}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn xã/phường</option>
                    {wardsList.map((ward) => (
                      <option key={ward.MaSo} value={ward.MaSo}>
                        {ward.Ten}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Lưu thông tin
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerInfo;
