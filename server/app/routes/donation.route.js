const DonationController = require("../controllers/donation.controller");
const express = require("express");

const router = express.Router();
router
  .route("/")
  .get(DonationController.getAllDonations)
  .post(DonationController.createDonation);

router.get("/:id", DonationController.getDonationsById);
router.get("/msk/:id", DonationController.getDonationByMSK);
router.get(
  "/search/:attribute/:value",
  DonationController.getDonationByAttribute
);
router.delete("/:id", DonationController.deleteDonation);

module.exports = router;
