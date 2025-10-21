import React, { useEffect, useState } from "react";
import { getImageURL, uploadImage } from "../../firebase/storage";
import color from "../../assets/color";
import { text } from "@fortawesome/fontawesome-svg-core";
import font from "../../assets/font";
// Add CSS animation for spinner
const spinnerStyle = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject the CSS into the document head
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = spinnerStyle;
  document.head.appendChild(styleSheet);
}

const PaymentModal = ({ isOpen, onClose, onSubmit, base_payment = null }) => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    MaPC: base_payment ? base_payment.MaPC : null,
    MaSK: base_payment ? base_payment.MaSK : null,
    SoTien: base_payment ? base_payment.SoTien : null,
    NoiDung: base_payment ? base_payment.NoiDung : null,
    NgayChi: base_payment ? base_payment.NgayChi.split("T")[0] : null,
    MinhChung: base_payment ? base_payment.MinhChung : null,
  });

  useEffect(() => {
    if (base_payment && base_payment.MaSK !== null) {
      setData({
        MaPC: base_payment.MaPC,
        MaSK: base_payment.MaSK,
        SoTien: base_payment.SoTien,
        NoiDung: base_payment.NoiDung,
        NgayChi: base_payment.NgayChi.split("T")[0],
        MinhChung: base_payment.MinhChung,
      });
      if (base_payment.MinhChung) {
        setImageURL(base_payment.MinhChung);
      }
    } else {
      setData({
        MaPC: null,
        MaSK: null,
        SoTien: "",
        NoiDung: "",
        NgayChi: "",
        MinhChung: null,
      });
    }
  }, [base_payment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setImageURL(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!data.MaSK || !data.SoTien || !data.NoiDung || !data.NgayChi) {
      alert("Vui lòng điền đầy đủ thông tin");
      setIsLoading(false);
      return;
    }

    if (!imageURL && !data.MinhChung) {
      alert("Vui lòng chọn ảnh minh chứng");
      setIsLoading(false);
      return;
    }

    let url = data.MinhChung;

    if (imageURL !== data.MinhChung || !data.MinhChung) {
      url = await uploadImage(image);
      if (!url) {
        alert("Failed to upload image");
        setIsLoading(false);
        return;
      }
    }

    const formData = {
      MaPC: data.MaPC,
      MaSK: data.MaSK,
      SoTien: parseFloat(data.SoTien),
      NoiDung: data.NoiDung,
      NgayChi: data.NgayChi,
      MinhChung: url,
    };

    onSubmit(formData);
    setIsLoading(false);
  };

  return !isOpen ? null : (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Thông tin thanh toán</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Nội dung</label>
            <input
              type="text"
              value={data.NoiDung}
              name="NoiDung"
              onChange={handleChange}
              style={styles.input}
              placeholder="Nhập nội dung thanh toán"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Số tiền (VNĐ)</label>
            <input
              type="number"
              value={data.SoTien}
              name="SoTien"
              onChange={handleChange}
              style={styles.input}
              placeholder="Nhập số tiền"
              min="0"
              step="1000"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Ngày chi</label>
            <input
              type="date"
              value={data.NgayChi}
              name="NgayChi"
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Ảnh minh chứng</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.fileInput}
            />

            {imageURL && (
              <div style={styles.imageContainer}>
                <img
                  style={styles.previewImage}
                  src={imageURL}
                  alt="Ảnh minh chứng"
                />
              </div>
            )}
          </div>
          <div style={styles.actions}>
            <button
              type="submit"
              style={{
                ...styles.submitButton,
                ...(isLoading ? styles.submitButtonLoading : {}),
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span style={styles.spinner}></span>
                  Đang xử lý...
                </>
              ) : (
                "Xác nhận"
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                setImage(null);
                setImageURL(null);
              }}
              style={styles.cancelButton}
              disabled={isLoading}
            >
              Hủy bỏ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    backdropFilter: "blur(2px)",
  },
  modal: {
    background: "#fff",
    padding: "32px",
    borderRadius: "12px",
    minWidth: "400px",
    maxWidth: "500px",
    width: "90%",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    margin: "0 0 24px 0",
    fontSize: "24px",
    fontWeight: "600",
    color: color.primary,
    fontFamily: font.monsterrat,
    textAlign: "center",
    borderBottom: `2px solid ${color.primary}`,
    textTransform: "uppercase",
    paddingBottom: "12px",
  },
  field: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#34495e",
  },
  input: {
    padding: "12px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    transition: "border-color 0.3s ease",
    outline: "none",
  },
  fileInput: {
    padding: "8px",
    border: "2px dashed #bdc3c7",
    borderRadius: "8px",
    backgroundColor: "#f8f9fa",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
  },
  imageContainer: {
    marginTop: "12px",
    display: "flex",
    justifyContent: "center",
    padding: "8px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
  },
  previewImage: {
    maxWidth: "200px",
    maxHeight: "200px",
    width: "auto",
    height: "auto",
    borderRadius: "6px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    objectFit: "contain",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "24px",
    paddingTop: "20px",
    borderTop: "1px solid #e0e0e0",
  },
  submitButton: {
    padding: "12px 24px",
    backgroundColor: color.primary,
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  submitButtonLoading: {
    backgroundColor: color.lightPrimary,
    cursor: "not-allowed",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid #ffffff",
    borderTop: "2px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  cancelButton: {
    padding: "12px 24px",
    backgroundColor: "#95a5a6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default PaymentModal;
