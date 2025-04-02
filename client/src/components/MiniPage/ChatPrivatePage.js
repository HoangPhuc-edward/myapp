import { useEffect, useRef, useState } from "react";
import VolunteerApi from "../../api/volunteerApi";
import { getUser } from "../../firebase/auth";
import OrgApi from "../../api/orgApi";
import MessageApi from "../../api/messageApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import font from "../../assets/font";
import color from "../../assets/color";
import { formatDateTime } from "../../utils/format";

const ChatPrivatePage = ({ type }) => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [guestList, setGuestList] = useState([]);
  const [guess, setGuess] = useState(null);
  const [currentMessage, setCurrentMessage] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const [currentTag, setCurrentTag] = useState("ToChuc");

  const messageEndRef = useRef(null);

  const fetchUser = async () => {
    const myUser = await getUser();
    if (!myUser) return;

    if (type === "volunteer") {
      const vol = await VolunteerApi.getVolByEmail(myUser.email);
      setUser(vol);
      setCurrentTag("TNV");
    } else if (type === "org") {
      const org = await OrgApi.getOrgByEmail(myUser.email);
      setUser(org);
      setCurrentTag("ToChuc");
    }
  };

  const fetchMessageAndGuess = async () => {
    if (!user) return;
    if (type === "volunteer") {
      const myMessages = await MessageApi.getMessageByMaTNV(user.MaSo);
      setMessages(myMessages.private);

      const list = [];

      for (let i = 0; i < myMessages.private.length; i++) {
        if (
          !list.some((item) => item.MaSo === myMessages.private[i].MaToChuc)
        ) {
          const org = await OrgApi.getOrgById(myMessages.private[i].MaToChuc);
          list.push(org);
        }
      }
      setGuestList(list);
    } else {
      const myMessages = await MessageApi.getMessageByMaTC(user.MaSo);
      setMessages(myMessages.private);

      const list = [];
      for (let i = 0; i < myMessages.private.length; i++) {
        if (!list.some((item) => item.MaSo === myMessages.private[i].MaTNV)) {
          const vol = await VolunteerApi.getVolById(
            myMessages.private[i].MaTNV
          );
          list.push({ ...vol, Ten: vol.HoTen });
        }
      }

      setGuestList(list);
    }
  };

  const fetchCurrentMessage = async () => {
    if (!guess) return;
    let myMessages = [];

    if (type === "volunteer") {
      myMessages = messages.filter((message) => message.MaToChuc === guess);
    } else {
      myMessages = messages.filter((message) => message.MaTNV === guess);
    }
    myMessages.sort((a, b) => new Date(a.NgayGio) - new Date(b.NgayGio));

    let currentList = [];
    let groupedMessages = [];
    let currentDate = "";

    myMessages.forEach((message) => {
      const ngayThang = formatDateTime(message.NgayGio);
      const gioPhut = message.NgayGio.split("T")[1].slice(0, 5);

      if (ngayThang !== currentDate) {
        if (currentList.length > 0) {
          groupedMessages.push({ date: currentDate, mess: currentList });
        }
        currentDate = ngayThang;
        currentList = [];
      }

      currentList.push({
        NoiDung: message.NoiDung,
        ThoiGian: gioPhut,
        NguoiGui: message.NguoiGui,
      });
    });

    if (currentList.length > 0) {
      groupedMessages.push({ date: currentDate, mess: currentList });
    }

    setCurrentMessage(groupedMessages);
  };

  const sendMessage = async () => {
    if (!textMessage) return;
    if (type === "volunteer") {
      const data = {
        MaTNV: user.MaSo,
        NoiDung: textMessage,
        MaToChuc: guess,
      };
      await MessageApi.addVolMessage(data);
      setTextMessage("");
      fetchMessageAndGuess();
      fetchCurrentMessage();
    } else {
      const data = {
        MaToChuc: user.MaSo,
        NoiDung: textMessage,
        MaTNV: guess,
      };
      await MessageApi.addOrgMessage(data);
      setTextMessage("");
      fetchMessageAndGuess();
      fetchCurrentMessage();
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      fetchMessageAndGuess();
    }, 1000);

    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    fetchCurrentMessage();
  }, [guess, messages]);

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
          {guestList.map((guest) => (
            <li
              key={guest.MaSo}
              className="list-group-item d-flex align-items-center"
              style={{
                cursor: "pointer",
                backgroundColor:
                  guess === guest.MaSo ? color.lightPrimary : "white",
              }}
              onClick={() => setGuess(guest.MaSo)}
            >
              <div
                className="me-3"
                style={{
                  backgroundImage: `url(${guest.HinhAnh})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                }}
              ></div>
              <div>
                <h6 className="mb-0 text-truncate">{guest.Ten}</h6>
                <small className="text-muted text-truncate">
                  {guest.Email}
                </small>
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
                    mess.NguoiGui === currentTag ? "justify-content-end" : ""
                  } mb-2`}
                >
                  <div
                    className={`p-2 rounded`}
                    style={{
                      maxWidth: "70%",
                      backgroundColor:
                        mess.NguoiGui === currentTag
                          ? color.primary
                          : "#EDEDED",
                      color: mess.NguoiGui === currentTag ? "white" : "black",
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

export default ChatPrivatePage;
