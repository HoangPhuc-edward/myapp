const EventController = require("../controllers/event.controller");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(EventController.getAllEvents)
  .post(EventController.createEvent)
  .put(EventController.updateEvent);

router.get("/:id", EventController.getEventsById);
router.get("/tongtien/:id", EventController.tinhTongTien);
router.get("/conlai/:id", EventController.tinhTienConLai);
router.get("/search/:attribute/:value", EventController.getEventsByAttribute);
router.get("/hide/:id", EventController.hideEvent);
module.exports = router;
