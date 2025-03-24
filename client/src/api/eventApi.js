import { getImageURL } from "../firebase/storage";
import { addValuesToDB, getValuesFromDB } from "./api";

class EventApi {
  static async getAllEvents() {
    const events = await getValuesFromDB("events");

    return events;
  }

  static async getEventById(id) {
    const event = await getValuesFromDB(`events/${id}`);
    return event;
  }

  static async getEventDetailById(id) {
    const event = await getValuesFromDB(`events/${id}`);
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
      HinhAnh: data.HinhAnh,
    };

    return await addValuesToDB("events", JSON.stringify(eventData));
  }
}

export default EventApi;
