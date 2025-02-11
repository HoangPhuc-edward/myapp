const pool = require("../utils/mysql.util");

class ProvinceService {
  static async getAllProvinces() {
    try {
      const [rows] = await pool.execute(
        "SELECT MaSo, Ten FROM my_database.TINH_THANH;"
      );
      return rows;
    } catch (err) {
      console.error("Error fetching data from MySQL:", err);
      throw err;
    }
  }

  static async getProvinceByAttributes(attributes, values) {
    try {
      const [rows] = await pool.execute(
        `SELECT MaSo, Ten FROM my_database.TINH_THANH WHERE ${attributes} = ?;`,
        values
      );
      return rows;
    } catch (err) {
      console.error("Error fetching data from MySQL:", err);
      throw err;
    }
  }
}

module.exports = ProvinceService;
