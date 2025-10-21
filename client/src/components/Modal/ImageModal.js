import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faSpinner,
  faCheck,
  faTimes,
  faCloudDownloadAlt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import color from "../../assets/color";

function ImageModal({ isOpen, onClose, setFormData }) {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clientId, setClientId] = useState("");

  React.useEffect(() => {
    if (isOpen) {
      const randomId = Math.floor(Math.random() * 100).toString();
      setClientId(randomId);
      setImageData(null);
    }
  }, [isOpen]);

  const handleGetImage = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://wait-api.onrender.com/wait_for_image",
        {
          params: { client_id: clientId },
        }
      );
      console.log("Received response:", res.data);
      if (res.data.status === "received" && res.data.image_data) {
        setImageData(res.data.image_data);
      } else {
        alert("Không nhận được ảnh.");
      }
    } catch (err) {
      console.error("Lỗi khi lấy ảnh:", err);
      alert("Lỗi khi lấy ảnh.");
    }
    setLoading(false);
  };

  const handleSendImage = async () => {
    if (!imageData) {
      alert("Chưa có ảnh để gửi.");
      return;
    }

    try {
      const blob = await (
        await fetch(`data:image/jpeg;base64,${imageData}`)
      ).blob();
      const file = new File([blob], "image.jpg", { type: blob.type });

      const form = new FormData();
      form.append("file", file);
      form.append(
        "key",
        "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"
      );

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

      setFormData(convertedFormData);
      onClose();
    } catch (error) {
      console.error("Lỗi khi gửi ảnh:", error);
      alert("Lỗi khi gửi ảnh.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideIn {
            from { 
              opacity: 0;
              transform: translateY(-20px) scale(0.95);
            }
            to { 
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .image-modal-simple button:hover:not(:disabled) {
            opacity: 0.8;
          }
          
          .loading-spinner {
            animation: spin 1s linear infinite;
            color: ${color.primary};
          }
        `}
      </style>
      <div className="modal-backdrop" style={backdropStyle}>
        <div className="modal image-modal-simple" style={modalStyle}>
          <div style={contentStyle}>
            <h3 style={titleStyle}>Gửi ảnh từ điện thoại</h3>

            {/* Client ID Display */}
            <div style={clientIdContainerStyle}>
              <div style={clientIdBoxStyle}>
                <div style={clientIdLabelStyle}>Client ID</div>
                <div style={clientIdValueStyle}>{clientId}</div>
              </div>
              <div style={instructionTextStyle}>
                📱 Nhập client ID tương ứng trên thiết bị di động của bạn
              </div>
            </div>

            <div style={imageContainerStyle}>
              {loading ? (
                <div style={loadingStyle}>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="loading-spinner"
                    style={{ fontSize: "24px", marginBottom: "10px" }}
                  />
                  <span>Đang chờ ảnh...</span>
                </div>
              ) : imageData ? (
                <div style={{ textAlign: "center" }}>
                  <img
                    src={`data:image/jpeg;base64,${imageData}`}
                    alt="Received"
                    style={imgStyle}
                  />
                  <div style={imageInfoStyle}>
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: color.primary, marginRight: "8px" }}
                    />
                    <span>Ảnh đã tải thành công</span>
                  </div>
                </div>
              ) : (
                <div style={placeholderStyle}>
                  <FontAwesomeIcon
                    icon={faImage}
                    style={placeholderIconStyle}
                  />
                  <div style={placeholderTextStyle}>
                    Chưa có ảnh nào được chọn
                  </div>
                </div>
              )}
            </div>

            <div style={buttonContainerStyle}>
              <button
                onClick={handleGetImage}
                style={primaryButtonStyle}
                disabled={loading}
              >
                <FontAwesomeIcon
                  icon={loading ? faSpinner : faCloudDownloadAlt}
                  style={{ marginRight: "8px" }}
                  className={loading ? "loading-spinner" : ""}
                />
                {loading ? "Đang tải..." : "Lấy ảnh"}
              </button>
              <button
                onClick={handleSendImage}
                disabled={!imageData || loading}
                style={
                  imageData && !loading
                    ? successButtonStyle
                    : disabledButtonStyle
                }
              >
                <FontAwesomeIcon
                  icon={faUpload}
                  style={{ marginRight: "8px" }}
                />
                Xác nhận
              </button>
              <button onClick={onClose} style={secondaryButtonStyle}>
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{ marginRight: "8px" }}
                />
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function formatDate(dateStr) {
  console.log(dateStr);
  if (!dateStr) return "";
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T00:00`;
}

// Simple, clean styles
const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  animation: "fadeIn 0.3s ease-out",
  padding: "20px",
  boxSizing: "border-box",
  margin: 0,
  width: "100vw",
  height: "100vh",
};

const modalStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  maxWidth: "500px",
  width: "90%",
  maxHeight: "80vh",
  overflow: "hidden",
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
  animation: "slideIn 0.3s ease-out",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  margin: "0 auto",
  position: "relative",
};

const contentStyle = {
  padding: "25px",
};

const titleStyle = {
  margin: "0 0 20px 0",
  fontSize: "18px",
  fontWeight: "500",
  color: "#333",
  textAlign: "center",
};

const imageContainerStyle = {
  border: `2px dashed ${color.lightGray}`,
  borderRadius: "8px",
  padding: "30px 20px",
  margin: "15px 0",
  textAlign: "center",
  minHeight: "200px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fafafa",
};

const loadingStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  color: color.primary,
  fontSize: "14px",
};

const imgStyle = {
  width: "100%",
  maxHeight: "250px",
  objectFit: "contain",
  borderRadius: "6px",
};

const imageInfoStyle = {
  marginTop: "10px",
  color: color.primary,
  fontSize: "13px",
  fontWeight: "500",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const placeholderStyle = {
  color: "#666",
  fontSize: "14px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
};

const placeholderIconStyle = {
  fontSize: "40px",
  color: color.lightGray,
  opacity: 0.8,
};

const placeholderTextStyle = {
  fontSize: "15px",
  fontWeight: "500",
  color: "#666",
};

const buttonContainerStyle = {
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  flexWrap: "wrap",
  marginTop: "20px",
};

const buttonStyle = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
  transition: "all 0.2s ease",
  minWidth: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const primaryButtonStyle = {
  ...buttonStyle,
  backgroundColor: color.primary,
  color: "white",
};

const successButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#27ae60",
  color: "white",
};

const secondaryButtonStyle = {
  ...buttonStyle,
  backgroundColor: color.lightGray,
  color: "#666",
};

const disabledButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#e0e0e0",
  color: "#999",
  cursor: "not-allowed",
};

const clientIdContainerStyle = {
  backgroundColor: "#f8f9fa",
  border: `1px solid ${color.lightGray}`,
  borderRadius: "8px",
  padding: "15px",
  margin: "15px 0 20px 0",
  textAlign: "center",
};

const clientIdBoxStyle = {
  backgroundColor: "white",
  border: `2px solid ${color.primary}`,
  borderRadius: "6px",
  padding: "10px",
  marginBottom: "10px",
  display: "inline-block",
  minWidth: "120px",
};

const clientIdLabelStyle = {
  fontSize: "11px",
  color: color.primary,
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: "5px",
};

const clientIdValueStyle = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#2c3e50",
  fontFamily: "monospace",
  letterSpacing: "2px",
};

const instructionTextStyle = {
  fontSize: "13px",
  color: "#666",
  fontWeight: "500",
  lineHeight: "1.4",
};

export default ImageModal;
