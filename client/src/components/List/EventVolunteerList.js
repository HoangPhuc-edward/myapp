import { useEffect, useState } from "react";
import EnrollApi from "../../api/enrollApi";
import VolunteerApi from "../../api/volunteerApi";
import { list } from "firebase/storage";
import color from "../../assets/color";
import font from "../../assets/font";
import { getUser } from "../../firebase/auth";
import OrgApi from "../../api/orgApi";
import MessageApi from "../../api/messageApi";

const EventVolunteerList = ({ event }) => {
  const [volList, setVolList] = useState([]);

  const fetchVolunteerList = async () => {
    const enrolls = await EnrollApi.getEnrollsByMSK(event.MaSuKien);
    const list = [];
    for (let i = 0; i < enrolls.length; i++) {
      const volunteer = await VolunteerApi.getVolById(enrolls[i].MaTNV);
      list.push(volunteer);
    }
    setVolList(list);
  };

  const sendMessageToVolunteer = async (volunteer) => {
    const user = await getUser();

    if (user === null) return;
    const orgId = await OrgApi.getOrgIdByEmail(user.email);

    const data = {
      MaToChuc: orgId,
      NoiDung: "Xin chào",
      MaTNV: volunteer.MaSo,
    };
    await MessageApi.addOrgMessage(data);
    alert("Gửi tin nhắn thành công!");
  };

  useEffect(() => {
    fetchVolunteerList();
  }, []);

  return (
    <div
      className="container"
      style={{
        maxHeight: "500px",
        overflowY: "auto",
      }}
    >
      {volList.map((vol, index) => (
        <div
          className="row align-items-center my-3 p-3 shadow-sm rounded"
          key={index}
          style={{ backgroundColor: color.veryLighGray }}
        >
          <div
            className="col-md-1 d-flex justify-content-center align-items-center"
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "50%",
              backgroundColor: "white",
              margin: "0.5rem",
            }}
          >
            <strong>{index + 1}</strong>
          </div>
          <div className="col-md-6">
            <h6 className="text-truncate mb-1">{vol.HoTen}</h6>
            <p className="text-muted mb-0">{vol.Email}</p>
          </div>
          <div className="col-md-4 text-end">
            <button
              onClick={() => sendMessageToVolunteer(vol)}
              className="btn btn-primary btn-sm"
              style={{
                backgroundColor: color.primary,
                borderRadius: "1rem",
                padding: "0.8rem 1.2rem",
                color: "white",
                border: "none",
                fontWeight: "800",
                fontFamily: font.monsterrat,
              }}
            >
              Liên hệ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventVolunteerList;
