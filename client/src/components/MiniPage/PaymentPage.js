import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faEdit,
  faTrash,
  faPlus,
  faCoins,
  faWallet,
  faExclamationTriangle,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";
import font from "../../assets/font";
import color from "../../assets/color";
import EventApi from "../../api/eventApi";
import PaymentApi from "../../api/paymentApi";
import PaymentModal from "../Modal/PaymentModal";

// Component để animate số tiền
const AnimatedCurrency = ({ value, duration = 100 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [prevValue, setPrevValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value === prevValue) return;

    setIsAnimating(true);
    const startValue = prevValue;
    const endValue = value;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 20);
      const currentValue = startValue + (endValue - startValue) * easeOut;

      setDisplayValue(Math.round(currentValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
        setPrevValue(endValue);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [value, prevValue, duration]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <span
      style={{
        display: "inline-block",
        transition: "all 0.3s ease",
        transform: isAnimating ? "scale(1.1)" : "scale(1)",
        textShadow: isAnimating ? "0 0 20px rgba(255,255,255,0.8)" : "none",
        filter: isAnimating ? "brightness(1.2)" : "brightness(1)",
      }}
    >
      {formatCurrency(displayValue)}
    </span>
  );
};
const sampleEventList = [
  {
    MaSuKien: 2,
    MaToChuc: 2,
    TenSuKien: "Chung tay vì Trái Đất",
    MieuTa:
      "Chiến dịch trồng cây xanh, dọn dẹp rác thải và nâng cao nhận thức về bảo vệ môi trường trong cộng đồng.",
    NgayBatDau: "2025-09-02T00:00:00.000Z",
    NgayKetThuc: "2025-10-02T00:00:00.000Z",
    SoLuongToiDa: 30,
    MaDiaDiem: 110,
    NgayDang: "2025-07-23T12:35:25.000Z",
    HinhAnh:
      "https://firebasestorage.googleapis.com/v0/b/open-heart-31eb3.firebasestorage.app/o/images%2Fmai-son.jpg?alt=media&token=d25fbf0d-c4dc-43c8-a10e-cb2177dfa5e2",
    TrangThai: 1,
    Quy: 10000000,
  },
  {
    MaSuKien: 3,
    MaToChuc: 2,
    TenSuKien: "Đông ấm cho em",
    MieuTa:
      "Gửi tặng áo ấm, chăn bông và nhu yếu phẩm đến trẻ em và người cao tuổi ở các vùng cao lạnh giá.",
    NgayBatDau: "2025-02-07T00:00:00.000Z",
    NgayKetThuc: "2025-05-07T00:00:00.000Z",
    SoLuongToiDa: 40,
    MaDiaDiem: 27,
    NgayDang: "2025-02-12T00:00:00.000Z",
    HinhAnh:
      "https://firebasestorage.googleapis.com/v0/b/open-heart-31eb3.firebasestorage.app/o/images%2FSat-Lo.jpg?alt=media&token=d5fcf871-cb26-42f9-a507-3ea6d8988a84",
    TrangThai: 1,
    Quy: 5000000,
  },
  {
    MaSuKien: 4,
    MaToChuc: 2,
    TenSuKien: "Giọt máu yêu thương",
    MieuTa:
      "Ngày hội hiến máu nhân đạo nhằm cứu giúp những bệnh nhân đang cần máu để điều trị bệnh.",
    NgayBatDau: "2025-02-20T12:15:00.000Z",
    NgayKetThuc: "2025-06-07T12:15:00.000Z",
    SoLuongToiDa: 20,
    MaDiaDiem: 29,
    NgayDang: "2025-02-12T05:15:27.000Z",
    HinhAnh:
      "https://firebasestorage.googleapis.com/v0/b/open-heart-31eb3.firebasestorage.app/o/images%2Fmai-son.jpg?alt=media&token=d25fbf0d-c4dc-43c8-a10e-cb2177dfa5e2",
    TrangThai: 1,
    Quy: 3000000,
  },
];

const samplePaymentList = [
  {
    MaPC: 1,
    MaSK: 2,
    SoTien: 2000000,
    NoiDung: "Tiền mua cây giống",
    NgayChi: "2025-07-24T00:00:00.000Z",
    MinhChung: "event.jpg",
  },
  {
    MaPC: 2,
    MaSK: 2,
    SoTien: 1500000,
    NoiDung: "Tiền thuê xe tải",
    NgayChi: "2025-07-23T00:00:00.000Z",
    MinhChung: "truck.jpg",
  },
  {
    MaPC: 3,
    MaSK: 2,
    SoTien: 500000,
    NoiDung: "Tiền mua dụng cụ làm vườn",
    NgayChi: "2025-07-22T00:00:00.000Z",
    MinhChung: "tools.jpg",
  },
];

const PaymentPage = ({ org }) => {
  const [event, setEvent] = useState(sampleEventList[0]);
  const [eventList, setEventList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);
  const [moneyLeft, setMoneyLeft] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isMoneyUpdating, setIsMoneyUpdating] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [basePayment, setBasePayment] = useState(null);

  const [modalFunction, setModalFunction] = useState(() => () => {});

  // Sample data
  useEffect(() => {
    const fetchEventList = async () => {
      const events = await EventApi.getEventByOrgId(org.MaSo);
      setEventList(events);
      setEvent(events[0]);
    };

    fetchEventList();
  }, []);

  const fetchPaymentList = async () => {
    const payments = await PaymentApi.getPaymentsByMaSuKien(event.MaSuKien);
    console.log("Payments fetched:", payments);
    setPaymentList(payments);
  };

  useEffect(() => {
    if (!event) return;

    fetchPaymentList();
  }, [event]);

  useEffect(() => {
    const fetchTotalMoney = async () => {
      setIsMoneyUpdating(true);
      const total = await EventApi.getTongTienByEventId(event.MaSuKien);
      setTimeout(() => {
        setTotalMoney(total);
        setIsMoneyUpdating(false);
      }, 100);
    };

    const fetchMoneyLeft = async () => {
      setIsMoneyUpdating(true);
      const moneyLeft = await EventApi.getMoneyLeftByEventId(event.MaSuKien);
      setTimeout(() => {
        setMoneyLeft(moneyLeft);
        setIsMoneyUpdating(false);
      }, 100);
    };

    if (event) {
      fetchTotalMoney();
      fetchMoneyLeft();
    }
  }, [event, paymentList]);

  const handleEventChange = (e) => {
    const selectedEventId = parseInt(e.target.value);
    const selectedEvent = eventList.find(
      (evt) => evt.MaSuKien === selectedEventId
    );
    setEvent(selectedEvent);
  };

  const handleAddPayment = async ({
    MaSK,
    SoTien,
    NoiDung,
    NgayChi,
    MinhChung,
  }) => {
    const res = await PaymentApi.addPayment({
      MaSK: MaSK,
      SoTien: SoTien,
      NoiDung: NoiDung,
      NgayChi: NgayChi,
      MinhChung: MinhChung,
    });

    if (res.status === 201) {
      alert("Thêm phiếu chi thành công");
      setShowPaymentModal(false);
      fetchPaymentList();
    } else if (res.status === 401) {
      alert("Số tiền không hợp lệ");
    } else {
      alert("Thêm phiếu chi thất bại");
    }
  };

  const handleEditPayment = async ({
    MaPC,
    MaSK,
    SoTien,
    NoiDung,
    NgayChi,
    MinhChung,
  }) => {
    const res = await PaymentApi.updatePayment({
      MaPC: MaPC,
      MaSK: MaSK,
      SoTien: SoTien,
      NoiDung: NoiDung,
      NgayChi: NgayChi,
      MinhChung: MinhChung,
    });

    console.log("Edit payment response:", res);
    if (res.status === 200) {
      alert("Cập nhật phiếu chi thành công");
      setShowPaymentModal(false);
      fetchPaymentList();
    } else if (res.status === 401) {
      alert("Số tiền không hợp lệ");
    } else {
      alert("Thêm phiếu chi thất bại");
    }
  };

  const handleDeletePayment = (paymentId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phiếu chi này?")) {
      PaymentApi.deletePayment(paymentId)
        .then((res) => {
          if (res) {
            alert("Xóa phiếu chi thành công");
            fetchPaymentList();
          } else {
            alert("Xóa phiếu chi thất bại");
          }
        })
        .catch((error) => {
          console.error("Error deleting payment:", error);
          alert("Đã xảy ra lỗi khi xóa phiếu chi");
        });
    }
  };

  const handleImageClick = (imageName) => {
    setSelectedImage(imageName);
    setShowImageModal(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setBasePayment(null);
        }}
        onSubmit={modalFunction}
        base_payment={basePayment}
      />

      {/* TIÊU ĐỀ */}
      <div className="row mb-4">
        <h1
          className="title my-3"
          style={{ fontWeight: "bold", fontFamily: font.monsterrat }}
        >
          QUẢN LÝ THU CHI SỰ KIỆN
        </h1>
      </div>

      {/* THANH CHỌN SỰ KIỆN VÀ QUỸ */}
      <div className="row mb-4">
        <div className="col-lg-4">
          <div
            className="card shadow-lg border-0 h-100"
            style={{ borderRadius: "15px" }}
          >
            <div
              className="card-header text-white text-center py-2"
              style={{
                borderRadius: "15px 15px 0 0",
                backgroundColor: color.primary,
              }}
            >
              <h6 className="mb-0 fw-bold text-uppercase">
                <FontAwesomeIcon icon={faEdit} className="me-2" />
                CHỌN SỰ KIỆN
              </h6>
            </div>
            <div className="card-body p-3">
              <select
                className="form-select shadow-sm"
                value={event ? event.MaSuKien : ""}
                onChange={handleEventChange}
                style={{
                  borderRadius: "10px",
                  border: "2px solid #e9ecef",
                  fontSize: "14px",
                }}
              >
                <option value="">-- CHỌN SỰ KIỆN --</option>
                {eventList.map((evt) => (
                  <option key={evt.MaSuKien} value={evt.MaSuKien}>
                    {evt.TenSuKien.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div
            className="card h-100 shadow-lg border-0"
            style={{
              borderRadius: "15px",
              background: `linear-gradient(135deg, ${color.primary} 0%, ${color.darkPrimary} 100%)`,
              transition: "all 0.3s ease",
              transform: isMoneyUpdating ? "scale(1.02)" : "scale(1)",
              boxShadow: isMoneyUpdating
                ? "0 8px 25px rgba(0,123,255,0.3), 0 0 0 1px rgba(0,123,255,0.1)"
                : "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <div className="card-body text-center text-white p-3">
              <div className="mb-2">
                <FontAwesomeIcon icon={faCoins} className="fa-2x opacity-75" />
              </div>
              <h6 className="fw-bold text-uppercase mb-1">QUỸ BAN ĐẦU</h6>
              <h3 className="fw-bold mb-0">
                <AnimatedCurrency value={totalMoney} />
              </h3>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div
            className="card h-100 shadow-lg border-0"
            style={{
              borderRadius: "15px",
              background:
                moneyLeft > 0
                  ? "linear-gradient(135deg, #377D22  0%, #2C631B 100%)"
                  : "linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)",
              transition: "all 0.3s ease",
              transform: isMoneyUpdating ? "scale(1.02)" : "scale(1)",
              boxShadow: isMoneyUpdating
                ? moneyLeft > 0
                  ? "0 8px 25px rgba(55,125,34,0.4), 0 0 0 1px rgba(55,125,34,0.2)"
                  : "0 8px 25px rgba(252,74,26,0.4), 0 0 0 1px rgba(252,74,26,0.2)"
                : "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <div className="card-body text-center text-white p-3">
              <div className="mb-2">
                <FontAwesomeIcon
                  icon={moneyLeft > 0 ? faWallet : faExclamationTriangle}
                  className="fa-2x opacity-75"
                />
              </div>
              <h6 className="fw-bold text-uppercase mb-1">QUỸ HIỆN TẠI</h6>
              <h3 className="fw-bold mb-0">
                <AnimatedCurrency value={moneyLeft} duration={1200} />
              </h3>
            </div>
          </div>
        </div>
      </div>

      {event && (
        <>
          {/* BẢNG DỮ LIỆU THU CHI */}
          <div className="row">
            <div className="col-12">
              <div
                className="card shadow-lg border-0"
                style={{ borderRadius: "15px" }}
              >
                <div
                  className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-2"
                  style={{ borderRadius: "15px 15px 0 0" }}
                >
                  <h5 className="mb-0 fw-bold text-uppercase">
                    <FontAwesomeIcon icon={faEdit} className="me-2" />
                    DANH SÁCH THU CHI
                  </h5>
                  <button
                    className="btn btn-success btn-lg fw-bold text-uppercase shadow-sm"
                    onClick={() => {
                      setShowPaymentModal(true);
                      setModalFunction(() => handleAddPayment);
                      setBasePayment({
                        MaSK: event.MaSuKien,
                        SoTien: 0,
                        NoiDung: "",
                        NgayChi: new Date().toISOString().slice(0, 10),
                        MinhChung: "",
                      });
                    }}
                    style={{
                      borderRadius: "12px",
                      padding: "8px 20px",
                      border: "none",
                      background: "linear-gradient(45deg, #28a745, #20c997)",
                      fontSize: "14px",
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    THÊM THU CHI
                  </button>
                </div>
                <div className="card-body p-0">
                  {paymentList.length === 0 ? (
                    <div className="text-center py-5">
                      <FontAwesomeIcon
                        icon={faInbox}
                        className="fa-4x text-muted mb-3"
                      />
                      <h5 className="text-muted fw-bold text-uppercase">
                        CHƯA CÓ PHIẾU CHI NÀO
                      </h5>
                      <p className="text-muted">
                        Hãy thêm phiếu chi đầu tiên cho sự kiện này
                      </p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead style={{ backgroundColor: color.veryLightGray }}>
                          <tr>
                            <th
                              className="fw-bold text-uppercase py-3 px-4"
                              style={{
                                borderRadius: "0",
                                fontSize: "14px",
                                backgroundColor: color.lightPrimary,
                              }}
                            >
                              NỘI DUNG
                            </th>
                            <th
                              className="fw-bold text-uppercase py-3 px-4"
                              style={{
                                borderRadius: "0",
                                fontSize: "14px",
                                backgroundColor: color.lightPrimary,
                              }}
                            >
                              MINH CHỨNG
                            </th>
                            <th
                              className="fw-bold text-uppercase py-3 px-4"
                              style={{
                                borderRadius: "0",
                                fontSize: "14px",
                                backgroundColor: color.lightPrimary,
                              }}
                            >
                              NGÀY CHI
                            </th>
                            <th
                              className="fw-bold text-uppercase py-3 px-4"
                              style={{
                                borderRadius: "0",
                                fontSize: "14px",
                                backgroundColor: color.lightPrimary,
                              }}
                            >
                              SỐ TIỀN
                            </th>
                            <th
                              className="fw-bold text-uppercase py-3 px-4"
                              style={{
                                borderRadius: "0",
                                fontSize: "14px",
                                backgroundColor: color.lightPrimary,
                              }}
                            >
                              HÀNH ĐỘNG
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {paymentList.map((payment, index) => (
                            <tr
                              key={payment.MaPC}
                              className={index % 2 === 0 ? "bg-light" : ""}
                            >
                              <td className="py-3 px-4 fw-semibold">
                                {payment.NoiDung}
                              </td>
                              <td className="py-3 px-4">
                                <button
                                  className="btn btn-sm"
                                  style={{
                                    borderColor: color.primary,
                                    color: color.primary,
                                    borderRadius: "10px",
                                    transition: "all 0.3s ease",
                                    transform: "scale(1)",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.transform = "scale(1.1)";
                                    e.target.style.backgroundColor =
                                      color.primary;
                                    e.target.style.color = "white";
                                    e.target.style.boxShadow = `0 4px 15px ${color.primary}40`;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.transform = "scale(1)";
                                    e.target.style.backgroundColor =
                                      "transparent";
                                    e.target.style.color = color.primary;
                                    e.target.style.boxShadow = "none";
                                  }}
                                  onClick={() =>
                                    handleImageClick(payment.MinhChung)
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faImage}
                                    className="me-1"
                                  />
                                  XEM
                                </button>
                              </td>
                              <td className="py-3 px-4 fw-semibold">
                                {formatDate(payment.NgayChi)}
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className="badge bg-danger fs-6 fw-bold px-3 py-2"
                                  style={{ borderRadius: "10px" }}
                                >
                                  -{formatCurrency(payment.SoTien)}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div
                                  className="btn-group shadow-sm"
                                  role="group"
                                >
                                  <button
                                    className="btn btn-outline-warning btn-sm"
                                    onClick={() => {
                                      setBasePayment(payment);
                                      setShowPaymentModal(true);
                                      setModalFunction(() => handleEditPayment);
                                    }}
                                    style={{ borderRadius: "10px 0 0 10px" }}
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </button>
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() =>
                                      handleDeletePayment(payment.MaPC)
                                    }
                                    style={{ borderRadius: "0 10px 10px 0" }}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* MODAL HIỂN THỊ HÌNH ẢNH */}
      {showImageModal && (
        <div
          className="modal show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.7)" }}
        >
          <div className="modal-dialog modal-lg">
            <div
              className="modal-content shadow-lg"
              style={{ borderRadius: "15px", border: "none" }}
            >
              <div
                className="modal-header text-white"
                style={{
                  borderRadius: "15px 15px 0 0",
                  backgroundColor: color.primary,
                }}
              >
                <h6 className="modal-title fw-bold text-uppercase">
                  <FontAwesomeIcon icon={faImage} className="me-2" />
                  MINH CHỨNG
                </h6>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowImageModal(false)}
                ></button>
              </div>
              <div className="modal-body text-center p-4">
                <img
                  src={`${selectedImage}`}
                  alt="Minh chứng"
                  className="img-fluid shadow-sm"
                  style={{
                    maxHeight: "500px",
                    borderRadius: "15px",
                    border: "3px solid #e9ecef",
                  }}
                />
              </div>
              <div
                className="modal-footer"
                style={{ borderRadius: "0 0 15px 15px", borderTop: "none" }}
              >
                <button
                  type="button"
                  className="btn btn-secondary fw-bold text-uppercase"
                  onClick={() => setShowImageModal(false)}
                  style={{ borderRadius: "12px", fontSize: "14px" }}
                >
                  ĐÓNG
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
