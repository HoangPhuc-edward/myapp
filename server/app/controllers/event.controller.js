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
        Quy = 0,
        SoNha,
        TenDuong,
        KhuVuc,
        MaPhuongXa,
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
        !HinhAnh ||
        !SoNha ||
        !TenDuong ||
        !KhuVuc ||
        !MaPhuongXa
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
        HinhAnh,
        Quy,
        SoNha,
        TenDuong,
        KhuVuc,
        MaPhuongXa
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
        Quy = 0,
        TrangThai,
        SoNha,
        TenDuong,
        KhuVuc,
        MaPhuongXa,
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
        !TrangThai ||
        !SoNha ||
        !TenDuong ||
        !KhuVuc ||
        !MaPhuongXa
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const event = await EventService.updateEvent(
        MaSuKien,
        MaToChuc,
        TenSuKien,
        MieuTa,
        NgayBatDau,
        NgayKetThuc,
        SoLuongToiDa,
        MaDiaDiem,
        HinhAnh,
        Quy,
        TrangThai,
        SoNha,
        TenDuong,
        KhuVuc,
        MaPhuongXa
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

  static async tinhTongTien(req, res) {
    try {
      const MaSuKien = req.params.id;
      if (!MaSuKien) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const total = await EventService.tinhTongTien(MaSuKien);
      res.status(200).json(total);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async tinhTienConLai(req, res) {
    try {
      const MaSuKien = req.params.id;
      if (!MaSuKien) {
        res.status(400).json({ message: "Missing required fields" });
      }

      const remaining = await EventService.tinhTienConLai(MaSuKien);
      res.status(200).json(remaining);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
}
module.exports = EventController;
