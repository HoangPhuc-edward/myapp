import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const VolunteerForm = ({
  provincesList,
  districtsList,
  wardsList,
  formData,
  handleChange,
  handleSubmit,
}) => {
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

export default VolunteerForm;
