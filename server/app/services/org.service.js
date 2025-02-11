const pool = require("../utils/mysql.util");

class OrgService {
  static async getOrgs() {
    try {
      const [rows] = await pool.execute("SELECT * FROM my_database.TO_CHUC;");
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getOrgsByAttribute(attribute, value) {
    try {
      const query = `SELECT * FROM my_database.TO_CHUC WHERE ${attribute} = ${value};`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error("Error fetching data from MySQL:", err);
      throw err;
    }
  }

  static async insertOrg(Ten, MieuTa, SDT, MaDiaChi, MaTaiKhoan) {
    try {
      const query = `INSERT INTO my_database.TO_CHUC (Ten, MieuTa, SDT, MaDiaChi, MaTaiKhoan) VALUES ('${Ten}', '${MieuTa}', '${SDT}', ${MaDiaChi}, ${MaTaiKhoan});`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = OrgService;
