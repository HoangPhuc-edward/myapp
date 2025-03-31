import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import color from "../assets/color";
import EventApi from "../api/eventApi";
import MessageApi from "../api/messageApi";

const SmallEventCard = ({
  event,
  moveToEventDetail,
  type,
  fix_func = null,
}) => {
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
      <div
        className="row w-100 ms-1 d-flex flex-row justify-content-center align-items-center"
        onClick={() => moveToEventDetail(event)}
      >
        <div className="col-md-4 p-0" style={{ borderRadius: "1rem" }}>
          <img
            src={event.HinhAnh}
            alt=""
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
          <p className="text-truncate">Tổ chức: {event.ToChuc}</p>
          <p className="text-truncate">Ngày Bắt đầu: {event.NgayBatDau}</p>
          <p className="text-truncate">Ngày kết thúc: {event.NgayKetThuc}</p>
          <p className="text-truncate">
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
