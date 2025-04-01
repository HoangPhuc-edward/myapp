import { addValuesToDB, deleteValuesFromDB, getValuesFromDB } from "./api";
import EventApi from "./eventApi";
import OrgApi from "./orgApi";

class EnrollApi {
  static async addEnroll(data) {
    const enrollData = {
      NgayDangKy: data.NgayDangKy,
      MaSuKien: parseInt(data.MaSuKien, 10),
      MaTNV: parseInt(data.MaTNV, 10),
    };
    return await addValuesToDB("enrolls", JSON.stringify(enrollData));
  }

  static async getEnrollById(id) {
    const enroll = await getValuesFromDB(`enrolls/${id}`);
    return enroll[0];
  }

  static async countEnrolls(MaSuKien) {
    const enrolls = await getValuesFromDB(`enrolls/msk/${MaSuKien}`);
    return enrolls.length;
  }

  static async getEnrollsByMSK(MaSuKien) {
    const enrolls = await getValuesFromDB(`enrolls/msk/${MaSuKien}`);
    return enrolls;
  }

  static async deleteEnroll(id) {
    return await deleteValuesFromDB(`enrolls/${id}`);
  }

  static async findEnrolled(MaSuKien, MaTNV) {
    const enrolls = await getValuesFromDB(`enrolls/msk/${MaSuKien}`);
    return enrolls.find((enroll) => enroll.MaTNV === MaTNV);
  }

  static async getEnrollByVolunteerId(id) {
    const enrolls = await getValuesFromDB(`enrolls/search/MaTNV/${id}`);
    return enrolls;
  }

  static async getContactByEnrolls(MaTNV) {
    const enrolls = await getValuesFromDB(`enrolls/search/MaTNV/${MaTNV}`);
    const contacts = [];
    for (let i = 0; i < enrolls.length; i++) {
      const event = await EventApi.getEventById(enrolls[i].MaSuKien);
      const org = await OrgApi.getOrgById(event[0].MaToChuc);
      contacts.push(org);
    }
    return contacts;
  }
}

export default EnrollApi;
