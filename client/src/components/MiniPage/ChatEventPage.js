import { use, useEffect, useRef, useState } from "react";
import EventApi from "../../api/eventApi";
import EnrollApi from "../../api/enrollApi";
import { getUser } from "../../firebase/auth";
import OrgApi from "../../api/orgApi";
import VolunteerApi from "../../api/volunteerApi";

import MessageApi from "../../api/messageApi";
import { formatDateTime } from "../../utils/format";
import {
  faArrowRight,
  faLessThanEqual,
} from "@fortawesome/free-solid-svg-icons";
import font from "../../assets/font";
import color from "../../assets/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatEventPage = ({ type }) => {
  const [eventList, setEventList] = useState([]);
  const [event, setEvent] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState([]);
  const [user, setUser] = useState(null);

  const messageEndRef = useRef(null);
  const [textMessage, setTextMessage] = useState("");

  const fetchUser = async () => {
    const myUser = await getUser();
    if (!myUser) return;

    if (type === "volunteer") {
      const vol = await VolunteerApi.getVolByEmail(myUser.email);
      setUser(vol);
    } else {
      const org = await OrgApi.getOrgByEmail(myUser.email);
      setUser(org);
    }
  };

  const fetchEventAndMessage = async () => {
    if (!user) return;
    if (type === "volunteer") {
      const enrolls = await EnrollApi.getEnrollByVolunteerId(user.MaSo);

      const events = [];
      for (let i = 0; i < enrolls.length; i++) {
        const event = await EventApi.getEventDetailById(enrolls[i].MaSuKien);
        if (!event) continue;

        const org = await OrgApi.getOrgById(event[0].MaToChuc);

        if (!events.some((item) => item.MaSuKien === event[0].MaSuKien)) {
          events.push({ ...event[0], TenTC: org.Ten });
        }
      }
      setEventList(events);

      const myMessages = [];
      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const messages = await MessageApi.getMessageByMaSK(event.MaSuKien);
        messages.forEach((e) => myMessages.push(e));
      }

      setMessageList(myMessages);
    } else {
      const list = [];
      const events = await EventApi.getEventByOrgId(user.MaSo);
      events.forEach((e) => list.push({ ...e, TenTC: user.Ten }));
      setEventList(events);

      const myMessages = [];
      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const messages = await MessageApi.getMessageByMaSK(event.MaSuKien);
        messages.forEach((e) => myMessages.push(e));
      }

      setMessageList(myMessages);
    }
  };

  const fetchCurrentMessage = async () => {
    if (!event) return;

    const myMessages = messageList.filter((e) => e.MaSK === event.MaSuKien);

    myMessages.sort((a, b) => new Date(a.NgayGio) - new Date(b.NgayGio));

    let currentList = [];
    let groupedMessages = [];
    let currentDate = "";

    for (let i = 0; i < myMessages.length; i++) {
      const message = myMessages[i];
      const ngayThang = formatDateTime(message.NgayGio);
      const gioPhut = message.NgayGio.split("T")[1].slice(0, 5);

      if (ngayThang !== currentDate) {
        if (currentList.length > 0) {
          groupedMessages.push({ date: currentDate, mess: currentList });
        }
        currentDate = ngayThang;
        currentList = [];
      }

      let TenNguoiGui = "";
      let isSender = false;

      if (message.NguoiGui === "TNV") {
        const vol = await VolunteerApi.getVolById(message.MaTNV);
        TenNguoiGui = vol.HoTen;
        if (type === "volunteer") isSender = user.MaSo === vol.MaSo;
      } else {
        const org = await OrgApi.getOrgById(message.MaToChuc);
        TenNguoiGui = org.Ten;
        if (type === "org") isSender = user.MaSo === org.MaSo;
      }

      currentList.push({
        NoiDung: message.NoiDung,
        ThoiGian: gioPhut,
        TenNguoiGui: TenNguoiGui,
        isSender: isSender,
      });
    }

    if (currentList.length > 0) {
      groupedMessages.push({ date: currentDate, mess: currentList });
    }

    console.log(groupedMessages);
    setCurrentMessage(groupedMessages);
  };

  const sendMessage = async () => {
    if (!textMessage) return;
    if (type === "volunteer") {
      const data = {
        MaTNV: user.MaSo,
        NoiDung: textMessage,
        MaSK: event.MaSuKien,
      };
      await MessageApi.addVolGroupMessage(data);
      setTextMessage("");
      fetchEventAndMessage();
      fetchCurrentMessage();
    } else {
      const data = {
        MaToChuc: user.MaSo,
        NoiDung: textMessage,
        MaSK: event.MaSuKien,
      };
      await MessageApi.addOrgGroupMessage(data);
      setTextMessage("");
      fetchEventAndMessage();
      fetchCurrentMessage();
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      fetchEventAndMessage();
    }, 1000);

    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    fetchCurrentMessage();
  }, [event, messageList]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  }, [currentMessage]);

  return (
    <div className="row">
      <div className="col-md-4">
        <ul
          className="list-group"
          style={{ maxHeight: "600px", overflowY: "auto" }}
        >
          {eventList.map((e) => (
            <li
              key={e?.MaSuKien}
              className="list-group-item d-flex align-items-center"
              style={{
                cursor: "pointer",
                backgroundColor:
                  e?.MaSuKien === event?.MaSuKien
                    ? color.lightPrimary
                    : "white",
              }}
              onClick={() => setEvent(e)}
            >
              <div
                className="me-3"
                style={{
                  backgroundImage: `url(${e.HinhAnh})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                }}
              ></div>
              <div>
                <h6 className="mb-0 text-truncate">{e.TenSuKien}</h6>
                <small className="text-muted text-truncate">{e.TenTC}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-8">
        <div
          className="border rounded p-3 mb-3"
          style={{ height: "400px", overflowY: "auto" }}
          ref={messageEndRef}
        >
          {currentMessage.map((message) => (
            <>
              <div className="d-flex align-items-center my-3">
                <hr style={{ flexGrow: 1, borderTop: "1px solid gray" }} />
                <span
                  style={{
                    color: "gray",
                    fontSize: "0.9rem",
                    margin: "0 10px",
                    backgroundColor: "white",
                    padding: "0 5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {message.date}
                </span>
                <hr style={{ flexGrow: 1, borderTop: "1px solid gray" }} />
              </div>

              {message.mess.map((mess) => (
                <div
                  key={mess.MaSo}
                  className={`d-flex ${
                    mess.isSender ? "justify-content-end" : ""
                  } mb-2`}
                >
                  <div style={{ maxWidth: "70%" }}>
                    <h6 style={{ fontSize: "0.6rem" }}>{mess.TenNguoiGui}</h6>
                    <div
                      className={`p-2 rounded`}
                      style={{
                        backgroundColor: mess.isSender
                          ? color.primary
                          : "#EDEDED",
                        color: mess.isSender ? "white" : "black",
                        fontSize: "1rem",
                        fontWeight: "bold",
                      }}
                    >
                      {mess.NoiDung}
                      <div className="text-end">
                        <small
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: "lighter",
                          }}
                        >
                          {mess.ThoiGian}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ))}
        </div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tin nhắn..."
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button
            className="btn"
            style={{ backgroundColor: color.primary }}
            onClick={() => {
              sendMessage();
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatEventPage;
