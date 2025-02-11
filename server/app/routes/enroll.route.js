const EnrollController = require("../controllers/enroll.controller");
const express = require("express");

const router = express.Router();
router
  .route("/")
  .get(EnrollController.getAllEnrolls)
  .post(EnrollController.createEnroll);
router.get("/:id", EnrollController.getEnrollsById);

module.exports = router;
