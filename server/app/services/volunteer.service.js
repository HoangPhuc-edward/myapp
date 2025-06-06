const pool = require("../utils/mysql.util");

class VolunteerService {
  static async getVolunteers() {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM my_database.TINH_NGUYEN_VIEN;"
      );
      return rows;
    } catch (error) {
      console.error("Error VolunteerService.getVolunteers", error);
      throw error;
    }
  }

  static async getVolunteersByAttribute(attribute, value) {
    try {
      const [rows] = await pool.query(
        `SELECT * FROM my_database.TINH_NGUYEN_VIEN WHERE ${attribute} = ${value};`
      );
      return rows;
    } catch (error) {
      console.error("Error VolunteerService.getVolunteersByAttribute", error);
      throw error;
    }
  }

  static async insertVolunteer(
    HoTen,
    NgaySinh,
    SDT,
    GioiTinh,
    MaDiaChi,
    Email,
    HinhAnh
  ) {
    try {
      const [rows] = await pool.execute(
        `INSERT INTO my_database.TINH_NGUYEN_VIEN (HoTen, NgaySinh, SDT, GioiTinh, MaDiaChi,Email, HinhAnh) VALUES ('${HoTen}', '${NgaySinh}', '${SDT}', '${GioiTinh}', ${MaDiaChi}, '${Email}', '${HinhAnh}');`
      );
      return rows;
    } catch (err) {
      console.error("Error VolunteerService.insertVolunteer", err);
      throw err;
    }
  }
}

module.exports = VolunteerService;
