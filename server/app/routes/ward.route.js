const WardController = require("../controllers/ward.controller");
const express = require("express");

const router = express.Router();

router.get("/", WardController.getAllWards);

router.get("/:id", WardController.getWardById);
router.get("/district/:id", WardController.getWardsByDistrictId);

module.exports = router;
