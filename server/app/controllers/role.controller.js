const RoleService = require("../services/role.service");

class RoleController {
  static async getAllRoles(req, res) {
    try {
      const rows = await RoleService.getAllRoles();
      res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }

  static async getRolesById(req, res) {
    try {
      const id = req.params.id;
      const rows = await RoleService.getRolesByAttribute("MaSo", id);
      res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }

  static async createRole(req, res) {
    try {
      const { Ten } = req.body;
      const rows = await RoleService.createRole(Ten);
      res.status(201).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
}

module.exports = RoleController;
