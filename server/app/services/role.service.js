const pool = require("../utils/mysql.util");

class RoleService {
  static async getAllRoles() {
    try {
      const [rows] = await pool.query("SELECT * FROM my_database.VAI_TRO;");
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async getRolesByAttribute(attribute, value) {
    try {
      const query = `SELECT * FROM my_database.VAI_TRO WHERE ${attribute} = ${value};`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async createRole(Ten) {
    try {
      const query =
        `INSERT INTO my_database.VAI_TRO (Ten)` + ` VALUES ('${Ten}');`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = RoleService;
