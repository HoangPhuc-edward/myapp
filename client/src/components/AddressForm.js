import React from "react";
import useFetch from "../hooks/useFetch";

const AddressForm = ({ formData, handleChange }) => {
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
  return (
    <>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label" style={{ fontWeight: "bold" }}>
            Số nhà
          </label>
          <input
            type="text"
            className="form-control"
            name="SoNha"
            value={formData.SoNha}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label" style={{ fontWeight: "bold" }}>
            Tên đường
          </label>
          <input
            type="text"
            className="form-control"
            name="TenDuong"
            value={formData.TenDuong}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label" style={{ fontWeight: "bold" }}>
            Khu vực
          </label>
          <input
            type="text"
            className="form-control"
            name="KhuVuc"
            value={formData.KhuVuc}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label" style={{ fontWeight: "bold" }}>
          Tỉnh/Thành phố
        </label>
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
        <label className="form-label" style={{ fontWeight: "bold" }}>
          Quận/Huyện
        </label>
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
        <label className="form-label" style={{ fontWeight: "bold" }}>
          Xã/Phường
        </label>
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
    </>
  );
};

export default AddressForm;
