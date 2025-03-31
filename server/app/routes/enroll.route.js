const EnrollController = require("../controllers/enroll.controller");
const express = require("express");

const router = express.Router();
router
  .route("/")
  .get(EnrollController.getAllEnrolls)
  .post(EnrollController.createEnroll);

router.get("/:id", EnrollController.getEnrollsById);
router.get("/msk/:id", EnrollController.getEnrollByMSK);
router.get("/search/:attribute/:value", EnrollController.getEnrollByAttribute);
router.delete("/:id", EnrollController.deleteEnroll);

module.exports = router;
