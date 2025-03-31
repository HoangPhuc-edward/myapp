import { use, useEffect, useState } from "react";
import AddressForm from "../AddressForm";
import color from "../../assets/color";
import EventApi from "../../api/eventApi";
import { uploadImage } from "../../firebase/storage";
import AddressApi from "../../api/addressApi";
import { getUser } from "../../firebase/auth";
import OrgApi from "../../api/orgApi";
import LocationApi from "../../api/locationApi";
import { formatDate } from "../../utils/format";

const EventForm = ({ event }) => {
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
    HinhAnh: "",
  });

  const [img, setImg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (event) {
        const address = await AddressApi.getAddressById(event.MaDiaDiem);

        const location = await LocationApi.getLocationIdsByWardId(
          address.MaPhuongXa
        );

        event.MaPhuongXa = address.MaPhuongXa;
        event.district = location.districtId;
        event.city = location.provinceId;

        setFormData({
          TenSuKien: event.TenSuKien,
          MieuTa: event.MieuTa,
          NgayBatDau: formatDate(event.NgayBatDau),
          NgayKetThuc: formatDate(event.NgayKetThuc),
          SoLuongToiDa: event.SoLuongToiDa,
          SoNha: address.SoNha,
          TenDuong: address.TenDuong,
          KhuVuc: address.KhuVuc,
          MaPhuongXa: address.MaPhuongXa,
          MaDiaDiem: event.MaDiaDiem,
          MaToChuc: event.MaToChuc,
          district: location.districtId,
          city: location.provinceId,
          HinhAnh: event.HinhAnh,
        });
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.TenSuKien.trim()) {
      alert("Vui lòng nhập Tên Sự Kiện");
      document.getElementsByName("TenSuKien")[0].focus();
      return;
    }

    if (!formData.MieuTa.trim()) {
      alert("Vui lòng nhập Miêu Tả Sự Kiện");
      document.getElementsByName("MieuTa")[0].focus();
      return;
    }

    if (!formData.NgayBatDau) {
      alert("Vui lòng chọn Ngày Bắt Đầu");
      document.getElementsByName("NgayBatDau")[0].focus();
      return;
    }

    if (!formData.NgayKetThuc) {
      alert("Vui lòng chọn Ngày Kết Thúc");
      document.getElementsByName("NgayKetThuc")[0].focus();
      return;
    }

    if (new Date(formData.NgayBatDau) >= new Date(formData.NgayKetThuc)) {
      alert("Ngày Bắt Đầu phải trước Ngày Kết Thúc");
      document.getElementsByName("NgayBatDau")[0].focus();
      return;
    }

    if (!formData.SoLuongToiDa || formData.SoLuongToiDa <= 0) {
      alert("Số Lượng Tối Đa phải lớn hơn 0");
      document.getElementsByName("SoLuongToiDa")[0].focus();
      return;
    }

    if (!event) {
      try {
        const addressId = await AddressApi.addAddress(formData);
        const url = await uploadImage(img);

        formData.MaDiaDiem = addressId;

        formData.HinhAnh = url;

        const user = await getUser();

        const myOrgId = await OrgApi.getOrgIdByEmail(user.email);
        formData.MaToChuc = myOrgId;
        console.log(formData);
        const responseId = await EventApi.addEvent(formData);
        if (responseId) {
          alert("Thêm sự kiện thành công!");
          window.location.reload();
        } else {
          alert("Lỗi thêm sự kiện!");
        }
      } catch (error) {
        alert("Có lỗi xảy ra! Vui lòng thử lại.");
      }
    } else {
      try {
        if (!img) {
          formData.HinhAnh = event.HinhAnh;
        } else {
          const url = await uploadImage(img);
          formData.HinhAnh = url;
        }

        if (
          formData.SoNha !== event.SoNha ||
          formData.TenDuong !== event.TenDuong ||
          formData.KhuVuc !== event.KhuVuc ||
          formData.MaPhuongXa !== event.MaPhuongXa ||
          formData.district !== event.district ||
          formData.city !== event.city
        ) {
          const addressId = await AddressApi.addAddress(formData);
          formData.MaDiaDiem = addressId;
        }

        formData.TrangThai = 1;
        formData.MaSuKien = event.MaSuKien;

        console.log(formData);
        const response = await EventApi.updateEvent(formData);

        if (response) {
          alert("Sửa thông tin sự kiện thành công!");
          window.location.reload();
        } else {
          alert("Lỗi sửa thông tin sự kiện!");
        }
      } catch (error) {
        alert("Có lỗi xảy ra! Vui lòng thử lại.");
      }
    }
  };

  const handleImageChange = (event) => {
    setImg(event.target.files[0]);
  };
  return (
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label" style={{ fontWeight: "bold" }}>
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
            <label className="form-label" style={{ fontWeight: "bold" }}>
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
          <label className="form-label" style={{ fontWeight: "bold" }}>
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
              <label className="form-label" style={{ fontWeight: "bold" }}>
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
            <label className="form-label" style={{ fontWeight: "bold" }}>
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
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Hình ảnh sự kiện
            </label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>
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
            marginBottom: "6rem",
          }}
        >
          {event ? "Sửa thông tin" : "Thêm sự kiện"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
