import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../assets/css/EventModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faLocation,
  faNewspaper,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import color from "../../assets/color";
import EventForm from "../Form/EventForm";

const FixEventModal = ({ isShowing, hide, events }) => {
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
            <div className="p-4">
              <EventForm event={events} />
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};
export default FixEventModal;
