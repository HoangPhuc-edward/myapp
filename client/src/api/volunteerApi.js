import { getImageURL } from "../firebase/storage";
import { addValuesToDB, getValuesFromDB } from "./api";

class VolunteerApi {
  static async addVolunteer(data) {
    const volunteerData = {
      HoTen: data.HoTen,
      NgaySinh: data.NgaySinh,
      SDT: data.SDT,
      GioiTinh: data.GioiTinh,
      MaDiaChi: parseInt(data.MaDiaChi, 10),
      Email: data.Email,
      HinhAnh: data.HinhAnh,
    };

    return await addValuesToDB("volunteers", JSON.stringify(volunteerData));
  }

  static async getVolById(id) {
    const vol = await getValuesFromDB(`volunteers/${id}`);
    let myVol = vol[0];
    return myVol;
  }

  static async getVolIdByEmail(email) {
    return getValuesFromDB("volunteers")
      .then((vol) => {
        const volFind = vol.find((vol) => vol.Email === email);
        return volFind.MaSo;
      })
      .catch((error) => {
        console.error("Error:", error);
        return null;
      });
  }
}

export default VolunteerApi;
