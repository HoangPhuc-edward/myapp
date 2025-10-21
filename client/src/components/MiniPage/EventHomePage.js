import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import color from "../../assets/color";
import font from "../../assets/font";
import {
  faArrowLeft,
  faArrowRight,
  faSearch,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import EventCard from "../EventCard";
import {
  formatAddress,
  formatDateTime,
  formatProvince,
} from "../../utils/format";
import EventApi from "../../api/eventApi";
import OrgApi from "../../api/orgApi";

import LocationApi from "../../api/locationApi";
import EnrollApi from "../../api/enrollApi";

const EventHomePage = ({ handleEventClick }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [type, setType] = useState("all");

  const [searchEvent, setSearchEvent] = useState("");
  const [searchOrg, setSearchOrg] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(selectedEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = selectedEvents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const fetchData = async () => {
    setIsLoading(true);
    const events = await EventApi.getAllEvents();
    const updatedEvents = await Promise.all(
      events.map(async (event) => {
        const tochuc = await OrgApi.getOrgById(event.MaToChuc);
        // const address = await AddressApi.getAddressById(event.MaDiaDiem);
        const location = await LocationApi.getLocationByWardId(
          event.MaPhuongXa
        );
        const updatedNgayBatDau = formatDateTime(event.NgayBatDau);
        const updatedNgayKetThuc = formatDateTime(event.NgayKetThuc);
        const soLuong = await EnrollApi.countEnrolls(event.MaSuKien);

        return {
          ...event,
          ToChuc: tochuc.Ten,
          HinhToChuc: tochuc.HinhAnh,
          ThanhPho: formatProvince(location),
          DiaDiem: formatAddress(location),
          NgayBatDau: updatedNgayBatDau,
          NgayKetThuc: updatedNgayKetThuc,
          SoLuong: soLuong,
        };
      })
    );

    updatedEvents.sort((a, b) => {
      const dateA = new Date(a.NgayKetThuc.split("-").reverse().join("-"));
      const dateB = new Date(b.NgayKetThuc.split("-").reverse().join("-"));
      return dateB - dateA;
    });

    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
    setSelectedEvents(updatedEvents);
    setIsLoading(false);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  };

  const filterEvent = (searchEvent, searchOrg) => {
    setCurrentPage(1);
    const filteredEventName = events.filter((event) =>
      event.TenSuKien.toLowerCase().includes(searchEvent)
    );
    const filteredOrg = filteredEventName.filter((event) =>
      event.ToChuc.toLowerCase().includes(searchOrg)
    );
    setFilteredEvents(filteredOrg);
  };

  const splitEventByDate = (events) => {
    const today = new Date();

    const upcoming = [];
    const ongoing = [];
    const past = [];

    events.forEach((event) => {
      const startDate = new Date(
        event.NgayBatDau.split("-").reverse().join("-")
      );
      const endDate = new Date(
        event.NgayKetThuc.split("-").reverse().join("-")
      );

      if (startDate > today) {
        upcoming.push(event);
      } else if (startDate <= today && today <= endDate) {
        ongoing.push(event);
      } else {
        past.push(event);
      }
    });

    setUpcomingEvents(upcoming);
    setOngoingEvents(ongoing);
    setPastEvents(past);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterEvent(searchEvent, searchOrg);
  }, [searchEvent, searchOrg]);

  useEffect(() => {
    splitEventByDate(filteredEvents);
    setSelectedEvents(filteredEvents);
    setType("all");
  }, [filteredEvents]);

  useEffect(() => {
    setCurrentPage(1);
    if (type === "all") {
      setSelectedEvents(filteredEvents);
    } else if (type === "upcoming") {
      setSelectedEvents(upcomingEvents);
    } else if (type === "ongoing") {
      setSelectedEvents(ongoingEvents);
    } else if (type === "past") {
      setSelectedEvents(pastEvents);
    }
  }, [type]);

  return (
    <div>
      <h1
        className="title my-3"
        style={{ fontWeight: "bold", fontFamily: font.monsterrat }}
      >
        TỔNG HỢP SỰ KIỆN
      </h1>
      <div className="row">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <span
              className="input-group-text"
              style={{
                backgroundColor: color.lightPrimary,
                border: "none",
                borderTopLeftRadius: "1rem",
                borderBottomLeftRadius: "1rem",
                padding: "0.5rem 1rem",
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              type="text"
              className="form-control"
              style={{
                borderTopRightRadius: "1rem",
                borderBottomRightRadius: "1rem",
                padding: "0.5rem 1rem",
              }}
              placeholder="Tìm kiếm sự kiện theo tên..."
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                setSearchEvent(searchTerm);
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="input-group mb-3">
            <span
              className="input-group-text"
              style={{
                backgroundColor: color.lightPrimary,
                border: "none",
                borderTopLeftRadius: "1rem",
                borderBottomLeftRadius: "1rem",
                padding: "0.5rem 1rem",
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              type="text"
              className="form-control"
              style={{
                borderTopRightRadius: "1rem",
                borderBottomRightRadius: "1rem",
                padding: "0.5rem 1rem",
              }}
              placeholder="Tìm kiếm sự kiện theo tổ chức..."
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                setSearchOrg(searchTerm);
              }}
            />
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-2">
          <button
            onClick={() => setType("all")}
            style={{
              backgroundColor:
                type === "all" ? color.primary : color.veryLighGray,
              color: type === "all" ? "white" : "black",
              border: "none",
              borderRadius: "1rem",
              padding: "0.5rem 1rem",
              width: "100%",
            }}
          >
            Tất cả
          </button>
        </div>
        <div className="col-md-2">
          <button
            onClick={() => setType("upcoming")}
            style={{
              backgroundColor:
                type === "upcoming" ? color.primary : color.veryLighGray,
              color: type === "upcoming" ? "white" : "black",
              border: "none",
              borderRadius: "1rem",
              padding: "0.5rem 1rem",
              width: "100%",
            }}
          >
            Sắp diễn ra
          </button>
        </div>
        <div className="col-md-2">
          <button
            onClick={() => setType("ongoing")}
            style={{
              backgroundColor:
                type === "ongoing" ? color.primary : color.veryLighGray,
              color: type === "ongoing" ? "white" : "black",
              border: "none",
              borderRadius: "1rem",
              padding: "0.5rem 1rem",
              width: "100%",
            }}
          >
            Đang diễn ra
          </button>
        </div>
        <div className="col-md-2">
          <button
            onClick={() => setType("past")}
            style={{
              backgroundColor:
                type === "past" ? color.primary : color.veryLighGray,
              color: type === "past" ? "white" : "black",
              border: "none",
              borderRadius: "1rem",
              padding: "0.5rem 1rem",
              width: "100%",
            }}
          >
            Đã qua
          </button>
        </div>
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .loading-spinner {
            animation: spin 1s linear infinite;
            color: ${color.primary};
          }

          .loading-card {
            background: #f8f9fa;
            border-radius: 1rem;
            padding: 1rem;
            margin-bottom: 1rem;
            height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #e9ecef;
          }
        `}
      </style>
      <div className="row">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 4 }).map((_, index) => (
            <div className="col-md-6" key={index}>
              <div className="loading-card">
                <div style={{ textAlign: "center" }}>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="loading-spinner"
                    style={{ fontSize: "2rem", marginBottom: "1rem" }}
                  />
                  <div style={{ color: "#6c757d", fontSize: "14px" }}>
                    Đang tải sự kiện...
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : currentEvents.length > 0 ? (
          currentEvents.map((event, index) => (
            <div className="col-md-6" key={index}>
              <EventCard
                event={event}
                moveToEventDetail={handleEventClick}
                index={index}
              />
            </div>
          ))
        ) : (
          <div className="col-12">
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                color: "#6c757d",
                backgroundColor: "#f8f9fa",
                borderRadius: "1rem",
                border: "1px solid #e9ecef",
              }}
            >
              <h5>Không tìm thấy sự kiện nào</h5>
              <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <div>
            <button
              style={{
                backgroundColor: color.primary,
                borderRadius: "1rem",
                padding: "0.2rem 0.5rem",
                color: "white",
                border: "none",
              }}
              className="btn btn-outline-primary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <span className="mx-2">
              {currentPage} / {totalPages}
            </span>
            <button
              style={{
                backgroundColor: color.primary,
                borderRadius: "1rem",
                padding: "0.2rem 0.5rem",
                color: "white",
                border: "none",
              }}
              className="btn btn-outline-primary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default EventHomePage;
