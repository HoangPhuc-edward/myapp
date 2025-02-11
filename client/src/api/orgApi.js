import { addValuesToDB } from "./api";

class OrgApi {
  static async addOrg(data) {
    const orgData = {
      Ten: data.Ten,
      MieuTa: data.MieuTa,
      SDT: data.SDT,
      MaDiaChi: parseInt(data.MaDiaChi, 10),
      MaTaiKhoan: parseInt(data.MaTaiKhoan, 10),
    };

    return await addValuesToDB("orgs", JSON.stringify(orgData));
  }
}

export default OrgApi;
