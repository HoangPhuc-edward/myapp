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
    HinhAnh,
    Quy = 0,
    SoNha,
    TenDuong,
    KhuVuc,
    MaPhuongXa
  ) {
    try {
      const query =
        `INSERT INTO my_database.SU_KIEN (MaToChuc, TenSuKien, MieuTa, NgayDang, NgayBatDau, NgayKetThuc, SoLuongToiDa, MaDiaDiem, HinhAnh, Quy, TrangThai, SoNha, TenDuong, KhuVuc, MaPhuongXa)` +
        ` VALUES (${MaToChuc}, '${TenSuKien}', '${MieuTa}', '${NgayDang}', '${NgayBatDau}', '${NgayKetThuc}', ${SoLuongToiDa}, ${MaDiaDiem}, '${HinhAnh}', ${Quy}, 1, ${SoNha}, '${TenDuong}', '${KhuVuc}', ${MaPhuongXa});`;
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
    Quy = 0,
    TrangThai
  ) {
    try {
      const query = `UPDATE my_database.SU_KIEN SET MaToChuc = ${MaToChuc}, TenSuKien = '${TenSuKien}', MieuTa = '${MieuTa}', NgayDang = '${NgayDang}', NgayBatDau = '${NgayBatDau}', NgayKetThuc = '${NgayKetThuc}', SoLuongToiDa = ${SoLuongToiDa}, MaDiaDiem = ${MaDiaDiem}, HinhAnh = '${HinhAnh}', Quy = ${Quy}, TrangThai=${TrangThai} WHERE MaSuKien = ${MaSuKien};`;
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

  static async tinhTongTien(MaSuKien) {
    try {
      const query = `CALL sp_tongTienSuKien(${MaSuKien}, @tong_tien); SELECT @tong_tien;`;
      const [rows] = await pool.query(query);
      if (rows.length > 0) {
        return rows[1][0]["@tong_tien"];
      } else {
        throw new Error("Event not found");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async tinhTienConLai(MaSuKien) {
    try {
      const query = `CALL sp_tinhTienConLaiSuKien(${MaSuKien}, @tien_con_lai);
SELECT @tien_con_lai;`;
      const [rows] = await pool.query(query);
      if (rows.length > 0) {
        return rows[1][0]["@tien_con_lai"];
      } else {
        throw new Error("Event not found");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = EventService;
