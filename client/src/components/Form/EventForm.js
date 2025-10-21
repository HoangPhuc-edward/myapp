import { useEffect, useState } from "react";
import AddressForm from "../Form/AddressForm";
import color from "../../assets/color";
import EventApi from "../../api/eventApi";
import { uploadImage } from "../../firebase/storage";
import AddressApi from "../../api/addressApi";
import { getUser } from "../../firebase/auth";
import OrgApi from "../../api/orgApi";
import LocationApi from "../../api/locationApi";
import { formatDate } from "../../utils/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";

const EventForm = ({ event, isLoading: parentLoading }) => {
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
    Quy: 0,
  });

  const [img, setImg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (event) {
        if (event.MaDiaDiem === "0") {
          setFormData({
            TenSuKien: event.TenSuKien,
            MieuTa: event.MieuTa,
            NgayBatDau: event.NgayBatDau,
            NgayKetThuc: event.NgayKetThuc,
            SoLuongToiDa: event.SoLuongToiDa,
            SoNha: event.SoNha,
            TenDuong: event.TenDuong,
            KhuVuc: event.KhuVuc,
            MaPhuongXa: event.MaPhuongXa,
            MaDiaDiem: event.MaDiaDiem,
            MaToChuc: event.MaToChuc,
            district: event.district,
            city: event.city,
            HinhAnh: event.HinhAnh,
          });
        } else {
          // const address = await AddressApi.getAddressById(event.MaDiaDiem);

          const location = await LocationApi.getLocationIdsByWardId(
            event.MaPhuongXa
          );

          event.district = location.districtId;
          event.city = location.provinceId;

          setFormData({
            TenSuKien: event.TenSuKien,
            MieuTa: event.MieuTa,
            NgayBatDau: formatDate(event.NgayBatDau),
            NgayKetThuc: formatDate(event.NgayKetThuc),
            SoLuongToiDa: event.SoLuongToiDa,
            SoNha: event.SoNha,
            TenDuong: event.TenDuong,
            KhuVuc: event.KhuVuc,
            MaPhuongXa: event.MaPhuongXa,
            MaDiaDiem: event.MaDiaDiem,
            MaToChuc: event.MaToChuc,
            district: event.district,
            Quy: event.Quy || 0,
            city: event.city,
            HinhAnh: event.HinhAnh,
          });
        }
      }
    };
    fetchData();
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.TenSuKien.trim()) {
      alert("Vui lòng nhập Tên Sự Kiện");
      document.getElementsByName("TenSuKien")[0].focus();
      setIsSubmitting(false);
      return;
    }

    if (!formData.MieuTa.trim()) {
      alert("Vui lòng nhập Miêu Tả Sự Kiện");
      document.getElementsByName("MieuTa")[0].focus();
      setIsSubmitting(false);
      return;
    }

    if (!formData.NgayBatDau) {
      alert("Vui lòng chọn Ngày bắt đầu");
      document.getElementsByName("NgayBatDau")[0].focus();
      setIsSubmitting(false);
      return;
    }

    if (!formData.NgayKetThuc) {
      alert("Vui lòng chọn Ngày kết thúc");
      document.getElementsByName("NgayKetThuc")[0].focus();
      setIsSubmitting(false);
      return;
    }

    if (new Date(formData.NgayBatDau) >= new Date(formData.NgayKetThuc)) {
      alert("Ngày Bắt Đầu phải trước Ngày Kết Thúc");
      document.getElementsByName("NgayBatDau")[0].focus();
      setIsSubmitting(false);
      return;
    }

    if (!formData.SoLuongToiDa || formData.SoLuongToiDa <= 0) {
      alert("Số Lượng Tối Đa phải lớn hơn 0");
      document.getElementsByName("SoLuongToiDa")[0].focus();
      setIsSubmitting(false);
      return;
    }

    if (!event || event.MaDiaDiem === "0") {
      try {
        const addressId = await AddressApi.addAddress(formData);
        const url = await uploadImage(img);

        formData.MaDiaDiem = addressId;

        formData.HinhAnh = url || "event.jpg";

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
        alert("Có lỗi xảy ra khi thêm! Vui lòng thử lại.", error);
      }
    } else {
      try {
        if (!img) {
          formData.HinhAnh = event.HinhAnh;
        } else {
          const url = await uploadImage(img);
          formData.HinhAnh = url;
        }

        formData.TrangThai = 1;
        formData.MaSuKien = event.MaSuKien;
        const response = await EventApi.updateEvent(formData);

        if (response) {
          alert("Sửa thông tin sự kiện thành công!");
          window.location.reload();
        } else {
          alert("Lỗi sửa thông tin sự kiện!");
        }
      } catch (error) {
        alert("Có lỗi xảy ra khi sửa! Vui lòng thử lại.");
      }
    }
    setIsSubmitting(false);
  };

  const isLoading = parentLoading || isSubmitting;

  const handleImageChange = (event) => {
    setImg(event.target.files[0]);
  };

  return (
    <div className="card-body" style={{ position: "relative" }}>
      {/* Loading Overlay */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            borderRadius: "8px",
          }}
        >
          <div className="text-center">
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              style={{
                fontSize: "48px",
                color: color.primary,
                marginBottom: "16px",
              }}
            />
            <h5 style={{ color: color.primary, fontWeight: "bold" }}>
              {parentLoading ? "Đang điền thông tin..." : "Đang xử lý..."}
            </h5>
            <p className="text-muted">Vui lòng đợi trong giây lát</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          filter: isLoading ? "blur(2px)" : "none",
          pointerEvents: isLoading ? "none" : "auto",
          transition: "all 0.3s ease",
        }}
      >
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
          <textarea
            className="form-control"
            name="MieuTa"
            value={formData.MieuTa}
            onChange={handleChange}
            required
            rows={4}
            style={{ resize: "vertical" }}
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: "bold" }}>
                Ngày bắt đầu
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
              Ngày kết thúc
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
        </div>
        <div className="mb-3">
          <label className="form-label" style={{ fontWeight: "bold" }}>
            Qũy sự kiện (nếu có)
          </label>
          <input
            type="number"
            className="form-control"
            name="Quy"
            value={formData.Quy}
            onChange={handleChange}
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

        <AddressForm formData={formData} handleChange={handleChange} />

        <button
          type="submit"
          disabled={isLoading}
          className="btn w-100"
          style={{
            backgroundColor: isLoading ? "#6c757d" : color.primary,
            color: "#fff",
            borderRadius: "12px",
            padding: "12px",
            border: "none",
            marginBottom: "6rem",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
              {parentLoading ? "Đang điền thông tin..." : "Đang xử lý..."}
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={event ? faEdit : faPlus}
                className="me-2"
              />
              XÁC NHẬN
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
