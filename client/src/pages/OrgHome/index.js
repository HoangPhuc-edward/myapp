import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EventApi from "../../api/eventApi";
import AddressForm from "../../components/AddressForm";
import AddressApi from "../../api/addressApi";
import { useParams } from "react-router-dom";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";
import LocationApi from "../../api/locationApi";
import { formatAddress } from "../../utils/format";
import OrgApi from "../../api/orgApi";

const OrgHome = () => {
  const [content, setContent] = useState("Home");
  const [events, setEvents] = useState([]);
  const { isShowing, toggle } = useModal();
  const { id } = useParams();
  const [eventId, setEventId] = useState(null);
  const [eventDetail, setEventDetail] = useState(null);

  useEffect(() => {
    if (eventId) {
      EventApi.getEventById(eventId).then((data) => {
        setEventDetail(data[0]);
      });
    }
  }, [eventId]);

  const handleNavClick = async (section) => {
    setContent(section);
  };

  const handleEventClick = (id) => {
    setEventId(id);
    handleNavClick("EventDetail");
  };

  useEffect(() => {
    EventApi.getAllEvents().then((data) => {
      data.map(async (event) => {
        const tochuc = await OrgApi.getOrgById(event.MaToChuc);
        const address = await AddressApi.getAddressById(1);
        event.ToChuc = tochuc.Ten;
        console.log(tochuc);

        console.log(address);
        // event.DiaDiem = formatAddress(
        //   LocationApi.getLocationByWardId(address.MaPhuongXa)
        // );
      });
      setEvents(data);
    });
  }, []);

  const [formData, setFormData] = useState({
    TenSuKien: "",
    MieuTa: "",

    NgayBatDau: "",
    NgayKetThuc: "",
    SoLuongToiDa: 0,

    SoNha: "",
    TenDuong: "",
    KhuVuc: "",
    MaPhuongXa: "",
    MaDiaDiem: "",
    MaToChuc: "",

    district: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addressId = await AddressApi.addAddress(formData);
    formData.MaDiaDiem = addressId;
    formData.MaToChuc = id;
    const responeId = await EventApi.addEvent(formData);
    if (responeId) {
      alert(`Thêm sự kiện thành công: ${responeId}`);
    } else {
      alert("Lỗi thêm sự kiện!");
      return;
    }
  };

  const testLocation = async () => {
    const tentochuc = await OrgApi.getOrgById(1);
    console.log(tentochuc.Ten);
  };

  return (
    <div className="container mt-5">
      {/* <Modal isShowing={isShowing} hide={toggle} /> */}
      <div className="row">
        <div className="col-md-4">
          <div className="list-group">
            <div className="box p-3 mb-3">
              <h3 className="text-center">KINDLINK</h3>
              <p className="text-center">Kết nối yêu thương</p>
            </div>

            <div className="box p-3 mb-3">
              <p className="">Xin chào, người dùng</p>
            </div>
            <button
              type="button"
              className={`list-group-item list-group-item-action ${
                content === "Home" ? "active" : ""
              }`}
              onClick={() => handleNavClick("Home")}
              style={{ cursor: "pointer" }}
            >
              Trang chủ
            </button>
            <button
              type="button"
              className={`list-group-item list-group-item-action ${
                content === "About" ? "active" : ""
              }`}
              onClick={() => handleNavClick("About")}
              style={{ cursor: "pointer" }}
            >
              Thông tin tổ chức
            </button>
            <button
              type="button"
              className={`list-group-item list-group-item-action ${
                content === "Services" ? "active" : ""
              }`}
              onClick={() => handleNavClick("Services")}
              style={{ cursor: "pointer" }}
            >
              Cài đặt
            </button>
            <button
              type="button"
              className={`list-group-item list-group-item-action ${
                content === "Contact" ? "active" : ""
              }`}
              onClick={() => handleNavClick("Contact")}
              style={{ cursor: "pointer" }}
            >
              Trợ giúp
            </button>
            <button
              type="button"
              className={`list-group-item list-group-item-action ${
                content === "AddEvent" ? "active" : ""
              }`}
              onClick={() => handleNavClick("AddEvent")}
              style={{ cursor: "pointer" }}
            >
              Thêm sự kiện
            </button>
            <button className="button-default" onClick={testLocation}>
              Show modal
            </button>
          </div>
        </div>
        <div className="col-md-8">
          <div className="content">
            {content === "Home" && (
              <div>
                <h1 className="title">TỔNG HỢP SỰ KIỆN</h1>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm sự kiện..."
                    onChange={(e) => {
                      const searchTerm = e.target.value.toLowerCase();
                      EventApi.getAllEvents().then((data) => {
                        const filteredEvents = data.filter((event) =>
                          event.TenSuKien.toLowerCase().includes(searchTerm)
                        );
                        setEvents(filteredEvents);
                      });
                    }}
                  />
                </div>
                {events.map((event) => (
                  <div
                    key={event.MaSuKien}
                    className="card mb-3"
                    onClick={() => handleEventClick(event.MaSuKien)}
                  >
                    <div
                      className="card-body row"
                      // style={{ maxHeight: "60vh" }}
                    >
                      <div className="col-md-6 col-12">
                        <h4 className="card-title">{event.TenSuKien}</h4>
                        <p
                          className="card-text text-truncate"
                          style={{ maxHeight: "3em", overflow: "hidden" }}
                        >
                          {event.MieuTa}
                        </p>
                        <p className="card-text">{event.ToChuc}</p>
                        <p className="card-text">{event.DiaDiem}</p>

                        <p className="card-text">
                          <small className="text-muted">
                            Ngày bắt đầu: {event.NgayBatDau.split("T")[0]}
                          </small>
                          <br />
                          <small className="text-muted">
                            Ngày kết thúc: {event.NgayKetThuc.split("T")[0]}
                          </small>
                          <br />
                          <small className="text-muted">
                            Số lượng: {event.SoLuongToiDa}
                          </small>
                        </p>
                      </div>
                      <div className="col-md-6 col-12">
                        <img
                          src="https://images.unsplash.com/photo-1739286955038-a4e5ce4f9462?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D"
                          alt={event.TenSuKien}
                          style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "30vh",
                            borderRadius: "10px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {content === "About" && <div>About Content</div>}
            {content === "Services" && <div>Services Content</div>}
            {content === "Contact" && <div>Contact Content</div>}
            {content === "AddEvent" && (
              <div>
                <div className="container mt-5">
                  <div className="row justify-content-center">
                    <div className="col-md-8">
                      <div className="card">
                        <div className="card-header">
                          <h2 className="text-center">Thông tin sự kiện</h2>
                        </div>
                        <div className="card-body">
                          <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                              <label className="form-label">Tên sự kiện</label>
                              <input
                                type="text"
                                className="form-control"
                                name="TenSuKien"
                                value={formData.TenSuKien}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Miêu tả sự kiện
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="MieuTa"
                                value={formData.MieuTa}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Ngày Bắt Đầu</label>
                              <input
                                type="datetime-local"
                                className="form-control"
                                name="NgayBatDau"
                                value={formData.NgayBatDau}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Ngày Kết Thúc
                              </label>
                              <input
                                type="datetime-local"
                                className="form-control"
                                name="NgayKetThuc"
                                value={formData.NgayKetThuc}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Số lượng tối đa
                              </label>
                              <input
                                type="int"
                                className="form-control"
                                name="SoLuongToiDa"
                                value={formData.SoLuongToiDa}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <AddressForm
                              formData={formData}
                              handleChange={handleChange}
                            />
                            <button
                              type="submit"
                              className="btn btn-primary w-100"
                            >
                              Lưu thông tin
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {content === "EventDetail" && (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{eventDetail?.TenSuKien}</h5>
                  <p className="card-text">{eventDetail?.MieuTa}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Ngày bắt đầu: {eventDetail?.NgayBatDau.split("T")[0]}
                    </small>
                    <br />
                    <small className="text-muted">
                      Ngày kết thúc: {eventDetail?.NgayKetThuc.split("T")[0]}
                    </small>
                    <br />
                    <small className="text-muted">
                      Số lượng: {eventDetail?.SoLuongToiDa}
                    </small>
                  </p>
                  <img
                    src="https://images.unsplash.com/photo-1739361133037-77be66a4ea6a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt={eventDetail?.TenSuKien}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgHome;
