const EventService = require("../services/event.service");

class EventController {
  static async getAllEvents(req, res) {
    try {
      const events = await EventService.getAllEvents();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getEventsById(req, res) {
    try {
      const id = req.params.id;
      const events = await EventService.getEventsByAttribute("MaSuKien", id);
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getEventsByAttribute(req, res) {
    try {
      const attribute = req.params.attribute;
      const value = req.params.value;
      const events = await EventService.getEventsByAttribute(attribute, value);
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createEvent(req, res) {
    try {
      const {
        MaToChuc,
        TenSuKien,
        MieuTa,
        NgayDang,
        NgayBatDau,
        NgayKetThuc,
        SoLuongToiDa,
        MaDiaDiem,
        HinhAnh,
      } = req.body;
      if (
        !MaToChuc ||
        !TenSuKien ||
        !MieuTa ||
        !NgayDang ||
        !NgayBatDau ||
        !NgayKetThuc ||
        !SoLuongToiDa ||
        !MaDiaDiem ||
        !HinhAnh
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const event = await EventService.createEvent(
        MaToChuc,
        TenSuKien,
        MieuTa,
        NgayDang,
        NgayBatDau,
        NgayKetThuc,
        SoLuongToiDa,
        MaDiaDiem,
        HinhAnh
      );
      res.status(201).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async updateEvent(req, res) {
    try {
      const {
        MaSuKien,
        MaToChuc,
        TenSuKien,
        MieuTa,
        NgayDang,
        NgayBatDau,
        NgayKetThuc,
        SoLuongToiDa,
        MaDiaDiem,
        HinhAnh,
        TrangThai,
      } = req.body;

      if (
        !MaSuKien ||
        !MaToChuc ||
        !TenSuKien ||
        !MieuTa ||
        !NgayDang ||
        !NgayBatDau ||
        !NgayKetThuc ||
        !SoLuongToiDa ||
        !MaDiaDiem ||
        !HinhAnh ||
        !TrangThai
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const event = await EventService.updateEvent(
        MaSuKien,
        MaToChuc,
        TenSuKien,
        MieuTa,
        NgayDang,
        NgayBatDau,
        NgayKetThuc,
        SoLuongToiDa,
        MaDiaDiem,
        HinhAnh,
        TrangThai
      );
      res.status(200).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async hideEvent(req, res) {
    try {
      const MaSuKien = req.params.id;
      if (!MaSuKien) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const event = await EventService.hideEvent(MaSuKien);
      res.status(200).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
}
module.exports = EventController;
