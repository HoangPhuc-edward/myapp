import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import color from "../../assets/color";
import font from "../../assets/font";
import {
  faArrowLeft,
  faArrowRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import SmallEventCard from "../SmallEventCard";
import EventApi from "../../api/eventApi";
import OrgApi from "../../api/orgApi";
import AddressApi from "../../api/addressApi";
import LocationApi from "../../api/locationApi";
import {
  formatAddress,
  formatDateTime,
  formatProvince,
} from "../../utils/format";
import EnrollApi from "../../api/enrollApi";
import { getUser } from "../../firebase/auth";
import VolunteerApi from "../../api/volunteerApi";
import FixEventModal from "../Modal/FixEventModal";
import useModal from "../../hooks/useModal";

const EventListPage = ({ handleEventClick, type }) => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [show, setShow] = useState("all");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const itemsPerPage = 3;

  const totalPages = Math.ceil(selectedEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = selectedEvents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const { isShowing, toggle } = useModal();

  const [currentEvent, setCurrentEvent] = useState(null);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const fetchData = async (searchTerm) => {
    let events = [];
    const newUser = await getUser();
    if (newUser === null) return;

    if (type === "org") {
      const my_id = await OrgApi.getOrgIdByEmail(newUser.email);
      events = await EventApi.getEventByOrgId(my_id);
    } else {
      const my_id = await VolunteerApi.getVolIdByEmail(newUser.email);
      events = await EventApi.getEventByVolunteerId(my_id);
    }

    const updatedEvents = await Promise.all(
      events.map(async (event) => {
        const tochuc = await OrgApi.getOrgById(event.MaToChuc);
        const address = await AddressApi.getAddressById(event.MaDiaDiem);
        const location = await LocationApi.getLocationByWardId(
          address.MaPhuongXa
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
    const filteredEvents = updatedEvents.filter((event) =>
      event.TenSuKien.toLowerCase().includes(searchTerm)
    );
    setCurrentPage(1);

    setEvents(filteredEvents);
    setSelectedEvents(filteredEvents);
    splitEventByDate(filteredEvents);
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

  const handleShowModal = (event) => {
    setCurrentEvent(event);
    toggle();
  };

  useEffect(() => {
    fetchData("");
  }, []);

  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(0);
    } else setCurrentPage(1);
  }, [totalPages]);

  useEffect(() => {
    if (show === "all") {
      setSelectedEvents(events);
      setCurrentPage(1);
    } else if (show === "upcoming") {
      setSelectedEvents(upcomingEvents);
      setCurrentPage(1);
    } else if (show === "ongoing") {
      setSelectedEvents(ongoingEvents);
      setCurrentPage(1);
    } else if (show === "past") {
      setSelectedEvents(pastEvents);
      setCurrentPage(1);
    }
  }, [show]);

  return (
    <div>
      <FixEventModal
        isShowing={isShowing}
        hide={toggle}
        events={currentEvent}
      />
      <h1
        className="title my-3"
        style={{ fontWeight: "bold", fontFamily: font.monsterrat }}
      >
        SỰ KIỆN CỦA BẠN
      </h1>
      <div className="mb-3 input-group">
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
          placeholder="Tìm kiếm sự kiện..."
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            fetchData(searchTerm);
          }}
        />
      </div>
      <div className="row mb-3">
        <div className="col-md-2">
          <button
            onClick={() => setShow("all")}
            style={{
              backgroundColor:
                show === "all" ? color.primary : color.veryLighGray,
              color: show === "all" ? "white" : "black",
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
            onClick={() => setShow("upcoming")}
            style={{
              backgroundColor:
                show === "upcoming" ? color.primary : color.veryLighGray,
              color: show === "upcoming" ? "white" : "black",
              border: "none",
              borderRadius: "1rem",
              padding: "0.5rem 1rem",
              width: "100%",
            }}
          >
            Sắp tới
          </button>
        </div>
        <div className="col-md-2">
          <button
            onClick={() => setShow("ongoing")}
            style={{
              backgroundColor:
                show === "ongoing" ? color.primary : color.veryLighGray,
              color: show === "ongoing" ? "white" : "black",
              border: "none",
              borderRadius: "1rem",
              padding: "0.5rem 1rem",
              width: "100%",
            }}
          >
            Hiện tại
          </button>
        </div>

        <div className="col-md-2">
          <button
            onClick={() => setShow("past")}
            style={{
              backgroundColor:
                show === "past" ? color.primary : color.veryLighGray,
              color: show === "past" ? "white" : "black",
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

      <div className="row">
        {currentEvents.map((event, index) => (
          <div className="col-md-12" key={index}>
            <SmallEventCard
              event={event}
              moveToEventDetail={handleEventClick}
              index={index}
              type={type}
              fix_func={handleShowModal}
            />
          </div>
        ))}
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

export default EventListPage;
