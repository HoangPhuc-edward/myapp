import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

import color from "../assets/color";
import { getImageURL } from "../firebase/storage";

const EventCard = ({ event, moveToEventDetail, index }) => {
  const getDateTime = (myDate) => {
    const result = myDate.split("-");
    return [result[0], `Th${result[1]}`];
  };
  return (
    <div
      onClick={() => moveToEventDetail(index)}
      className="card mb-3"
      style={{ borderRadius: "1rem" }}
    >
      <div className="w-100">
        <div
          className="d-flex flex-column justify-content-center align-items-center position-absolute"
          style={{
            backgroundColor: "white",
            top: "0.6rem",
            left: "0.6rem",
            color: "black",
            padding: "0.3rem",
            width: "4rem",
            aspectRatio: "1",
            borderRadius: "1rem",
          }}
        >
          <span
            className="mb-0"
            style={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            {getDateTime(event.NgayKetThuc)[0]}
          </span>
          <span
            style={{
              marginTop: "-0.4rem",
              fontSize: "0.9rem",
              fontWeight: "bold",
            }}
          >
            {getDateTime(event.NgayKetThuc)[1]}
          </span>
        </div>
        <div
          className="w-100"
          style={{ borderRadius: "1rem", height: "10rem", overflow: "hidden" }}
        >
          <img
            src={event.HinhAnh}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      <div className="card-body">
        <div
          className="d-flex flex-row align-items-center"
          style={{
            overflow: "hidden",
            maxHeight: "2rem",
            maxWidth: "100%",
          }}
        >
          <FontAwesomeIcon icon={faLocationArrow} color="#545454" />
          <p className="px-2 mb-0 text-truncate" style={{ color: "#545454" }}>
            {event.DiaDiem}
          </p>
        </div>

        <div
          className="d-flex flex-row align-items-center py-2"
          style={{ height: "4.5rem" }}
        >
          <h5
            className="line-clamp-2"
            style={{
              fontWeight: "700",
            }}
          >
            {event.TenSuKien}
          </h5>
        </div>

        <div className="row mb-2">
          <div className="col-md-6 d-flex flex-row align-items-center">
            <div
              style={{
                backgroundImage: `url(${event.HinhToChuc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                marginRight: "1rem",
              }}
            ></div>
            <p
              className="text-truncate mb-0 w-2"
              style={{ fontWeight: "bold", maxWidth: "60%" }}
            >
              {event.ToChuc}
            </p>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            <div
              style={{
                backgroundColor: color.lightPrimary,
                borderRadius: "1rem",
                maxHeight: "2rem",
                padding: "0.2rem 0.5rem",
              }}
            >
              <small className="text-muted" style={{ fontWeight: "bold" }}>
                {event.SoLuong}/{event.SoLuongToiDa} Đã đăng ký
              </small>
            </div>
          </div>
        </div>

        <p className="text-truncate">Ngày bắt đầu: {event.NgayBatDau}</p>
      </div>
    </div>
  );
};

export default EventCard;
