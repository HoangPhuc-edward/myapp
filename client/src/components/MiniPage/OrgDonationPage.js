import React, { useState, useEffect, useCallback } from "react";
import DonationApi from "../../api/donationApi";
import EventApi from "../../api/eventApi";
import VolunteerApi from "../../api/volunteerApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faChevronLeft,
  faChevronRight,
  faCalendarAlt,
  faDonate,
  faMoneyBill,
  faUser,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import color from "../../assets/color";
import { formatDateTime } from "../../utils/format";
import font from "../../assets/font";

const OrgDonationPage = ({ org }) => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [enrichedDonations, setEnrichedDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [donationsLoading, setDonationsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch organization events
  const fetchEvents = useCallback(async () => {
    if (!org?.MaSo) return;

    setLoading(true);
    try {
      const eventList = await EventApi.getEventByOrgId(org.MaSo);
      setEvents(eventList);

      if (eventList.length > 0) {
        setSelectedEventId(eventList[0].MaSuKien);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  }, [org?.MaSo]);

  // Fetch donations for selected event
  const fetchDonations = useCallback(async () => {
    if (!selectedEventId) return;

    setDonationsLoading(true);
    setCurrentPage(1); // Reset to first page when changing event

    try {
      const donationList = await DonationApi.getDonationsByMaSK(
        selectedEventId
      );

      // Sort by date (newest first)
      const sortedDonations = donationList.sort(
        (a, b) => new Date(b.NgayQuyenGop) - new Date(a.NgayQuyenGop)
      );

      // Enrich with volunteer data
      const enriched = await Promise.all(
        sortedDonations.map(async (donation) => {
          try {
            const volunteerData = await VolunteerApi.getVolById(donation.MaTNV);
            return {
              ...donation,
              TenTNV: volunteerData?.HoTen || "Tình nguyện viên không xác định",
              EmailTNV: volunteerData?.Email || "",
            };
          } catch (error) {
            console.error(`Error fetching volunteer ${donation.MaTNV}:`, error);
            return {
              ...donation,
              TenTNV: "Tình nguyện viên không xác định",
              EmailTNV: "",
            };
          }
        })
      );

      setEnrichedDonations(enriched);
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setDonationsLoading(false);
    }
  }, [selectedEventId]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (selectedEventId) {
      fetchDonations();
    }
  }, [selectedEventId, fetchDonations]);

  // Format currency to VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Calculate total donation amount for selected event
  const totalDonationAmount = enrichedDonations.reduce(
    (sum, d) => sum + d.SoTien,
    0
  );

  // Pagination logic
  const totalPages = Math.ceil(enrichedDonations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDonations = enrichedDonations.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            size="2x"
            style={{ color: color.primary }}
          />
          <p className="mt-3">Đang tải dữ liệu sự kiện...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <h1
          className="title my-3"
          style={{ fontWeight: "bold", fontFamily: font.monsterrat }}
        >
          THÔNG TIN QUYÊN GÓP
        </h1>
        <div className="col-12">
          {/* Donations Content */}
          {selectedEventId && (
            <div className="card">
              <div
                className="card-header"
                style={{ backgroundColor: color.primary }}
              >
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h5 className="mb-0" style={{ color: "white" }}>
                      <FontAwesomeIcon
                        icon={faDonate}
                        className="me-2"
                        color="white"
                      />
                      Danh sách phiếu quyên góp
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="eventSelect" className="form-label fw-bold">
                      <FontAwesomeIcon icon={faMoneyBill} className="me-2" />
                      Chọn sự kiện:
                    </label>
                    <select
                      id="eventSelect"
                      className="form-select"
                      value={selectedEventId || ""}
                      onChange={(e) =>
                        setSelectedEventId(parseInt(e.target.value))
                      }
                      style={{ borderColor: color.primary }}
                    >
                      {events.map((event) => (
                        <option key={event.MaSuKien} value={event.MaSuKien}>
                          {event.TenSuKien}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {donationsLoading ? (
                  <div className="text-center py-4">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin
                      size="2x"
                      style={{ color: color.primary }}
                    />
                    <p className="mt-3">Đang tải dữ liệu quyên góp...</p>
                  </div>
                ) : enrichedDonations.length === 0 ? (
                  <div className="text-center py-5">
                    <FontAwesomeIcon
                      icon={faDonate}
                      size="3x"
                      style={{ color: color.lightGray }}
                    />
                    <h5 className="mt-3 text-muted">Chưa có phiếu quyên góp</h5>
                    <p className="text-muted">
                      Sự kiện này chưa nhận được quyên góp nào.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Summary Stats */}
                    <div className="row mb-4">
                      <div className="col-md-4">
                        <div className="card bg-light">
                          <div className="card-body text-center">
                            <h6 className="card-title">Số phiếu quyên góp</h6>
                            <h4 style={{ color: color.primary }}>
                              {enrichedDonations.length}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card bg-light">
                          <div className="card-body text-center">
                            <h6 className="card-title">Tổng số tiền</h6>
                            <h4 style={{ color: "#28a745" }}>
                              {formatCurrency(totalDonationAmount)}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card bg-light">
                          <div className="card-body text-center">
                            <h6 className="card-title">Trung bình mỗi phiếu</h6>
                            <h4 style={{ color: "#17a2b8" }}>
                              {formatCurrency(
                                Math.round(
                                  totalDonationAmount / enrichedDonations.length
                                )
                              )}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Donations Table */}
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead style={{ backgroundColor: color.lightPrimary }}>
                          <tr>
                            <th
                              scope="col"
                              style={{
                                fontFamily: font.monsterrat,
                                fontSize: "16px",
                                fontWeight: "bold",
                              }}
                            >
                              #
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontFamily: font.monsterrat,
                                fontSize: "16px",
                                fontWeight: "bold",
                              }}
                            >
                              <FontAwesomeIcon icon={faUser} className="me-2" />
                              Tình nguyện viên
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontFamily: font.monsterrat,
                                fontSize: "16px",
                                fontWeight: "bold",
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faDonate}
                                className="me-2"
                              />
                              Số tiền
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontFamily: font.monsterrat,
                                fontSize: "16px",
                                fontWeight: "bold",
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faCalendarAlt}
                                className="me-2"
                              />
                              Ngày quyên góp
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentDonations.map((donation, index) => (
                            <tr key={donation.MaPQG}>
                              <td
                                className="fw-bold"
                                style={{
                                  fontFamily: font.monsterrat,
                                  fontSize: "16px",
                                }}
                              >
                                {startIndex + index + 1}
                              </td>
                              <td>
                                <div>
                                  <div
                                    className="fw-bold"
                                    style={{
                                      color: color.primary,
                                      fontFamily: font.monsterrat,
                                      fontSize: "16px",
                                    }}
                                  >
                                    {donation.TenTNV}
                                  </div>
                                  {donation.EmailTNV && (
                                    <small
                                      className="text-muted"
                                      style={{
                                        fontFamily: font.monsterrat,
                                        fontSize: "13px",
                                      }}
                                    >
                                      {donation.EmailTNV}
                                    </small>
                                  )}
                                </div>
                              </td>
                              <td>
                                <span
                                  className="fw-bold"
                                  style={{
                                    color: "#28a745",
                                    fontSize: "18px",
                                    fontFamily: font.monsterrat,
                                  }}
                                >
                                  {formatCurrency(donation.SoTien)}
                                </span>
                              </td>
                              <td>
                                <span
                                  className="badge bg-light text-dark"
                                  style={{
                                    fontFamily: font.monsterrat,
                                    fontSize: "14px",
                                    padding: "8px 12px",
                                  }}
                                >
                                  {formatDateTime(donation.NgayQuyenGop)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="d-flex justify-content-between align-items-center mt-4">
                        <div>
                          <small className="text-muted">
                            Hiển thị {startIndex + 1}-
                            {Math.min(endIndex, enrichedDonations.length)}
                            trong tổng số {enrichedDonations.length} phiếu quyên
                            góp
                          </small>
                        </div>
                        <nav>
                          <ul className="pagination mb-0">
                            <li
                              className={`page-item ${
                                currentPage === 1 ? "disabled" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                              >
                                <FontAwesomeIcon icon={faChevronLeft} />
                              </button>
                            </li>

                            {Array.from(
                              { length: totalPages },
                              (_, i) => i + 1
                            ).map((page) => (
                              <li
                                key={page}
                                className={`page-item ${
                                  currentPage === page ? "active" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => goToPage(page)}
                                  style={
                                    currentPage === page
                                      ? {
                                          backgroundColor: color.primary,
                                          borderColor: color.primary,
                                        }
                                      : {}
                                  }
                                >
                                  {page}
                                </button>
                              </li>
                            ))}

                            <li
                              className={`page-item ${
                                currentPage === totalPages ? "disabled" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                              >
                                <FontAwesomeIcon icon={faChevronRight} />
                              </button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {events.length === 0 && !loading && (
            <div className="card">
              <div className="card-body text-center py-5">
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  size="3x"
                  style={{ color: color.lightGray }}
                />
                <h5 className="mt-3 text-muted">Chưa có sự kiện nào</h5>
                <p className="text-muted">Tổ chức chưa tạo sự kiện nào.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgDonationPage;
