const pool = require("../utils/mysql.util");

class AddressService {
  static async getAddresses() {
    try {
      const [rows] = await pool.query("SELECT * FROM my_database.DIA_CHI;");
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async getAddressesByAttribute(attribute, value) {
    try {
      const query = `SELECT * FROM my_database.DIA_CHI WHERE ${attribute} = ${value};`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async createAddress(SoNha, TenDuong, KhuVuc, MaPhuongXa, GhiChu) {
    try {
      const query = `INSERT INTO my_database.DIA_CHI (SoNha, TenDuong, KhuVuc, MaPhuongXa, GhiChu) VALUES ('${SoNha}', '${TenDuong}', '${KhuVuc}', ${MaPhuongXa}, '${GhiChu}');`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = AddressService;
