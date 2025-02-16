import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddressForm from "./AddressForm";

const OrgForm = ({
  // provincesList,
  // districtsList,
  // wardsList,
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
              <h2 className="text-center">Thông tin tổ chức</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Tên tổ chức</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Ten"
                    value={formData.Ten}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Miêu tả tổ chức</label>
                  <input
                    type="text"
                    className="form-control"
                    name="MieuTa"
                    value={formData.MieuTa}
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
                <AddressForm
                  formData={formData}
                  handleChange={handleChange}
                  // provincesList={provincesList}
                  // districtsList={districtsList}
                  // wardsList={wardsList}
                />
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

export default OrgForm;
