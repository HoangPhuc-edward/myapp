const AddressController = require("../controllers/address.controller");
const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(AddressController.getAllAddresses)
  .post(AddressController.createAddress);

router.route("/:id").get(AddressController.getAddressesById);

module.exports = router;
