const EnrollService = require("../services/enroll.service");

class EnrollController {
  static async getAllEnrolls(req, res) {
    try {
      const enrolls = await EnrollService.getAllEnrolls();
      res.status(200).json(enrolls);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getEnrollsById(req, res) {
    try {
      const id = req.params.id;
      const enrolls = await EnrollService.getEnrollsByAttribute("MaSo", id);
      res.status(200).json(enrolls);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getEnrollByMSK(req, res) {
    try {
      const id = req.params.id;
      const enrolls = await EnrollService.getEnrollsByAttribute("MaSuKien", id);
      res.status(200).json(enrolls);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getEnrollByAttribute(req, res) {
    try {
      const attribute = req.params.attribute;
      const value = req.params.value;
      const enrolls = await EnrollService.getEnrollsByAttribute(
        attribute,
        value
      );
      res.status(200).json(enrolls);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createEnroll(req, res) {
    try {
      const { NgayDangKy, MaSuKien, MaTNV } = req.body;
      if (!NgayDangKy || !MaSuKien || !MaTNV) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const enroll = await EnrollService.createEnroll(
        NgayDangKy,
        MaSuKien,
        MaTNV
      );
      res.status(201).json(enroll);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteEnroll(req, res) {
    try {
      const id = req.params.id;
      const enroll = await EnrollService.deleteEnroll(id);
      res.status(200).json(enroll);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = EnrollController;
