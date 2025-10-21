import cityImg from "../../assets/img/cityOrg.jpg";
import font from "../../assets/font";
import color from "../../assets/color";
import EventForm from "../Form/EventForm";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ImageModal from "../Modal/ImageModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faUpload,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const AddEventFormPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setLoadingMessage("Đang phân tích hình ảnh...");

    const form = new FormData();
    form.append("file", file);
    form.append(
      "key",
      "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"
    );

    try {
      const response = await axios.post(
        "https://ocr-api-wnc8.onrender.com/extract_event_info",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;

      const convertedFormData = {
        TenSuKien: data["Tên sự kiện"] || data["Miêu tả sự kiện"] || "",
        MieuTa: data["Miêu tả sự kiện"] || "",
        NgayBatDau: formatDate(data["Ngày bắt đầu"]),
        NgayKetThuc: formatDate(data["Ngày kết thúc"]),
        SoLuongToiDa: parseInt(data["Số lượng"]) || 0,
        SoNha: data["Số nhà"] || "",
        TenDuong: data["Tên đường"] || "",
        KhuVuc: data["Khu vực"] || "",
        MaPhuongXa: data["MaPhuongXa"]?.toString() || "",
        MaDiaDiem: "0",
        MaToChuc: "",
        district: data["MaQuanHuyen"]?.toString() || "",
        city: data["MaTinhThanh"]?.toString() || "",
        HinhAnh: "", // có thể lưu đường dẫn hoặc base64 nếu cần
      };

      setLoadingMessage("Đang điền thông tin...");
      setTimeout(() => {
        setFormData(convertedFormData);
        setIsLoading(false);
        setLoadingMessage("");
      }, 800);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setIsLoading(false);
      setLoadingMessage("");
      alert("Có lỗi xảy ra khi phân tích hình ảnh. Vui lòng thử lại!");
    }
  };

  const formatDate = (dateStr) => {
    // Chuyển "25/08/2025" thành "2025-08-25T00:00"
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T00:00`;
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      {/* Custom CSS for input styling */}
      <style jsx>{`
        .form-control,
        .form-select {
          border: 1px solid #6c757d !important;
          border-radius: 8px !important;
          transition: all 0.3s ease !important;
        }

        .form-control:focus,
        .form-select:focus {
          border-color: ${color.primary} !important;
          box-shadow: 0 0 0 0.2rem ${color.primary}25 !important;
          outline: none !important;
        }

        .form-control:hover,
        .form-select:hover {
          border-color: #495057 !important;
        }

        .form-label {
          font-weight: 600 !important;
          color: #495057 !important;
          margin-bottom: 8px !important;
        }
      `}</style>

      <div className="container">
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          setFormData={setFormData}
        />
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
                />
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
              <div className="mb-4 d-flex gap-3">
                <button
                  onClick={triggerFileInput}
                  disabled={isLoading}
                  className="btn fw-bold text-white border-0 shadow-sm"
                  style={{
                    backgroundColor: color.primary,
                    borderRadius: "12px",
                    padding: "12px 24px",
                    fontSize: "14px",
                    transition: "all 0.3s ease",
                    transform: "scale(1)",
                    minWidth: "180px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.target.style.transform = "scale(1.05)";
                      e.target.style.boxShadow = `0 6px 20px ${color.primary}40`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  <FontAwesomeIcon icon={faUpload} className="me-2" />
                  {isLoading ? "Đang xử lý..." : "CHỌN ẢNH TỪ MÁY"}
                </button>

                <button
                  onClick={() => setModalOpen(true)}
                  disabled={isLoading}
                  className="btn fw-bold text-white border-0 shadow-sm"
                  style={{
                    backgroundColor: color.secondary || "#6c757d",
                    borderRadius: "12px",
                    padding: "12px 24px",
                    fontSize: "14px",
                    transition: "all 0.3s ease",
                    transform: "scale(1)",
                    minWidth: "180px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.target.style.transform = "scale(1.05)";
                      e.target.style.boxShadow = `0 6px 20px ${
                        color.secondary || "#6c757d"
                      }40`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  <FontAwesomeIcon icon={faImage} className="me-2" />
                  TẢI HÌNH TỪ ĐIỆN THOẠI
                </button>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>

              {/* Loading Spinner */}
              {isLoading && (
                <div
                  className="d-flex justify-content-center align-items-center mb-4 p-4"
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderRadius: "12px",
                    border: `2px solid ${color.primary}20`,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    className="me-3"
                    style={{
                      fontSize: "24px",
                      color: color.primary,
                    }}
                  />
                  <div>
                    <h6
                      className="mb-1 fw-bold"
                      style={{ color: color.primary }}
                    >
                      {loadingMessage}
                    </h6>
                    <small className="text-muted">
                      Vui lòng đợi trong giây lát...
                    </small>
                  </div>
                </div>
              )}
              <div style={{ position: "relative" }}>
                <EventForm
                  event={formData}
                  isLoading={isLoading}
                  style={{
                    filter: isLoading ? "blur(2px)" : "none",
                    pointerEvents: isLoading ? "none" : "auto",
                    transition: "all 0.3s ease",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEventFormPage;
