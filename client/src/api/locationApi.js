import { getValuesFromDB } from "./api";

class LocationApi {
  static async getLocationByWardId(id) {
    const ward = await getValuesFromDB(`wards/${id}`);
    const districtId = ward[0].MaQuanHuyen;
    const district = await getValuesFromDB(`districts/${districtId}`);
    const provinceId = district[0].MaTinhThanh;
    const province = await getValuesFromDB(`provinces/${provinceId}`);

    return { province: province[0], district: district[0], ward: ward[0] };
  }
}

export default LocationApi;
