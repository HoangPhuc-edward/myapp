import { addValuesToDB, deleteValuesFromDB, getValuesFromDB } from "./api";

class DonationApi {
  static async addDonation(data) {
    const donationData = {
      MaTNV: parseInt(data.MaTNV, 10),
      MaSuKien: parseInt(data.MaSuKien, 10),
      SoTien: parseInt(data.SoTien, 10),
      NgayQuyenGop: data.NgayQuyenGop,
    };
    return await addValuesToDB("donations", JSON.stringify(donationData));
  }

  static async getDonationsByMaTNV(MaTNV) {
    return await getValuesFromDB(`donations/search/MaTNV/${MaTNV}`);
  }

  static async getDonationsByMaSK(MaSK) {
    return await getValuesFromDB(`donations/search/MaSuKien/${MaSK}`);
  }
}

export default DonationApi;
