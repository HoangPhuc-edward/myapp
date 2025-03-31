const OrgController = require("../controllers/org.controller");
const express = require("express");

const router = express.Router();

router.route("/").get(OrgController.getAllOrgs).post(OrgController.createOrg);

router.route("/:id").get(OrgController.getOrgsById);

router.route("/search/:attribute/:value").get(OrgController.getOrgsByAttribute);

module.exports = router;
