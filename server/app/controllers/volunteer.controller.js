const VolunteerService = require("../services/volunteer.service");

class VolunteerController {
  static async getAllVolunteers(req, res) {
    try {
      const volunteers = await VolunteerService.getVolunteers();
      return res.status(200).json(volunteers);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getVolunteerById(req, res) {
    try {
      const id = req.params.id;
      const volunteer = await VolunteerService.getVolunteersByAttribute(
        "MaSo",
        id
      );
      return res.status(200).json(volunteer);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async getVolunteersByAttribute(req, res) {
    try {
      const attribute = req.params.attribute;
      const value = req.params.value;
      const volunteers = await VolunteerService.getVolunteersByAttribute(
        attribute,
        value
      );
      return res.status(200).json(volunteers);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async createVolunteer(req, res) {
    try {
      const { HoTen, NgaySinh, SDT, GioiTinh, MaDiaChi, Email, HinhAnh } =
        req.body;
      if (
        !HoTen ||
        !NgaySinh ||
        !SDT ||
        !GioiTinh ||
        !MaDiaChi ||
        !Email ||
        !HinhAnh
      ) {
        return res.status(400).json({ error: "Missing required information" });
      }
      const volunteer = await VolunteerService.insertVolunteer(
        HoTen,
        NgaySinh,
        SDT,
        GioiTinh,
        MaDiaChi,
        Email,
        HinhAnh
      );
      return res.status(201).json(volunteer);
    } catch (err) {
      console.error("Error VolunteerController.createVolunteer", err);
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = VolunteerController;
