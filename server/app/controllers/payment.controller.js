const EventService = require("../services/event.service");
const PaymentService = require("../services/payment.service");
const EventController = require("./event.controller");

class PaymentController {
  static async getAllPayments(req, res) {
    try {
      const Payments = await PaymentService.getAllPayments();
      res.status(200).json(Payments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getPaymentsById(req, res) {
    try {
      const id = req.params.id;
      const Payments = await PaymentService.getPaymentsByAttribute("MaPC", id);
      res.status(200).json(Payments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getPaymentByMSK(req, res) {
    try {
      const id = req.params.id;
      const Payments = await PaymentService.getPaymentsByAttribute("MaSK", id);
      res.status(200).json(Payments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getPaymentByAttribute(req, res) {
    try {
      const attribute = req.params.attribute;
      const value = req.params.value;
      const Payments = await PaymentService.getPaymentsByAttribute(
        attribute,
        value
      );
      res.status(200).json(Payments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createPayment(req, res) {
    try {
      const { MaSK, SoTien, NoiDung, NgayChi, MinhChung } = req.body;
      if (!MaSK || !SoTien || !NoiDung || !NgayChi || !MinhChung) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const moneyLeft = await EventService.tinhTienConLai(MaSK);
      if (SoTien > moneyLeft) {
        return res.status(401).json({
          message: "SoTien exceeds the remaining amount for this event",
        });
      }

      const Payment = await PaymentService.createPayment(
        MaSK,
        SoTien,
        NoiDung,
        NgayChi,
        MinhChung
      );
      res.status(201).json(Payment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async updatePayment(req, res) {
    try {
      const MaPC = req.params.id;
      const { MaSK, SoTien, NoiDung, NgayChi, MinhChung } = req.body;
      if (!MaPC || !MaSK || !SoTien || !NoiDung || !NgayChi || !MinhChung) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // const base_payment = await PaymentController.getPaymentsById(MaPC);
      // const oldSoTien = base_payment.SoTien;
      // console.log("Old SoTien:", oldSoTien, "New SoTien:", SoTien);
      // if (SoTien > oldSoTien) {
      //   const moneyLeft = await EventService.tinhTienConLai(MaSK);
      //   if (SoTien > moneyLeft + oldSoTien) {
      //     return res.status(401).json({
      //       message: "SoTien exceeds the remaining amount for this event",
      //     });
      //   }
      // }
      const Payment = await PaymentService.updatePayment(
        MaPC,
        MaSK,
        SoTien,
        NoiDung,
        NgayChi,
        MinhChung
      );
      res.status(200).json(Payment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deletePayment(req, res) {
    try {
      const id = req.params.id;
      const Payment = await PaymentService.deletePayment(id);
      res.status(200).json(Payment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = PaymentController;
