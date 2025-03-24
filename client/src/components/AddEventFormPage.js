import cityImg from "../assets/img/cityOrg.jpg";
import color from "../assets/color";
import font from "../assets/font";
import AddressForm from "./AddressForm";
import { useState } from "react";
import AddressApi from "../api/addressApi";
import EventApi from "../api/eventApi";
import { uploadImage } from "../firebase/storage";

const AddEventFormPage = ({ org }) => {
  const [formData, setFormData] = useState({
    TenSuKien: "",
    MieuTa: "",

    NgayBatDau: "",
    NgayKetThuc: "",
    SoLuongToiDa: 0,

    SoNha: "",
    TenDuong: "",
    KhuVuc: "",
    MaPhuongXa: "",
    MaDiaDiem: "",
    MaToChuc: "",

    district: "",
    city: "",
    HinhAnh:
      "https://firebasestorage.googleapis.com/v0/b/open-heart-31eb3.firebasestorage.app/o/images%2FSat-Lo.jpg?alt=media&token=d5fcf871-cb26-42f9-a507-3ea6d8988a84",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addressId = await AddressApi.addAddress(formData);
    const url = await uploadImage(img);

    console.log(url);
    formData.MaDiaDiem = addressId;
    formData.MaToChuc = org.MaSo;

    formData.HinhAnh = url;

    const responeId = await EventApi.addEvent(formData);
    if (responeId) {
      alert(`Thêm sự kiện thành công!`);
      window.location.reload();
    } else {
      alert("Lỗi thêm sự kiện!");
      return;
    }
  };

  const [img, setImg] = useState("");

  const handleImageChange = (event) => {
    setImg(event.target.files[0]);
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="p-4">
              <div
                style={{
                  backgroundImage: `url(${cityImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center bottom",
                  position: "relative",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(255, 149, 204, 0.6)",
                    zIndex: 1,
                  }}
                ></div>
                <div style={{ position: "relative", zIndex: 2 }}>
                  <h2
                    className="text-center"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontFamily: font.monsterrat,
                    }}
                  >
                    THÊM SỰ KIỆN
                  </h2>
                  <h6 className="text-center" style={{ color: "white" }}>
                    Vui lòng nhập vào thông tin để thêm sự kiện
                  </h6>
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label
                        className="form-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Tên sự kiện
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="TenSuKien"
                        value={formData.TenSuKien}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        className="form-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Số lượng tối đa
                      </label>
                      <input
                        type="int"
                        className="form-control"
                        name="SoLuongToiDa"
                        value={formData.SoLuongToiDa}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      className="form-label"
                      style={{ fontWeight: "bold" }}
                    >
                      Miêu tả sự kiện
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="MieuTa"
                      value={formData.MieuTa}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          style={{ fontWeight: "bold" }}
                        >
                          Ngày Bắt Đầu
                        </label>
                        <input
                          type="datetime-local"
                          className="form-control"
                          name="NgayBatDau"
                          value={formData.NgayBatDau}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label
                        className="form-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Ngày Kết Thúc
                      </label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="NgayKetThuc"
                        value={formData.NgayKetThuc}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Hình ảnh sự kiện
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>

                  <AddressForm
                    formData={formData}
                    handleChange={handleChange}
                  />

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    style={{
                      backgroundColor: color.primary,
                      color: "#fff",
                      borderRadius: "1rem",
                      padding: "0.8rem",
                      border: "none",
                      marginBottom: "6rem",
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
    </div>
  );
};

export default AddEventFormPage;
