const pool = require("../utils/mysql.util");

class DonationService {
  static async getAllDonations() {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM my_database.PHIEU_QUYEN_GOP;"
      );
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async getDonationsByAttribute(attribute, value) {
    try {
      const query = `SELECT * FROM my_database.PHIEU_QUYEN_GOP WHERE ${attribute} = ${value};`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async createDonation(MaTNV, MaSuKien, SoTien, NgayQuyenGop) {
    try {
      const query = `INSERT INTO PHIEU_QUYEN_GOP (MaTNV, MaSuKien, SoTien, NgayQuyenGop)
            VALUES (${MaTNV}, ${MaSuKien}, ${SoTien}, '${NgayQuyenGop}');`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async deleteDonation(id) {
    try {
      const query = `DELETE FROM my_database.PHIEU_QUYEN_GOP WHERE MaPQG = ${id};`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = DonationService;
