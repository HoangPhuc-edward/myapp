import { addValuesToDB, getValuesFromDB } from "./api";

class EventApi {
  static async getAllEvents() {
    return await getValuesFromDB("events");
  }

  static async getEventById(id) {
    return await getValuesFromDB(`events/${id}`);
  }

  static async getEventDetailById(id) {
    const event = await getValuesFromDB(`event/${id}`);
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
    };

    return await addValuesToDB("events", JSON.stringify(eventData));
  }
}

export default EventApi;
