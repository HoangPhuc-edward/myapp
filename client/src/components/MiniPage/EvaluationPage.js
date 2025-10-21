import EvaluationApi from "../../api/evaluationApi";
import React, { useState, useEffect } from "react";
import EnrollApi from "../../api/enrollApi";
import EventApi from "../../api/eventApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faStar,
  faSpinner,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import color from "../../assets/color";
import { formatDateTime } from "../../utils/format";
import font from "../../assets/font";

const EvaluationPage = () => {
  const MaToChuc = 2;

  // States
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [events, setEvents] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [currentEvaluation, setCurrentEvaluation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form states
  const [formData, setFormData] = useState({
    SoDiem: "",
    NoiDung: "",
  });

  // Fetch events for organization
  const fetchEvents = async () => {
    try {
      const eventList = await EventApi.getEventByOrgId(MaToChuc);
      setEvents(eventList);
      if (eventList.length > 0) {
        setSelectedEventId(eventList[0].MaSuKien);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch volunteers and evaluations for selected event
  const fetchVolunteersAndEvaluations = async () => {
    if (!selectedEventId) return;

    setIsLoading(true);
    try {
      const [volunteerList, evaluationList] = await Promise.all([
        EnrollApi.getVolunteersByEventId(selectedEventId),
        EvaluationApi.getEvaluationByMSK(selectedEventId),
      ]);

      setVolunteers(volunteerList);
      setEvaluations(evaluationList);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get evaluation for specific volunteer
  const getEvaluationForVolunteer = (volunteerId) => {
    return evaluations.find((evaluation) => evaluation.MaTNV === volunteerId);
  };

  // Filter volunteers by search term
  const filteredVolunteers = volunteers.filter((volunteer) =>
    volunteer.HoTen.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle add evaluation
  const handleAddEvaluation = (enrollment) => {
    setSelectedEnrollment(enrollment);
    setCurrentEvaluation(null);
    setModalMode("add");
    setFormData({
      SoDiem: "",
      NoiDung: "",
    });
    setShowModal(true);
  };

  // Handle edit evaluation
  const handleEditEvaluation = (enrollment) => {
    const evaluation = getEvaluationForVolunteer(enrollment.MaTNV);
    setSelectedEnrollment(enrollment);
    setCurrentEvaluation(evaluation);
    setModalMode("edit");
    setFormData({
      SoDiem: evaluation.SoDiem.toString(),
      NoiDung: evaluation.NoiDung,
    });
    setShowModal(true);
  };

  // Handle delete evaluation
  const handleDeleteEvaluation = async (enrollment) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa phiếu đánh giá này?")) {
      return;
    }

    try {
      const evaluation = getEvaluationForVolunteer(enrollment.MaTNV);
      await EvaluationApi.deleteEvaluation(evaluation.MaPDG);
      alert("Xóa phiếu đánh giá thành công!");
      await fetchVolunteersAndEvaluations();
    } catch (error) {
      console.error("Error deleting evaluation:", error);
      alert("Có lỗi xảy ra khi xóa phiếu đánh giá!");
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.SoDiem || !formData.NoiDung) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (formData.SoDiem < 0 || formData.SoDiem > 5) {
      alert("Điểm số phải từ 0 đến 5!");
      return;
    }

    try {
      if (modalMode === "add") {
        console.log(selectedEnrollment);
        const data = {
          MaPDK: selectedEnrollment.MaSo,
          NgayLap: new Date().toISOString().split("T")[0],
          SoDiem: parseFloat(formData.SoDiem),
          NoiDung: formData.NoiDung,
        };
        await EvaluationApi.addEvaluation(data);
        alert("Thêm phiếu đánh giá thành công!");
      } else {
        const data = {
          MaPDG: currentEvaluation.MaPDG,
          MaPDK: selectedEnrollment.MaSo,
          NgayLap: currentEvaluation.NgayLap.split("T")[0],
          SoDiem: parseFloat(formData.SoDiem),
          NoiDung: formData.NoiDung,
        };
        await EvaluationApi.updateEvaluation(currentEvaluation.MaPDG, data);
        alert("Cập nhật phiếu đánh giá thành công!");
      }

      setShowModal(false);
      await fetchVolunteersAndEvaluations();
    } catch (error) {
      console.error("Error saving evaluation:", error);
      alert("Có lỗi xảy ra khi lưu phiếu đánh giá!");
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            style={{ color: "#FFD700", marginRight: "2px" }}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            style={{ color: "#FFD700", marginRight: "2px", opacity: 0.5 }}
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            style={{ color: "#ddd", marginRight: "2px" }}
          />
        );
      }
    }
    return stars;
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEventId) {
      fetchVolunteersAndEvaluations();
    }
  }, [selectedEventId]);

  return (
    <div className="container-fluid">
      <h1
        className="title my-3"
        style={{ fontWeight: "bold", fontFamily: font.monsterrat }}
      >
        ĐÁNH GIÁ TÌNH NGUYỆN VIÊN
      </h1>

      {/* Event Selection */}
      <div className="card mb-4">
        <div
          className="card-header"
          style={{ backgroundColor: color.primary, color: "white" }}
        >
          <h5 className="mb-0">Chọn sự kiện</h5>
        </div>
        <div className="card-body">
          <select
            className="form-select"
            value={selectedEventId || ""}
            onChange={(e) => setSelectedEventId(parseInt(e.target.value))}
          >
            <option value="">-- Chọn sự kiện --</option>
            {events.map((event) => (
              <option key={event.MaSuKien} value={event.MaSuKien}>
                {event.TenSuKien} - {formatDateTime(event.NgayBatDau)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Bar */}
      {/* {selectedEventId && (
        <div className="card mb-4">
          <div
            className="card-header"
            style={{ backgroundColor: color.primary, color: "white" }}
          >
            <h5 className="mb-0">Tìm kiếm tình nguyện viên</h5>
          </div>
          <div className="card-body">
            <div className="input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên tình nguyện viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setSearchTerm("")}
                >
                  ✕
                </button>
              )}
            </div>
            {searchTerm && (
              <small className="text-muted mt-2 d-block">
                Tìm thấy {filteredVolunteers.length} kết quả cho "{searchTerm}"
              </small>
            )}
          </div>
        </div>
      )} */}

      {/* Volunteers List */}
      {selectedEventId && (
        <div className="card">
          <div
            className="card-header"
            style={{ backgroundColor: color.primary, color: "white" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Danh sách tình nguyện viên</h5>
              <div className="d-flex align-items-center gap-3">
                <span className="badge bg-light text-dark">
                  Tổng: {volunteers.length} TNV
                </span>
                <div className="input-group" style={{ width: "300px" }}>
                  <span className="input-group-text bg-white">
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm theo tên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      className="btn btn-outline-light"
                      type="button"
                      onClick={() => setSearchTerm("")}
                      style={{ borderColor: "white" }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>
            {searchTerm && (
              <div className="mt-2">
                <small className="text-light">
                  Hiển thị {filteredVolunteers.length} / {volunteers.length}{" "}
                  tình nguyện viên
                </small>
              </div>
            )}
          </div>
          <div className="card-body">
            {isLoading ? (
              <div className="text-center py-4">
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  size="2x"
                  style={{ color: color.primary }}
                />
                <p className="mt-2">Đang tải dữ liệu...</p>
              </div>
            ) : filteredVolunteers.length === 0 ? (
              <div className="text-center text-muted py-4">
                {searchTerm ? (
                  <>
                    <p>
                      Không tìm thấy tình nguyện viên nào với từ khóa "
                      {searchTerm}"
                    </p>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setSearchTerm("")}
                    >
                      Xóa bộ lọc
                    </button>
                  </>
                ) : (
                  <p>Chưa có tình nguyện viên nào đăng ký</p>
                )}
              </div>
            ) : (
              <div className="row">
                {filteredVolunteers.map((volunteer) => {
                  const evaluation = getEvaluationForVolunteer(volunteer.MaTNV);
                  const hasEvaluation = !!evaluation;

                  return (
                    <div
                      key={volunteer.MaTNV}
                      className="col-md-6 col-lg-4 mb-3"
                    >
                      <div className="card h-100">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-3">
                            <img
                              src={volunteer.HinhAnh}
                              alt={volunteer.HoTen}
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                marginRight: "15px",
                              }}
                            />
                            <div>
                              <h6 className="mb-0">{volunteer.HoTen}</h6>
                              <small className="text-muted">
                                {volunteer.Email}
                              </small>
                            </div>
                          </div>

                          {hasEvaluation && (
                            <div className="mb-3">
                              <div className="d-flex align-items-center mb-2">
                                <span className="me-2">Điểm:</span>
                                {renderStars(evaluation.SoDiem)}
                                <span className="ms-2 fw-bold">
                                  {evaluation.SoDiem}/5
                                </span>
                              </div>
                              <p className="text-muted small mb-1">
                                <strong>Nhận xét:</strong> {evaluation.NoiDung}
                              </p>
                              <p className="text-muted small">
                                <strong>Ngày đánh giá:</strong>{" "}
                                {formatDateTime(evaluation.NgayLap)}
                              </p>
                            </div>
                          )}

                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm"
                              style={{
                                backgroundColor: hasEvaluation
                                  ? color.primary
                                  : "#28a745",
                                color: "white",
                              }}
                              onClick={() =>
                                hasEvaluation
                                  ? handleEditEvaluation(volunteer)
                                  : handleAddEvaluation(volunteer)
                              }
                            >
                              <FontAwesomeIcon
                                icon={hasEvaluation ? faEdit : faPlus}
                                className="me-1"
                              />
                              {hasEvaluation ? "Sửa" : "Thêm"}
                            </button>

                            {hasEvaluation && (
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  handleDeleteEvaluation(volunteer)
                                }
                              >
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="me-1"
                                />
                                Xóa
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal for Add/Edit Evaluation */}
      {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalMode === "add"
                    ? "Thêm phiếu đánh giá"
                    : "Chỉnh sửa phiếu đánh giá"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {selectedEnrollment && (
                    <div className="mb-3">
                      <label className="form-label">Tình nguyện viên:</label>
                      <div className="d-flex align-items-center">
                        <img
                          src={selectedEnrollment.HinhAnh}
                          alt={selectedEnrollment.HoTen}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginRight: "10px",
                          }}
                        />
                        <div>
                          <strong>{selectedEnrollment.HoTen}</strong>
                          <br />
                          <small className="text-muted">
                            {selectedEnrollment.Email}
                          </small>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="SoDiem" className="form-label">
                      Điểm số (0-5):
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="SoDiem"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData.SoDiem}
                      onChange={(e) =>
                        setFormData({ ...formData, SoDiem: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="NoiDung" className="form-label">
                      Nhận xét:
                    </label>
                    <textarea
                      className="form-control"
                      id="NoiDung"
                      rows="4"
                      value={formData.NoiDung}
                      onChange={(e) =>
                        setFormData({ ...formData, NoiDung: e.target.value })
                      }
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: color.primary, color: "white" }}
                  >
                    {modalMode === "add" ? "Thêm" : "Cập nhật"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationPage;
