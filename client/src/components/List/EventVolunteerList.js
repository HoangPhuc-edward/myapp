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
      <table className="table table-striped table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th style={{ width: "4rem", textAlign: "center" }}>#</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Giới tính</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {volList.map((vol, index) => (
            <tr key={index} style={{ backgroundColor: color.veryLighGray }}>
              <td className="text-center">
                <strong>{index + 1}</strong>
              </td>
              <td>{vol.HoTen}</td>
              <td>{vol.Email}</td>
              <td>{vol.SDT}</td>
              <td>{vol.GioiTinh}</td>
              <td>
                <button
                  onClick={() => sendMessageToVolunteer(vol)}
                  className="btn btn-primary btn-sm"
                  style={{
                    backgroundColor: color.primary,
                    borderRadius: "1rem",
                    padding: "0.6rem 1rem",
                    color: "white",
                    border: "none",
                    fontWeight: "800",
                    fontFamily: font.monsterrat,
                  }}
                >
                  Liên hệ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventVolunteerList;
