const pool = require("../utils/mysql.util");

class PaymentService {
  static async getAllPayments() {
    try {
      const [rows] = await pool.query("SELECT * FROM my_database.PHIEU_CHI;");
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async getPaymentsByAttribute(attribute, value) {
    try {
      const query = `SELECT * FROM my_database.PHIEU_CHI WHERE ${attribute} = ${value};`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async createPayment(MaSK, SoTien, NoiDung, NgayChi, MinhChung) {
    try {
      const query = `INSERT INTO PHIEU_CHI
	                (MaSK, SoTien, NoiDung, NgayChi, MinhChung)
	                VALUES (${MaSK}, ${SoTien}, '${NoiDung}', '${NgayChi}', '${MinhChung}');`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async updatePayment(MaPC, MaSK, SoTien, NoiDung, NgayChi, MinhChung) {
    try {
      const query = `UPDATE my_database.PHIEU_CHI
                     SET MaSK = ${MaSK}, SoTien = ${SoTien}, NoiDung = '${NoiDung}', NgayChi = '${NgayChi}', MinhChung = '${MinhChung}'
                     WHERE MaPC = ${MaPC};`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async deletePayment(id) {
    try {
      const query = `DELETE FROM my_database.PHIEU_CHI WHERE MaPC = ${id};`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = PaymentService;
