import React, { useState, useEffect } from "react";
import DonationApi from "../../api/donationApi";
import EventApi from "../../api/eventApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faChevronLeft,
  faChevronRight,
  faCalendarAlt,
  faDonate,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import color from "../../assets/color";
import { formatDateTime } from "../../utils/format";
import font from "../../assets/font";

const VolDonationPage = ({ vol }) => {
  const [enrichedDonations, setEnrichedDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch donations data
  const fetchDonations = async () => {
    if (!vol?.MaSo) return;

    setLoading(true);
    try {
      const donationList = await DonationApi.getDonationsByMaTNV(vol.MaSo);

      // Sort by date (newest first)
      const sortedDonations = donationList.sort(
        (a, b) => new Date(b.NgayQuyenGop) - new Date(a.NgayQuyenGop)
      );

      // Enrich with event data
      const enriched = await Promise.all(
        sortedDonations.map(async (donation) => {
          try {
            const eventData = await EventApi.getEventById(donation.MaSuKien);
            return {
              ...donation,
              TenSuKien: eventData?.[0]?.TenSuKien || "Sự kiện không xác định",
            };
          } catch (error) {
            console.error(`Error fetching event ${donation.MaSuKien}:`, error);
            return {
              ...donation,
              TenSuKien: "Sự kiện không xác định",
            };
          }
        })
      );

      setEnrichedDonations(enriched);
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [vol]);

  // Format currency to VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

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
          <p className="mt-3">Đang tải dữ liệu quyên góp...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <h1
        className="title my-3"
        style={{ fontWeight: "bold", fontFamily: font.monsterrat }}
      >
        TỔNG HỢP PHIẾU QUYÊN GÓP
      </h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div
              className="card-header"
              style={{ backgroundColor: color.primary, color: "white" }}
            >
              <h4 className="mb-0">
                <FontAwesomeIcon icon={faDonate} className="me-2" />
                Lịch sử quyên góp của bạn
              </h4>
            </div>
            <div className="card-body">
              {enrichedDonations.length === 0 ? (
                <div className="text-center py-5">
                  <FontAwesomeIcon
                    icon={faDonate}
                    size="3x"
                    style={{ color: color.lightGray }}
                  />
                  <h5 className="mt-3 text-muted">Chưa có lịch sử quyên góp</h5>
                  <p className="text-muted">
                    Bạn chưa thực hiện quyên góp nào cho các sự kiện.
                  </p>
                </div>
              ) : (
                <>
                  {/* Summary */}
                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="card bg-light">
                        <div className="card-body text-center">
                          <h6 className="card-title">Tổng số lần quyên góp</h6>
                          <h4 style={{ color: color.primary }}>
                            {enrichedDonations.length}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card bg-light">
                        <div className="card-body text-center">
                          <h6 className="card-title">
                            Tổng số tiền đã quyên góp
                          </h6>
                          <h4 style={{ color: color.primary }}>
                            {formatCurrency(
                              enrichedDonations.reduce(
                                (sum, d) => sum + d.SoTien,
                                0
                              )
                            )}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card bg-light">
                        <div className="card-body text-center">
                          <h6 className="card-title">Lần quyên góp gần nhất</h6>
                          <h4 style={{ color: color.primary }}>
                            {enrichedDonations.length > 0
                              ? formatDateTime(
                                  enrichedDonations[0].NgayQuyenGop
                                )
                              : "N/A"}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Donations List */}
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
                            <FontAwesomeIcon
                              icon={faMoneyBill}
                              className="me-2"
                            />
                            Tên sự kiện
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
                          <th
                            scope="col"
                            style={{
                              fontFamily: font.monsterrat,
                              fontSize: "16px",
                              fontWeight: "bold",
                            }}
                          >
                            <FontAwesomeIcon icon={faDonate} className="me-2" />
                            Số tiền
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentDonations.map((donation, index) => (
                          <tr key={donation.MaPQG}>
                            <td>
                              <div
                                className="fw-bold"
                                style={{
                                  color: color.primary,
                                  fontFamily: font.monsterrat,
                                  fontSize: "16px",
                                }}
                              >
                                {donation.TenSuKien}
                              </div>
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
                          trong tổng số {enrichedDonations.length} bản ghi
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
        </div>
      </div>
    </div>
  );
};

export default VolDonationPage;
