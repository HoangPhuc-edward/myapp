import { addValuesToDB, deleteValuesFromDB, getValuesFromDB } from "./api";

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

  static async deleteEnroll(id) {
    return await deleteValuesFromDB(`enrolls/${id}`);
  }

  static async findEnrolled(MaSuKien, MaTNV) {
    const enrolls = await getValuesFromDB(`enrolls/msk/${MaSuKien}`);
    console.log(enrolls);
    return enrolls.find((enroll) => enroll.MaTNV === MaTNV);
  }
}

export default EnrollApi;
