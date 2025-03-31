const MessageService = require("../services/message.service");

class MessageController {
  static async getAllMessages(req, res) {
    try {
      const messages = await MessageService.getMessages();
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getMessagesByAttribute(req, res) {
    try {
      const attribute = req.params.attribute;
      const value = req.params.value;
      const messages = await MessageService.getMessagesByAttribute(
        attribute,
        value
      );
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createMessage(req, res) {
    try {
      const { NgayGio, MaToChuc, MaTNV, NoiDung, NguoiGui } = req.body;
      if (!NgayGio || !MaToChuc || !MaTNV || !NoiDung) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const message = await MessageService.insertMessage(
        NgayGio,
        MaToChuc,
        MaTNV,
        NoiDung,
        NguoiGui
      );
      res.status(201).json(message);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async createVolMessage(req, res) {
    try {
      const { NgayGio, MaToChuc, MaTNV, NoiDung } = req.body;
      if (!NgayGio || !MaToChuc || !MaTNV || !NoiDung) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const message = await MessageService.insertMessage(
        NgayGio,
        MaToChuc,
        MaTNV,
        NoiDung,
        "TNV"
      );
      res.status(201).json(message);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async createOrgMessage(req, res) {
    try {
      const { NgayGio, MaToChuc, MaTNV, NoiDung } = req.body;
      if (!NgayGio || !MaToChuc || !MaTNV || !NoiDung) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const message = await MessageService.insertMessage(
        NgayGio,
        MaToChuc,
        MaTNV,
        NoiDung,
        "ToChuc"
      );
      res.status(201).json(message);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = MessageController;
