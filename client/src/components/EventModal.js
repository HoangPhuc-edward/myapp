import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "../assets/css/EventModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faLocation,
  faNewspaper,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import color from "../assets/color";
import EnrollApi from "../api/enrollApi";

const EventModal = ({
  isShowing,
  hide,
  event,
  submit_func = null,
  user = null,
  cancel_func = null,
}) => {
  const [totalSpots, setTotalSpots] = useState(0);
  const [takenSpots, setTakenSpots] = useState(0);
  const [percentage, setPercentage] = useState("1.0");
  const [checkEnroll, setCheckEnroll] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (!user) return;
      if (!event) return;
      const checkEnrolled = await EnrollApi.findEnrolled(
        event.MaSuKien,
        user.MaSo
      );
      setTotalSpots(event.SoLuongToiDa);
      setTakenSpots(event.SoLuong);
      if (event.SoLuongToiDa === 0) setPercentage(0);
      else setPercentage((event.SoLuong / event.SoLuongToiDa) * 100);

      setCheckEnroll(checkEnrolled);
    };
    check();
  }, [event, user]);

  const func = async () => {
    if (checkEnroll) {
      cancel_func(checkEnroll);
    } else {
      submit_func(event);
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
                Thông tin sự kiện
              </h4>
              <div
                onClick={() => hide()}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon icon={faX} />
              </div>
            </div>
            <div className="row" style={{ padding: "2rem" }}>
              <div
                className="col-md-8 border"
                style={{ borderRadius: "1rem", padding: "1rem" }}
              >
                <h5 className="my-2 p-2" style={{ fontWeight: "bold" }}>
                  {event.TenSuKien}
                </h5>

                <img
                  src={event.HinhAnh}
                  alt=""
                  className="w-100"
                  style={{
                    borderRadius: "1rem",
                    maxHeight: "80%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div className="col-md-4">
                {user != null && (
                  <div
                    className="border d-flex flex-column justify-content-center align-items-center p-3"
                    style={{ borderRadius: "1rem" }}
                  >
                    <span
                      className="text-uppercase ms-2"
                      style={{ fontWeight: "bold", marginTop: "1rem" }}
                    >
                      {checkEnroll ? "Bạn đã đăng ký sự kiện" : "Đăng ký ngay"}
                    </span>
                    <button
                      style={{
                        backgroundColor: color.primary,
                        color: "white",
                        border: "none",
                        padding: "0.5rem 1rem",
                        width: "100%",
                        borderRadius: "1rem",
                        cursor: "pointer",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        margin: "1rem 0",
                      }}
                      onClick={() => func(event)}
                    >
                      {checkEnroll ? "Hủy đăng ký" : "Đăng ký"}
                    </button>
                    <div className="d-flex flex-row align-items-center justify-content-between">
                      <div style={{ width: "2rem" }}>
                        <CircularProgressbar
                          value={percentage}
                          strokeWidth={16}
                          styles={buildStyles({
                            strokeLinecap: "round",
                            textSize: "16px",
                            pathColor: color.primary,
                            trailColor: "#e6e6e6",
                          })}
                        />
                      </div>
                      <div
                        className="d-flex flex-column"
                        style={{ marginLeft: "1rem" }}
                      >
                        <span
                          style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                          }}
                        >
                          {takenSpots}/{totalSpots}
                        </span>
                        <span
                          style={{
                            marginTop: "-0.2rem",
                            fontSize: "0.8rem",
                          }}
                        >
                          Nguời đăng ký
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className="d-flex flex-column align-items-center justify-content-center border mt-3 p-3"
                  style={{ borderRadius: "1rem" }}
                >
                  <div
                    style={{
                      backgroundImage: `url(${event.HinhToChuc})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "4rem",
                      height: "4rem",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <span className="mt-2" style={{ fontWeight: "bold" }}>
                    {event.ToChuc}
                  </span>
                </div>

                <div
                  className="border mt-3 p-3"
                  style={{ borderRadius: "1rem" }}
                >
                  <div className="d-flex flex-row align-items-center mt-1">
                    <FontAwesomeIcon icon={faCalendar} />
                    <p className="mb-0 ms-2" style={{ fontWeight: "bold" }}>
                      Ngày bắt đầu
                    </p>
                  </div>

                  <div
                    className="p-1 m-1 d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: color.lightPrimary,
                      borderRadius: "1rem",
                    }}
                  >
                    <p className="mb-0" style={{ fontWeight: "bold" }}>
                      {event.NgayBatDau}
                    </p>
                  </div>

                  <div
                    className="d-flex flex-row align-items-center"
                    style={{ marginTop: "1rem" }}
                  >
                    <FontAwesomeIcon icon={faCalendar} />
                    <p className="mb-0 ms-2" style={{ fontWeight: "bold" }}>
                      Ngày kết thúc
                    </p>
                  </div>
                  <div
                    className="p-1 m-1 d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: color.lightPrimary,
                      borderRadius: "1rem",
                    }}
                  >
                    <p className="mb-0" style={{ fontWeight: "bold" }}>
                      {event.NgayKetThuc}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="col-md-12 border mt-3"
                style={{ borderRadius: "1rem", padding: "1rem" }}
              >
                <div className="d-flex flex-row align-items-center mb-2">
                  <FontAwesomeIcon icon={faLocation} />
                  <h5
                    className="mb-0"
                    style={{ fontWeight: "bold", marginLeft: "1rem" }}
                  >
                    Địa điểm sự kiện
                  </h5>
                </div>
                <p>{event.DiaDiem}</p>
              </div>
              <div
                className="col-md-12 border"
                style={{
                  borderRadius: "1rem",
                  padding: "1rem",
                  marginTop: "1rem",
                }}
              >
                <div className="d-flex flex-row align-items-center mb-2">
                  <FontAwesomeIcon icon={faNewspaper} />
                  <h5
                    className="mb-0"
                    style={{ fontWeight: "bold", marginLeft: "1rem" }}
                  >
                    Miêu tả sự kiện
                  </h5>
                </div>

                <p>{event.MieuTa}</p>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};
export default EventModal;
