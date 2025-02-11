import { getValuesFromDB } from "./api";

class LocationApi {
  static async getProvinces() {
    return await getValuesFromDB("provinces");
  }
}

export default LocationApi;
