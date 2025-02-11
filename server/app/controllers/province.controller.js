const ProvinceService = require("../services/province.service");

class ProvinceController {
  static async getAllProvinces(req, res) {
    try {
      const provinces = await ProvinceService.getAllProvinces();
      res.json(provinces);
    } catch (err) {
      console.error("Error fetching data from MySQL:", err);
      res.status(500).send("Error fetching data from MySQL");
    }
  }
}

module.exports = ProvinceController;
