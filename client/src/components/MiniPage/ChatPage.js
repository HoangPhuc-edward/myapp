import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import font from "../../assets/font";
import ChatEventPage from "./ChatEventPage";
import ChatPrivatePage from "./ChatPrivatePage";
import color from "../../assets/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

const ChatPage = ({ type }) => {
  const [state, setState] = useState("group");

  return (
    <div className="container mt-5">
      <h1
        className="title my-3"
        style={{ fontWeight: "bold", fontFamily: font.monsterrat }}
      >
        TIN NHẮN
      </h1>
      <div className="d-flex flex-row mb-3">
        <button
          style={{
            backgroundColor:
              state === "group" ? color.primary : color.veryLighGray,
            color: state === "group" ? "white" : "black",
            border: "none",
            borderRadius: "1rem",
            padding: "0.5rem 1rem",
            textAlign: "center",
          }}
          onClick={() => setState("group")}
        >
          <FontAwesomeIcon
            icon={faCalendar}
            style={{ marginRight: "0.5rem" }}
          />
          Tin nhắn sự kiện
        </button>
        <button
          style={{
            backgroundColor:
              state === "private" ? color.primary : color.veryLighGray,
            color: state === "private" ? "white" : "black",
            border: "none",
            marginLeft: "1rem",
            borderRadius: "1rem",
            padding: "0.5rem 1rem",
          }}
          onClick={() => setState("private")}
        >
          <FontAwesomeIcon icon={faUser} style={{ marginRight: "0.5rem" }} />
          Tin nhắn riêng
        </button>
      </div>
      {state === "private" && <ChatPrivatePage type={type} />}
      {state === "group" && <ChatEventPage type={type} />}
    </div>
  );
};

export default ChatPage;
