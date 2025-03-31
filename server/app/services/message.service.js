const pool = require("../utils/mysql.util");

class MessageService {
  static async getMessages() {
    try {
      const [rows] = await pool.execute("SELECT * FROM my_database.TIN_NHAN;");
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getMessagesByAttribute(attribute, value) {
    try {
      const query = `SELECT * FROM my_database.TIN_NHAN WHERE ${attribute} = ${value};`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error("Error fetching data from MySQL:", err);
      throw err;
    }
  }

  static async insertMessage(NgayGio, MaToChuc, MaTNV, NoiDung, NguoiGui) {
    try {
      const query = `INSERT INTO my_database.TIN_NHAN (NgayGio, MaToChuc, MaTNV, NoiDung, NguoiGui) VALUES ('${NgayGio}', ${MaToChuc}, ${MaTNV}, '${NoiDung}', '${NguoiGui}');`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = MessageService;
