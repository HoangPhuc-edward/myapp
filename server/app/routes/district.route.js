const DistrictController = require("../controllers/district.controller");

const express = require("express");

const router = express.Router();

router.route("/").get(DistrictController.getAllDistricts);
router
  .route("/province/:province")
  .get(DistrictController.getDistrictsByProvinceId);
router.route("/:id").get(DistrictController.getDistrictById);

module.exports = router;
