import { useEffect, useState } from "react";
import { getUser } from "../../firebase/auth";
import OrgApi from "../../api/orgApi";
import AnalyzeOrg from "../../api/analyzeOrg";
import EventLineChart from "../EventLineChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faChartBar,
  faUsers,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import font from "../../assets/font";

const AnalyzeOrgPage = () => {
  const [org, setOrg] = useState(null);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalVolunteers, setTotalVolunteers] = useState(0);
  const [totalEventMonth, setTotalEventMonth] = useState(0);
  const [totalVolunteerMonth, setTotalVolunteerMonth] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [currentChartIndex, setCurrentChartIndex] = useState(0);
  const [totalChartData, setTotalChartData] = useState([]);

  useEffect(() => {
    const fetchOrg = async () => {
      const user = await getUser();
      if (!user) return;
      const orgId = await OrgApi.getOrgIdByEmail(user.email);
      if (!orgId) return;
      const myOrg = await OrgApi.getOrgById(orgId);
      setOrg(myOrg);
    };

    fetchOrg();
  }, []);

  useEffect(() => {
    const fetchTotal = async () => {
      if (!org) return;
      const total = await AnalyzeOrg.getToTalNumberOfEvents(org.MaSo);
      setTotalEvents(total);

      const totalVol = await AnalyzeOrg.getTotalNumberOfVolunteers(org.MaSo);
      setTotalVolunteers(totalVol);

      const totalEventMonth = await AnalyzeOrg.getNumberOfEventsByMonth(
        org.MaSo,
        new Date().getMonth()
      );
      setTotalEventMonth(totalEventMonth);

      const totalVolunteerMonth = await AnalyzeOrg.getNumberOfVolunteersByMonth(
        org.MaSo,
        new Date().getMonth()
      );
      setTotalVolunteerMonth(totalVolunteerMonth);

      const value = await AnalyzeOrg.getChartData(org.MaSo);
      setChartData(value);

      const totalData = await AnalyzeOrg.getNumberOfVolunteerChartData(
        org.MaSo
      );
      setTotalChartData(totalData);
    };

    fetchTotal();
  }, [org]);

  const handleNext = () => {
    setCurrentChartIndex((prevIndex) => (prevIndex + 1) % chartData.length);
  };

  const handlePrevious = () => {
    setCurrentChartIndex(
      (prevIndex) => (prevIndex - 1 + chartData.length) % chartData.length
    );
  };

  return (
    <div className="container mt-5" style={{ minHeight: "180vh" }}>
      <h1
        className="title my-3"
        style={{ fontWeight: "bold", fontFamily: font.monsterrat }}
      >
        THỐNG KÊ TỔ CHỨC
      </h1>
      <div className="row text-center">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title">
                <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                Số sự kiện đã tạo
              </h6>
              <p className="card-text display-6">{totalEvents}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title">
                <FontAwesomeIcon icon={faUsers} className="me-2" />
                Số tình nguyện viên đã tham gia
              </h6>
              <p className="card-text display-6">{totalVolunteers}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title">
                <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                Số sự kiện tháng này
              </h6>
              <p className="card-text display-6">{totalEventMonth}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title">
                <FontAwesomeIcon icon={faUsers} className="me-2" />
                Số tình nguyện viên tháng này
              </h6>
              <p className="card-text display-6">{totalVolunteerMonth}</p>
            </div>
          </div>
        </div>
      </div>

      <h4 className="text-center mt-5 mb-3">Biểu đồ tổng hợp</h4>
      <div>
        <EventLineChart eventData={totalChartData} isTotal={true} />
      </div>

      <h4 className="text-center mt-5 mb-3">Biểu đồ từng sự kiện</h4>
      {chartData.length > 0 && (
        <div className="text-center">
          <h5>{chartData[currentChartIndex].TenSuKien}</h5>
          <EventLineChart eventData={chartData[currentChartIndex].DuLieu} />
          <div className="d-flex justify-content-center align-items-center mt-3">
            <button
              className="btn btn-outline-primary me-3"
              onClick={handlePrevious}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <span>
              {currentChartIndex + 1}/{chartData.length}
            </span>
            <button
              className="btn btn-outline-primary ms-3"
              onClick={handleNext}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzeOrgPage;
