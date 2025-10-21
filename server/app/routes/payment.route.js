const PaymentController = require("../controllers/payment.controller");
const express = require("express");

const router = express.Router();
router
  .route("/")
  .get(PaymentController.getAllPayments)
  .post(PaymentController.createPayment);

router.get("/:id", PaymentController.getPaymentsById);
router.put("/:id", PaymentController.updatePayment);
router.get("/msk/:id", PaymentController.getPaymentByMSK);
router.get(
  "/search/:attribute/:value",
  PaymentController.getPaymentByAttribute
);
router.delete("/:id", PaymentController.deletePayment);

module.exports = router;
