const express = require("express");
const ProvinceController = require("../controllers/province.controller");

const router = express.Router();

router.get("/", ProvinceController.getAllProvinces);

module.exports = router;
