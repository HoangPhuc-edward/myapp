import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddressForm from "../Form/AddressForm";
import font from "../../assets/font";
import color from "../../assets/color";
const VolunteerForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleImageChange,
}) => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div
            style={{
              backgroundColor: "transparent",
              color: "white",
              border: "none",
            }}
          >
            <h1
              className="text-center text-uppercase"
              style={{ fontFamily: font.monsterrat, fontWeight: "bold" }}
            >
              Thông tin cá nhân
            </h1>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: "bold" }}>
                    Họ và tên:
                  </label>
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
                  <label className="form-label" style={{ fontWeight: "bold" }}>
                    Giới tính:
                  </label>
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
                  <label className="form-label" style={{ fontWeight: "bold" }}>
                    Ngày sinh:
                  </label>
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
                  <label className="form-label" style={{ fontWeight: "bold" }}>
                    Số điện thoại:
                  </label>
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
                  <label className="form-label" style={{ fontWeight: "bold" }}>
                    Hình ảnh
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                  />
                </div>
                <AddressForm formData={formData} handleChange={handleChange} />
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  style={{
                    backgroundColor: color.primary,
                    color: "#fff",
                    borderRadius: "1rem",
                    padding: "0.8rem",
                    border: "none",
                  }}
                >
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
