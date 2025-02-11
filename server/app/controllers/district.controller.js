const DistrictService = require("../services/district.service");

class DistrictController {
  static async getAllDistricts(req, res) {
    try {
      const districts = await DistrictService.getAllDistricts();
      res.json(districts);
    } catch (err) {
      console.error("Error fetching data from MySQL:", err);
      res.status(500).send("Error fetching data from MySQL");
    }
  }

  static async getDistrictById(req, res) {
    const id = req.params.id;
    try {
      const districts = await DistrictService.getDistrictByAttribute(
        "MaSo",
        id
      );
      res.json(districts);
    } catch (err) {
      console.error("Error fetching data from MySQL:", err);
      res.status(500).send("Error fetching data from MySQL");
    }
  }

  static async getDistrictsByProvinceId(req, res) {
    const province = req.params.province;
    try {
      const districts = await DistrictService.getDistrictByAttribute(
        "MaTinhThanh",
        province
      );
      res.json(districts);
    } catch (err) {
      console.error("Error fetching data from MySQL:", err);
      res.status(500).send("Error fetching data from MySQL");
    }
  }
}

module.exports = DistrictController;
