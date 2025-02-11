import { addValuesToDB } from "./api";

class VolunteerApi {
  static async addVolunteer(data) {
    const volunteerData = {
      HoTen: data.HoTen,
      NgaySinh: data.NgaySinh,
      SDT: data.SDT,
      GioiTinh: data.GioiTinh,
      MaDiaChi: parseInt(data.MaDiaChi, 10),
      MaTaiKhoan: parseInt(data.MaTaiKhoan, 10),
    };

    return await addValuesToDB("volunteers", JSON.stringify(volunteerData));
  }
}

export default VolunteerApi;
