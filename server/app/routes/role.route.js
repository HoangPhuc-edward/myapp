const RoleController = require("../controllers/role.controller");

const router = require("express").Router();
router
  .route("/")
  .get(RoleController.getAllRoles)
  .post(RoleController.createRole);

router.route("/:id").get(RoleController.getRolesById);

module.exports = router;
