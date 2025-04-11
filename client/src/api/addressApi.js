import { addValuesToDB, getValuesFromDB } from "./api";

class AddressApi {
  static async addAddress(data) {
    const addressData = {
      SoNha: data.SoNha,
      TenDuong: data.TenDuong,
      KhuVuc: data.KhuVuc,
      MaPhuongXa: parseInt(data.MaPhuongXa, 10),
      GhiChu: "Khong co",
    };

    return await addValuesToDB("addresses", JSON.stringify(addressData));
  }

  static async getAddressById(id) {
    const address = await getValuesFromDB(`addresses/${id}`);
    return address[0];
  }

  static async getTinhThanhFromAddressId(id) {
    const address = await getValuesFromDB(`addresses/${id}`);
    const phuongXa = await getValuesFromDB(`wards/${address[0].MaPhuongXa}`);
    const quanHuyen = await getValuesFromDB(
      `districts/${phuongXa[0].MaQuanHuyen}`
    );
    return quanHuyen[0].MaTinhThanh;
  }
}

export default AddressApi;
