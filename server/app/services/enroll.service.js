const pool = require("../utils/mysql.util");

class EnrollService {
  static async getAllEnrolls() {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM my_database.PHIEU_DANG_KY;"
      );
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async getEnrollsByAttribute(attribute, value) {
    try {
      const query = `SELECT * FROM my_database.PHIEU_DANG_KY WHERE ${attribute} = ${value};`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async createEnroll(NgayDangKy, MaSuKien, MaTNV) {
    try {
      const query =
        `INSERT INTO my_database.PHIEU_DANG_KY (NgayDangKy, MaSuKien, MaTNV)` +
        ` VALUES ('${NgayDangKy}', ${MaSuKien}, ${MaTNV});`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async deleteEnroll(id) {
    try {
      const query = `DELETE FROM my_database.PHIEU_DANG_KY WHERE MaSo = ${id};`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = EnrollService;
