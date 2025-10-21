import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/EventModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faLocation,
  faNewspaper,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import "react-circular-progressbar/dist/styles.css";
import color from "../../assets/color";
import DonationApi from "../../api/donationApi";

const DonationModal = ({ isShowing, hide, MaSK, MaTNV }) => {
  const [soTien, setSoTien] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isShowing) {
      setSoTien("");
      setIsSubmitting(false);
    }
  }, [isShowing]);

  // Get current date without time
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!soTien || parseInt(soTien, 10) <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ!");
      return;
    }

    setIsSubmitting(true);
    try {
      const donationData = {
        MaTNV: MaTNV,
        MaSuKien: MaSK,
        SoTien: parseInt(soTien, 10),
        NgayQuyenGop: getCurrentDate(),
      };

      await DonationApi.addDonation(donationData);
      alert("Quyên góp thành công!");
      hide(); // Close modal after success
    } catch (error) {
      console.error("Lỗi khi quyên góp:", error);
      alert("Có lỗi xảy ra khi quyên góp. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" onClick={() => hide()} />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div
              className="w-100 d-flex flex-row align-items-center justify-content-between p-4"
              style={{
                padding: "2rem 2rem 0rem",
                backgroundColor: color.lightPrimary,
              }}
            >
              <h4 className="mb-0" style={{ fontWeight: "bold" }}>
                Quyên góp cho sự kiện
              </h4>
              <div
                onClick={() => hide()}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "4px",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "rgba(0,0,0,0.1)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                <FontAwesomeIcon icon={faX} />
              </div>
            </div>
            <div className="p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <h6
                    className="mb-2"
                    style={{ color: color.primary, fontWeight: "600" }}
                  >
                    Thông tin quyên góp
                  </h6>
                  <div className="mb-3">
                    <small className="text-muted">Mã sự kiện: {MaSK}</small>
                  </div>
                  <div className="mb-3">
                    <small className="text-muted">
                      Mã tình nguyện viên: {MaTNV}
                    </small>
                  </div>
                  <div className="mb-3">
                    <small className="text-muted">
                      Ngày quyên góp: {getCurrentDate()}
                    </small>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="soTien"
                    className="form-label"
                    style={{ color: color.primary, fontWeight: "600" }}
                  >
                    Số tiền quyên góp (VNĐ){" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    id="soTien"
                    className="form-control"
                    placeholder="Nhập số tiền (VD: 100000)"
                    value={soTien}
                    onChange={(e) => setSoTien(e.target.value)}
                    min="1000"
                    step="1000"
                    required
                    disabled={isSubmitting}
                    style={{
                      fontSize: "16px",
                      padding: "12px",
                      border: `2px solid ${color.lightGray}`,
                      borderRadius: "8px",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = color.primary)
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = color.lightGray)
                    }
                  />
                  <small className="text-muted">
                    Số tiền tối thiểu: 1,000 VNĐ
                  </small>
                </div>

                <div className="d-flex gap-3 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => hide()}
                    disabled={isSubmitting}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "8px",
                      fontWeight: "500",
                    }}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="btn"
                    disabled={
                      isSubmitting || !soTien || parseFloat(soTien) < 1000
                    }
                    style={{
                      backgroundColor: color.primary,
                      color: "white",
                      border: "none",
                      padding: "10px 30px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      opacity:
                        isSubmitting || !soTien || parseFloat(soTien) < 1000
                          ? 0.6
                          : 1,
                      cursor:
                        isSubmitting || !soTien || parseFloat(soTien) < 1000
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Đang xử lý...
                      </>
                    ) : (
                      "Quyên góp"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default DonationModal;
