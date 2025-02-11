const OrgService = require("../services/org.service");

class OrgController {
  static async getAllOrgs(req, res) {
    try {
      const orgs = await OrgService.getOrgs();
      res.status(200).json(orgs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getOrgsById(req, res) {
    try {
      const id = req.params.id;
      const orgs = await OrgService.getOrgsByAttribute("MaSo", id);
      res.status(200).json(orgs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createOrg(req, res) {
    try {
      const { Ten, MieuTa, SDT, MaDiaChi, MaTaiKhoan } = req.body;
      if (!Ten || !MieuTa || !SDT || !MaDiaChi || !MaTaiKhoan) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const org = await OrgService.insertOrg(
        Ten,
        MieuTa,
        SDT,
        MaDiaChi,
        MaTaiKhoan
      );
      res.status(201).json(org);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = OrgController;
