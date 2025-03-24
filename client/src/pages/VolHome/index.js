import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EventApi from "../../api/eventApi";
import AddressApi from "../../api/addressApi";
import { useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import EventModal from "../../components/EventModal";
import LocationApi from "../../api/locationApi";
import {
  formatAddress,
  formatDateTime,
  formatFullAddress,
  formatProvince,
} from "../../utils/format";
import OrgApi from "../../api/orgApi";
import "../../assets/css/Text.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faGear,
  faHome,
  faIdCard,
  faLock,
  faMailBulk,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import color from "../../assets/color";
import font from "../../assets/font";
import "../../assets/css/Sidebar.css";
import VolunteerApi from "../../api/volunteerApi";
import EnrollApi from "../../api/enrollApi";
import { getUser, logout } from "../../firebase/auth";
import EventHomePage from "../../components/EventHomePage";
import AppFooter from "../../components/AppFooter";
import VolAboutPage from "../../components/VolAboutPage";

const SideBarElement = ({ content, icon, name, showName, handleClick }) => {
  return (
    <button
      type="button"
      className={`sidebar-item ${content === name ? "active" : ""}`}
      onClick={() => handleClick(name)}
      style={{
        cursor: "pointer",
        border: "none",
        borderRadius: "1rem",
        marginTop: "1rem",
      }}
    >
      <FontAwesomeIcon icon={icon} style={{ marginRight: "0.5rem" }} />
      <span className="ms-2">{showName}</span>
    </button>
  );
};

const VolHome = () => {
  const [content, setContent] = useState("Home");
  const [events, setEvents] = useState([]);

  const { isShowing, toggle } = useModal();
  const [eventDetail, setEventDetail] = useState(null);
  const [address, setAddress] = useState(null);
  const [vol, setVol] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const contentList = [
    {
      icon: faHome,
      content: "Home",
      name: "Trang chủ",
    },

    {
      icon: faUser,
      content: "About",
      name: "Thông tin người dùng",
    },
    {
      icon: faBell,
      content: "Events",
      name: "Sự kiện đã tham gia",
    },
    {
      icon: faGear,
      content: "Analytics",
      name: "Thống kê",
    },
  ];

  const enrollEvent = async (event) => {
    const data = {
      NgayDangKy: "2021-12-12",
      MaSuKien: event.MaSuKien,
      MaTNV: vol.MaSo,
    };

    EnrollApi.addEnroll(data)
      .then((res) => {
        alert("Đăng ký sự kiện thành công");
        window.location.reload();
      })
      .catch((err) => {
        alert("Đăng ký sự kiện thất bại");
      });
  };

  const unenrollEvent = async (enroll) => {
    EnrollApi.deleteEnroll(enroll.MaSo)
      .then((res) => {
        alert("Hủy đăng ký sự kiện thành công");
        window.location.reload();
      })
      .catch((err) => {
        alert("Hủy đăng ký sự kiện thất bại");
      });
  };

  const handleNavClick = async (section) => {
    setContent(section);
  };

  const handleEventClick = (id) => {
    setEventDetail(events[id]);
    toggle();
  };

  const fetchUser = async () => {
    const newUser = await getUser();
    if (newUser === null) {
      alert("Bạn cần đăng nhập để sử dụng chức năng này");
      navigate("/login");
    }
    setUser(newUser);
  };

  const fetchVol = async (user) => {
    if (!user) return;

    const my_id = await VolunteerApi.getVolIdByEmail(user.email);
    if (!my_id) {
      alert("Không tìm thấy thông tin tài khoản");
      navigate("/login");
      return;
    }

    const myVol = await VolunteerApi.getVolById(my_id);
    const myAddress = await AddressApi.getAddressById(myVol.MaDiaChi);
    const myLocation = await LocationApi.getLocationByWardId(
      myAddress.MaPhuongXa
    );

    const addressData = {
      SoNha: myAddress.SoNha,
      TenDuong: myAddress.TenDuong,
      KhuVuc: myAddress.KhuVuc,
      province: myLocation.province,
      district: myLocation.district,
      ward: myLocation.ward,
    };

    const address = formatFullAddress(addressData);

    setAddress(address);

    myVol.DiaChi = address;
    setVol(myVol);
  };

  const fetchData = async (searchTerm) => {
    const events = await EventApi.getAllEvents();
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

    setEvents(filteredEvents);
  };

  useEffect(() => {
    fetchUser();
    fetchData("");
  }, []);

  useEffect(() => {
    fetchVol(user);
  }, [user]);

  return (
    <div style={{ position: "relative", minHeight: "150vh" }}>
      <div className="container mt-5">
        <EventModal
          isShowing={isShowing}
          hide={toggle}
          event={eventDetail}
          submit_func={enrollEvent}
          cancel_func={unenrollEvent}
          user={vol}
        />

        <div className="row">
          <div className="col-md-3">
            <div className="list-group">
              <div className="box p-3 mb-3">
                <h1
                  className="text-center"
                  style={{
                    fontWeight: "bold",
                    color: color.primary,
                    fontFamily: font.monsterrat,
                  }}
                >
                  KINDLINK
                </h1>
                <h5
                  className="text-center"
                  style={{
                    fontWeight: "bold",
                    font: font.roboto,
                    color: "black",
                  }}
                >
                  Kết nối yêu thương
                </h5>
              </div>

              <div>
                <div className="d-flex flex-row align-items-center justify-content-center mb-3">
                  <div
                    style={{
                      backgroundImage: `url(${vol?.HinhAnh})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "4rem",
                      height: "4rem",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <div className="ms-3">
                    <h6
                      className="mt-2 text-truncate"
                      style={{ fontWeight: "bold" }}
                    >
                      {vol?.HoTen}
                    </h6>
                    <span className="text-truncate">{vol?.Email}</span>
                  </div>
                </div>

                <div
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="ms-3 p-2 d-flex flex-row justify-content-center align-items-center"
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#EBEBEB",
                    borderRadius: "0.5rem",
                  }}
                >
                  <FontAwesomeIcon icon={faSignOut} />
                  <span className="ms-2">Đăng xuất</span>
                </div>
              </div>

              {contentList.map((item, index) => (
                <SideBarElement
                  key={index}
                  content={content}
                  icon={item.icon}
                  name={item.content}
                  showName={item.name}
                  handleClick={handleNavClick}
                />
              ))}
            </div>
          </div>
          <div className="col-md-9">
            <div className="content">
              {content === "Home" && (
                <EventHomePage
                  events={events}
                  handleEventClick={handleEventClick}
                  fetchData={fetchData}
                />
              )}
              {content === "About" && <VolAboutPage vol={vol} />}
              {content === "Events" && <div>Noti Content</div>}
              {content === "Analytics" && <div>setting Content</div>}
            </div>
          </div>
        </div>
      </div>

      <AppFooter />
    </div>
  );
};

export default VolHome;
