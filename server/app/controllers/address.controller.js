const AddressService = require("../services/address.service");

class AddressController {
  static async getAllAddresses(req, res) {
    try {
      const rows = await AddressService.getAddresses();
      res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }

  static async getAddressesById(req, res) {
    try {
      const id = req.params.id;
      const rows = await AddressService.getAddressesByAttribute("MaSo", id);
      res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }

  static async createAddress(req, res) {
    try {
      const { SoNha, TenDuong, KhuVuc, MaPhuongXa, GhiChu } = req.body;
      const rows = await AddressService.createAddress(
        SoNha,
        TenDuong,
        KhuVuc,
        MaPhuongXa,
        GhiChu
      );
      res.status(201).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
}

module.exports = AddressController;
