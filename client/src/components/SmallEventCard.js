import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faChurch,
  faPen,
  faTrash,
  faUser,
  faUserAlt,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import color from "../assets/color";
import EventApi from "../api/eventApi";
import MessageApi from "../api/messageApi";

const SmallEventCard = ({
  event,
  moveToEventDetail,
  type,
  fix_func = null,
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const hide_func = async (event) => {
    const ans = window.confirm("Bạn có chắc chắn muốn xóa sự kiện này không?");
    if (!ans) return;

    const result = await EventApi.hideEvent(event.MaSuKien);
    if (result) {
      alert("Xóa sự kiện thành công");
      await MessageApi.sendCancelMessage(event);
      window.location.reload();
    } else {
      alert("Xóa sự kiện thất bại");
    }
  };

  return (
    <div className="card mb-3 p-2" style={{ borderRadius: "1rem" }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .loading-spinner {
            animation: spin 1s linear infinite;
            color: #999;
          }
        `}
      </style>
      <div
        className="row w-100 ms-1 d-flex flex-row justify-content-center align-items-center"
        onClick={() => moveToEventDetail(event)}
      >
        <div
          className="col-md-4 p-0"
          style={{ borderRadius: "1rem", position: "relative" }}
        >
          {imageLoading && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "1rem",
                zIndex: 1,
              }}
            >
              <FontAwesomeIcon
                icon={faSpinner}
                className="loading-spinner"
                style={{ fontSize: "1.2rem" }}
              />
            </div>
          )}
          <img
            src={event.HinhAnh}
            alt={event.TenSuKien}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "1rem",
            }}
          />
        </div>
        <div className="col-md-6 my-1 ps-4">
          <h5 className="text-truncate">{event.TenSuKien}</h5>
          <p className="text-truncate">
            <FontAwesomeIcon
              icon={faChurch}
              style={{ marginRight: "0.5rem" }}
            />
            Tổ chức: {event.ToChuc}
          </p>
          <p className="text-truncate">
            <FontAwesomeIcon
              icon={faCalendar}
              style={{ marginRight: "0.5rem" }}
            />
            Ngày Bắt đầu: {event.NgayBatDau}
          </p>
          <p className="text-truncate">
            <FontAwesomeIcon
              icon={faCalendar}
              style={{ marginRight: "0.5rem" }}
            />
            Ngày kết thúc: {event.NgayKetThuc}
          </p>
          <p className="text-truncate">
            <FontAwesomeIcon
              icon={faUserAlt}
              style={{ marginRight: "0.5rem" }}
            />
            Số lượng: {event.SoLuong}/{event.SoLuongToiDa}
          </p>
        </div>

        {type === "org" ? (
          <div className="col-md-2 my-1 ps-4">
            <div
              className="d-flex align-items-center mb-3"
              style={{
                cursor: "pointer",
                backgroundColor: color.blue,
                color: "white",
                padding: "0.5rem",
                borderRadius: "0.5rem",
              }}
              onClick={(e) => {
                e.stopPropagation();
                fix_func(event);
              }}
            >
              <FontAwesomeIcon icon={faPen} />
              <span className="ms-2" style={{ fontWeight: "500" }}>
                Sửa
              </span>
            </div>
            <div
              className="d-flex align-items-center"
              style={{
                cursor: "pointer",
                backgroundColor: color.red,
                color: "white",
                padding: "0.5rem",
                borderRadius: "0.5rem",
              }}
              onClick={(e) => {
                e.stopPropagation();
                hide_func(event);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
              <span className="ms-2" style={{ fontWeight: "500" }}>
                Xóa
              </span>
            </div>
          </div>
        ) : (
          <div className="col-md-2"></div>
        )}
      </div>
    </div>
  );
};

export default SmallEventCard;
