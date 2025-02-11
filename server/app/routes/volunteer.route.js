const VolunteerController = require("../controllers/volunteer.controller");

const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(VolunteerController.getAllVolunteers)
  .post(VolunteerController.createVolunteer);

router.route("/:id").get(VolunteerController.getVolunteerById);

module.exports = router;
