import {
  addValuesToDB,
  deleteValuesFromDB,
  getValuesFromDB,
  updateValuesToDB,
} from "./api";

class PaymentApi {
  static async getPaymentsByMaSuKien(maSuKien) {
    const payments = await getValuesFromDB(`payments/msk/${maSuKien}`);
    return payments;
  }

  static async addPayment({ MaSK, SoTien, NoiDung, NgayChi, MinhChung }) {
    if (!MaSK || !SoTien || !NoiDung || !NgayChi || !MinhChung) {
      throw new Error("Missing required fields");
    }
    try {
      const response = await fetch(`http://localhost:5000/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ MaSK, SoTien, NoiDung, NgayChi, MinhChung }),
      });

      return response;
    } catch (error) {
      console.error("Data:", { MaSK, SoTien, NoiDung, NgayChi, MinhChung });
      console.error("Error:", error);
      throw error;
    }
  }

  static async updatePayment({
    MaPC,
    MaSK,
    SoTien,
    NoiDung,
    NgayChi,
    MinhChung,
  }) {
    if (!MaPC || !MaSK || !SoTien || !NoiDung || !NgayChi || !MinhChung) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/payments/${MaPC}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          MaSK,
          SoTien,
          NoiDung,
          NgayChi,
          MinhChung,
        }),
      });

      return response;
    } catch (error) {
      console.error("Data:", {
        MaPC,
        MaSK,
        SoTien,
        NoiDung,
        NgayChi,
        MinhChung,
      });
      console.error("Error:", error);
      throw error;
    }
  }

  static async deletePayment(id) {
    if (!id) {
      throw new Error("Payment ID is required");
    }
    return await deleteValuesFromDB(
      `payments/${id}`,
      JSON.stringify({ TrangThai: 0 })
    );
  }
}

export default PaymentApi;
