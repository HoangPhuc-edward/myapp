const MessageController = require("../controllers/message.controller");

const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(MessageController.getAllMessages)
  .post(MessageController.createMessage);
router
  .route("/search/:attribute/:value")
  .get(MessageController.getMessagesByAttribute);

router.route("/volunteer").post(MessageController.createVolMessage);
router.route("/org").post(MessageController.createOrgMessage);

module.exports = router;
