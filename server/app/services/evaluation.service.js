const pool = require("../utils/mysql.util");

class EvaluationService {
  static async getEvaluationsByMSK(MaSK) {
    try {
      const [rows] = await pool.query(`SELECT *
            FROM PHIEU_DANH_GIA PDG
            JOIN PHIEU_DANG_KY PDK
            JOIN TINH_NGUYEN_VIEN TNV
            ON PDG.MaPDK = PDK.MaSo and PDK.MaTNV = TNV.MaSo
            WHERE MaSuKien = ${MaSK};`);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async createEvaluation(MaPDK, NgayLap, SoDiem, NoiDung) {
    try {
      const query = `INSERT INTO PHIEU_DANH_GIA (MaPDK, NgayLap, SoDiem, NoiDung)
	                VALUES (${MaPDK}, '${NgayLap}', ${SoDiem}, '${NoiDung}');`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async updateEvaluation(MaPDG, MaPDK, NgayLap, SoDiem, NoiDung) {
    try {
      const query = `UPDATE my_database.PHIEU_DANH_GIA
                     SET MaPDK = ${MaPDK}, NgayLap = '${NgayLap}', SoDiem = ${SoDiem}, NoiDung = '${NoiDung}'
                     WHERE MaPDG = ${MaPDG};`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async deleteEvaluation(id) {
    try {
      const query = `DELETE FROM PHIEU_DANH_GIA WHERE MaPDG = ${id};`;
      const [rows] = await pool.execute(query);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = EvaluationService;
