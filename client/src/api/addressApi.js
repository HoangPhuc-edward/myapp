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
}

export default AddressApi;
