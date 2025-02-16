const express = require("express");
const ProvinceController = require("../controllers/province.controller");

const router = express.Router();

router.get("/", ProvinceController.getAllProvinces);
router.get("/:id", ProvinceController.getProvinceById);

module.exports = router;
