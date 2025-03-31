import { formatDateTime } from "../utils/format";
import EnrollApi from "./enrollApi";
import EventApi from "./eventApi";

class AnalyzeOrg {
  static async getToTalNumberOfEvents(orgId) {
    const events = await EventApi.getEventByOrgId(orgId);
    return events.length;
  }

  static async getTotalNumberOfVolunteers(orgId) {
    const events = await EventApi.getEventByOrgId(orgId);
    let total = 0;
    for (let i = 0; i < events.length; i++) {
      const count = await EnrollApi.countEnrolls(events[i].MaSuKien);
      total += count;
    }
    return total;
  }

  static async getNumberOfEventsByMonth(orgId, month) {
    const year = new Date().getFullYear();
    const events = await EventApi.getEventByOrgId(orgId);
    let total = 0;
    for (let i = 0; i < events.length; i++) {
      const monthPost = new Date(events[i].NgayDang).getMonth();
      const yearPost = new Date(events[i].NgayDang).getFullYear();
      if (monthPost === month && yearPost == year) total++;
    }
    return total;
  }

  static async getNumberOfVolunteersByMonth(orgId, month) {
    const year = new Date().getFullYear();
    const events = await EventApi.getEventByOrgId(orgId);
    let total = 0;
    for (let i = 0; i < events.length; i++) {
      const enrolls = await EnrollApi.getEnrollsByMSK(events[i].MaSuKien);
      for (let j = 0; j < enrolls.length; j++) {
        const monthEnroll = new Date(enrolls[j].NgayDangKy).getMonth();
        const yearEnroll = new Date(enrolls[j].NgayDangKy).getFullYear();
        if (monthEnroll === month && yearEnroll === year) total++;
      }
    }
    return total;
  }

  static async getChartData(orgId) {
    const events = await EventApi.getEventByOrgId(orgId);

    const chartData = [];
    for (let i = 0; i < events.length; i++) {
      const data = {};

      data.TenSuKien = events[i].TenSuKien;
      data.DuLieu = [];

      const enrolls = await EnrollApi.getEnrollsByMSK(events[i].MaSuKien);
      data.DuLieu.push({ date: formatDateTime(events[i].NgayDang), people: 0 });

      const enrollCount = enrolls.reduce((acc, enroll) => {
        const date = enroll.NgayDangKy;
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const enrollData = Object.keys(enrollCount).map((date) => ({
        date,
        count: enrollCount[date],
      }));

      enrollData.sort((a, b) => new Date(a.date) - new Date(b.date));

      let total = 0;
      enrollData.forEach((item) => {
        total += item.count;
        data.DuLieu.push({ date: formatDateTime(item.date), people: total });
      });

      chartData.push(data);
    }
    return chartData;
  }
}

export default AnalyzeOrg;
