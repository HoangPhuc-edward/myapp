const EvaluationController = require("../controllers/evaluation.controller");
const express = require("express");

const router = express.Router();

router.route("/").post(EvaluationController.createEvaluation);

router.route("/msk/:MaSK").get(EvaluationController.getEvaluationsByMSK);

router
  .route("/:id")
  .put(EvaluationController.updateEvaluation)
  .delete(EvaluationController.deleteEvaluation);

module.exports = router;
