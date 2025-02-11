const pool = require("../utils/mysql.util");

class AccountService {
  static async getAllAccounts() {
    try {
      const [rows] = await pool.query("SELECT * FROM my_database.TAI_KHOAN;");
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async getAccountsByAttribute(attribute, value) {
    try {
      const query = `SELECT * FROM my_database.TAI_KHOAN WHERE ${attribute} = ${value};`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async createAccount(Email, MaVaiTro) {
    try {
      const query =
        `INSERT INTO my_database.TAI_KHOAN (Email, MaVaiTro)` +
        ` VALUES ('${Email}', ${MaVaiTro});`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = AccountService;
