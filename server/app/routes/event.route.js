const EventController = require("../controllers/event.controller");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(EventController.getAllEvents)
  .post(EventController.createEvent);
router.get("/:id", EventController.getEventsById);

module.exports = router;
