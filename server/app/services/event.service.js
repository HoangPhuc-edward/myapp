const pool = require("../utils/mysql.util");

class EventService {
  static async getAllEvents() {
    try {
      const [rows] = await pool.query("SELECT * FROM my_database.SU_KIEN;");
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async getEventsByAttribute(attribute, value) {
    try {
      const query = `SELECT * FROM my_database.SU_KIEN WHERE ${attribute} = ${value};`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async createEvent(
    MaToChuc,
    TenSuKien,
    MieuTa,
    NgayDang,
    NgayBatDau,
    NgayKetThuc,
    SoLuongToiDa,
    MaDiaDiem,
    HinhAnh
  ) {
    try {
      const query =
        `INSERT INTO my_database.SU_KIEN (MaToChuc, TenSuKien, MieuTa, NgayDang, NgayBatDau, NgayKetThuc, SoLuongToiDa, MaDiaDiem, HinhAnh, TrangThai)` +
        ` VALUES (${MaToChuc}, '${TenSuKien}', '${MieuTa}', '${NgayDang}', '${NgayBatDau}', '${NgayKetThuc}', ${SoLuongToiDa}, ${MaDiaDiem}, '${HinhAnh}', 1);`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async updateEvent(
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
  ) {
    try {
      const query = `UPDATE my_database.SU_KIEN SET MaToChuc = ${MaToChuc}, TenSuKien = '${TenSuKien}', MieuTa = '${MieuTa}', NgayDang = '${NgayDang}', NgayBatDau = '${NgayBatDau}', NgayKetThuc = '${NgayKetThuc}', SoLuongToiDa = ${SoLuongToiDa}, MaDiaDiem = ${MaDiaDiem}, HinhAnh = '${HinhAnh}', TrangThai=${TrangThai} WHERE MaSuKien = ${MaSuKien};`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async hideEvent(MaSuKien) {
    try {
      const query = `UPDATE my_database.SU_KIEN SET TrangThai = 0 WHERE MaSuKien = ${MaSuKien};`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = EventService;
