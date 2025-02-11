const AccountController = require("../controllers/account.controller");

const router = require("express").Router();
router
  .route("/")
  .get(AccountController.getAllAccounts)
  .post(AccountController.createAccount);

router.route("/:id").get(AccountController.getAccountsById);
router.route("/role/:email").get(AccountController.getRoleByEmail);

module.exports = router;
