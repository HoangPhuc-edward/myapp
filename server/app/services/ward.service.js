const pool = require("../utils/mysql.util");

class WardService {
  static async getAllWards() {
    try {
      const [rows] = await pool.execute(
        "SELECT MaSo, Ten FROM my_database.PHUONG_XA;"
      );
      return rows;
    } catch (err) {
      console.error("Error fetching data from MySQL:", err);
      throw err;
    }
  }

  static async getWardsByAttribute(attribute, value) {
    try {
      const query = `SELECT MaSo, Ten FROM my_database.PHUONG_XA WHERE ${attribute} = ${value};`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error("Error fetching data from MySQL:", err);
      throw err;
    }
  }
}

module.exports = WardService;
