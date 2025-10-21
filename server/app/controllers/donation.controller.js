const DonationService = require("../services/donation.service");

class DonationController {
  static async getAllDonations(req, res) {
    try {
      const Donations = await DonationService.getAllDonations();
      res.status(200).json(Donations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getDonationsById(req, res) {
    try {
      const id = req.params.id;
      const Donations = await DonationService.getDonationsByAttribute(
        "MaPQG",
        id
      );
      res.status(200).json(Donations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getDonationByMSK(req, res) {
    try {
      const id = req.params.id;
      const Donations = await DonationService.getDonationsByAttribute(
        "MaSuKien",
        id
      );
      res.status(200).json(Donations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getDonationByAttribute(req, res) {
    try {
      const attribute = req.params.attribute;
      const value = req.params.value;
      const Donations = await DonationService.getDonationsByAttribute(
        attribute,
        value
      );
      res.status(200).json(Donations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createDonation(req, res) {
    try {
      const { MaTNV, MaSuKien, SoTien, NgayQuyenGop } = req.body;
      if (!MaTNV || !MaSuKien || !SoTien || !NgayQuyenGop) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const Donation = await DonationService.createDonation(
        MaTNV,
        MaSuKien,
        SoTien,
        NgayQuyenGop
      );
      res.status(201).json(Donation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteDonation(req, res) {
    try {
      const id = req.params.id;
      const Donation = await DonationService.deleteDonation(id);
      res.status(200).json(Donation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = DonationController;
