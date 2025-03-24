import { getImageURL } from "../firebase/storage";
import { addValuesToDB, getValuesFromDB } from "./api";

class OrgApi {
  static async addOrg(data) {
    const orgData = {
      Ten: data.Ten,
      MieuTa: data.MieuTa,
      SDT: data.SDT,
      MaDiaChi: parseInt(data.MaDiaChi, 10),
      Email: data.Email,
      HinhAnh: data.HinhAnh,
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
        console.log(org);
        const orgFind = org.find((org) => {
          console.log(org.Email, email);
          return org.Email === email;
        });
        console.log(orgFind);
        return orgFind ? orgFind.MaSo : null;
      })
      .catch((error) => {
        console.error("Error:", error);
        return null;
      });
  }
}

export default OrgApi;
