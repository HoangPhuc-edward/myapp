const AccountService = require("../services/account.service");

class AccountController {
  static async getAllAccounts(req, res) {
    try {
      const rows = await AccountService.getAllAccounts();
      res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }

  static async getAccountsById(req, res) {
    try {
      const id = req.params.id;
      const rows = await AccountService.getAccountsByAttribute("MaSo", id);
      res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }

  static async getRoleByEmail(req, res) {
    try {
      let email = req.params.email;
      email = `'${email}'`;
      const rows = await AccountService.getAccountsByAttribute("Email", email);
      res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }

  static async createAccount(req, res) {
    try {
      const { Email, MaVaiTro } = req.body;
      const rows = await AccountService.createAccount(Email, MaVaiTro);
      res.status(201).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
}

module.exports = AccountController;
