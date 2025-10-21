import { getImageURL } from "../firebase/storage";
import { addValuesToDB, getValuesFromDB } from "./api";

class OrgApi {
  static async addOrg(data) {
    const orgData = {
      Ten: data.Ten,
      MieuTa: data.MieuTa,
      SDT: data.SDT,
      MaDiaChi: parseInt(data.MaDiaChi, 10) || 1,
      Email: data.Email,
      HinhAnh: data.HinhAnh,
      SoNha: data.SoNha || "Không",
      TenDuong: data.TenDuong || "Không",
      KhuVuc: data.KhuVuc || "Không",
      MaPhuongXa: data.MaPhuongXa || "Không",
    };

    return await addValuesToDB("orgs", JSON.stringify(orgData));
  }

  static async getOrgById(id) {
    const org = await getValuesFromDB(`orgs/${id}`);
    let newOrg = org[0];
    return newOrg;
  }

  static async getOrgIdByEmail(email) {
    return await getValuesFromDB("orgs")
      .then((org) => {
        const orgFind = org.find((org) => {
          return org.Email === email;
        });

        return orgFind ? orgFind.MaSo : null;
      })
      .catch((error) => {
        console.error("Error:", error);
        return null;
      });
  }

  static async getOrgByEmail(email) {
    const org = await getValuesFromDB(`orgs/search/Email/'${email}'`);
    return org[0];
  }
}

export default OrgApi;
