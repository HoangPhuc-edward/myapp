import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import color from "../assets/color";
import font from "../assets/font";
import {
  faArrowLeft,
  faArrowRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import EventCard from "./EventCard";

const EventHomePage = ({ events, handleEventClick, fetchData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = events.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1
        className="title my-3"
        style={{ fontWeight: "bold", fontFamily: font.monsterrat }}
      >
        TỔNG HỢP SỰ KIỆN
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
      <div className="row">
        {currentEvents.map((event, index) => (
          <div className="col-md-6" key={index}>
            <EventCard
              event={event}
              moveToEventDetail={handleEventClick}
              index={index}
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

export default EventHomePage;
