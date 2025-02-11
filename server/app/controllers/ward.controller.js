const WardService = require("../services/ward.service");

class WardController {
  static async getAllWards(req, res) {
    try {
      const rows = await WardService.getAllWards();
      res.json(rows);
    } catch (err) {
      console.error("Error fetching data from MySQL:", err);
      res.status(500).send({ message: "Error fetching data from MySQL" });
    }
  }

  static async getWardById(req, res) {
    try {
      const id = req.params.id;
      const rows = await WardService.getWardsByAttribute("MaSo", id);
      res.json(rows);
    } catch (err) {
      console.error("Error fetching data from MySQL:", err);
      res.status(500).send({ message: "Error fetching data from MySQL" });
    }
  }

  static async getWardsByDistrictId(req, res) {
    try {
      const id = req.params.id;
      const rows = await WardService.getWardsByAttribute("MaQuanHuyen", id);
      res.json(rows);
    } catch (err) {
      console.error("Error fetching data from MySQL:", err);
      res.status(500).send({ message: "Error fetching data from MySQL" });
    }
  }
}

module.exports = WardController;
