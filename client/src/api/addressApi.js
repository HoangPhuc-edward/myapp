import { addValuesToDB } from "./api";

class AddressApi {
  static async addAddress(data) {
    const addressData = {
      SoNha: data.SoNha,
      TenDuong: data.TenDuong,
      KhuVuc: data.KhuVuc,
      MaPhuongXa: parseInt(data.MaPhuongXa, 10),
      GhiChu: data.GhiChu,
    };

    return await addValuesToDB("addresses", JSON.stringify(addressData));
  }
}

export default AddressApi;
