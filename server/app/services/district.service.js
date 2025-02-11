const pool = require("../utils/mysql.util");

class DistrictService {
  static async getAllDistricts() {
    try {
      const [rows] = await pool.execute(
        "SELECT MaSo, Ten FROM my_database.QUAN_HUYEN;"
      );
      return rows;
    } catch (err) {
      console.error("Error fetching data from MySQL:", err);
      throw err;
    }
  }

  static async getDistrictByAttribute(attribute, value) {
    try {
      const query = `SELECT MaSo, Ten FROM my_database.QUAN_HUYEN WHERE ${attribute} = ${value};`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error("Error fetching data from MySQL:", err);
      throw err;
    }
  }
}

module.exports = DistrictService;
