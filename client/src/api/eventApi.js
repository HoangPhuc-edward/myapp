import { getImageURL } from "../firebase/storage";
import { addValuesToDB, getValuesFromDB, updateValuesToDB } from "./api";
import EnrollApi from "./enrollApi";

class EventApi {
  static async getAllEvents() {
    const events = await getValuesFromDB("events");
    const filteredEvents = events.filter((event) => event.TrangThai === 1);
    return filteredEvents;
  }

  static async getEventById(id) {
    const event = await getValuesFromDB(`events/${id}`);
    if (event[0].TrangThai === 0) return null;
    return event;
  }

  static async getEventDetailById(id) {
    const event = await getValuesFromDB(`events/${id}`);
    if (event[0].TrangThai === 0) return null;
    return event;
  }

  static async addEvent(data) {
    const eventData = {
      MaToChuc: parseInt(data.MaToChuc, 10),
      TenSuKien: data.TenSuKien,
      MieuTa: data.MieuTa,
      NgayBatDau: data.NgayBatDau,
      NgayKetThuc: data.NgayKetThuc,
      NgayDang: new Date().toISOString().slice(0, -1),
      SoLuongToiDa: parseInt(data.SoLuongToiDa, 10),
      MaDiaDiem: parseInt(data.MaDiaDiem, 10),
      Quy: data.Quy || 0,
      HinhAnh: data.HinhAnh,
      SoNha: data.SoNha || null,
      TenDuong: data.TenDuong || null,
      KhuVuc: data.KhuVuc || null,
      MaPhuongXa: data.MaPhuongXa || null,
    };

    return await addValuesToDB("events", JSON.stringify(eventData));
  }

  static async getEventByVolunteerId(id) {
    const enrollments = await EnrollApi.getEnrollByVolunteerId(id);
    const events = [];
    for (let i = 0; i < enrollments.length; i++) {
      const event = await getValuesFromDB(`events/${enrollments[i].MaSuKien}`);
      if (event[0].TrangThai === 1) events.push(event[0]);
    }
    return events;
  }

  static async getEventByOrgId(id) {
    const events = await getValuesFromDB(`events/search/MaToChuc/${id}`);
    const filteredEvents = events.filter((event) => event.TrangThai === 1);
    return filteredEvents;
  }

  static async updateEvent(data) {
    const eventData = {
      MaSuKien: parseInt(data.MaSuKien, 10),
      MaToChuc: parseInt(data.MaToChuc, 10),
      TenSuKien: data.TenSuKien,
      MieuTa: data.MieuTa,
      NgayBatDau: data.NgayBatDau,
      NgayKetThuc: data.NgayKetThuc,
      NgayDang: new Date().toISOString().slice(0, -1),
      SoLuongToiDa: parseInt(data.SoLuongToiDa, 10),
      MaDiaDiem: parseInt(data.MaDiaDiem, 10),
      HinhAnh: data.HinhAnh,
      Quy: data.Quy || 0,
      TrangThai: data.TrangThai,
      SoNha: data.SoNha || null,
      TenDuong: data.TenDuong || null,
      KhuVuc: data.KhuVuc || null,
      MaPhuongXa: data.MaPhuongXa || null,
    };

    return await updateValuesToDB("events", JSON.stringify(eventData));
  }

  static async hideEvent(id) {
    return await getValuesFromDB(`events/hide/${id}`);
  }

  static async getTongTienByEventId(id) {
    const money = await getValuesFromDB(`events/tongtien/${id}`);
    return money;
  }

  static async getMoneyLeftByEventId(id) {
    const moneyLeft = await getValuesFromDB(`events/conlai/${id}`);
    return moneyLeft;
  }
}

export default EventApi;
