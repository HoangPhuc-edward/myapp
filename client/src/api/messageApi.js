import { getCurrentDateTime } from "../utils/format";
import { getValuesFromDB, addValuesToDB } from "./api";
import EnrollApi from "./enrollApi";

class MessageApi {
  static async getMessageByMaTNV(id) {
    return await getValuesFromDB(`messages/search/MaTNV/${id}`);
  }

  static async addVolMessage(data) {
    const messageData = {
      NgayGio: getCurrentDateTime(),
      MaTNV: parseInt(data.MaTNV, 10),
      NoiDung: data.NoiDung,
      MaToChuc: parseInt(data.MaToChuc, 10),
    };

    return await addValuesToDB(
      "messages/volunteer",
      JSON.stringify(messageData)
    );
  }

  static async getMessageByMaTC(id) {
    return await getValuesFromDB(`messages/search/MaToChuc/${id}`);
  }

  static async addOrgMessage(data) {
    const messageData = {
      NgayGio: getCurrentDateTime(),
      MaToChuc: parseInt(data.MaToChuc, 10),
      NoiDung: data.NoiDung,
      MaTNV: parseInt(data.MaTNV, 10),
    };

    return await addValuesToDB("messages/org", JSON.stringify(messageData));
  }

  static async sendCancelMessage(event) {
    const enrollList = await EnrollApi.getEnrollsByMSK(event.MaSuKien);
    let volunteerList = [];
    enrollList.forEach((enroll) => {
      if (!volunteerList.includes(enroll.MaTNV))
        volunteerList.push(enroll.MaTNV);
    });

    volunteerList.forEach(async (volunteer) => {
      const messageData = {
        NgayGio: getCurrentDateTime(),
        MaTNV: volunteer,
        NoiDung: `Sự kiện ${event.TenSuKien} đã bị hủy bởi tổ chức, xin lỗi vì sự bất tiện này.`,
        MaToChuc: 11,
      };

      await addValuesToDB("messages/org", JSON.stringify(messageData));
    });
  }
}

export default MessageApi;
