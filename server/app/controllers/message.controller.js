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
        NguoiGui,
        0
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
        "TNV",
        0
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
        "ToChuc",
        0
      );
      res.status(201).json(message);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async createGroupMessage(req, res) {
    try {
      const { NgayGio, MaToChuc, MaTNV, NoiDung, MaSK } = req.body;
      if (!NgayGio || !MaToChuc || !MaTNV || !NoiDung || !MaSK) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const message = await MessageService.insertMessage(
        NgayGio,
        MaToChuc,
        MaTNV,
        NoiDung,
        "TNV",
        MaSK
      );
      res.status(201).json(message);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async createVolGroupMessage(req, res) {
    try {
      const { NgayGio, MaTNV, NoiDung, MaSK } = req.body;
      if (!NgayGio || !MaTNV || !NoiDung || !MaSK) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const message = await MessageService.insertMessage(
        NgayGio,
        0,
        MaTNV,
        NoiDung,
        "TNV",
        MaSK
      );
      res.status(201).json(message);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async createOrgGroupMessage(req, res) {
    try {
      const { NgayGio, MaToChuc, NoiDung, MaSK } = req.body;
      if (!NgayGio || !MaToChuc || !MaSK || !NoiDung) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const message = await MessageService.insertMessage(
        NgayGio,
        MaToChuc,
        0,
        NoiDung,
        "ToChuc",
        MaSK
      );
      res.status(201).json(message);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = MessageController;
