const EvaluationService = require("../services/evaluation.service");

class EvaluationController {
  static async getEvaluationsByMSK(req, res) {
    try {
      const MaSK = req.params.MaSK;
      const evaluations = await EvaluationService.getEvaluationsByMSK(MaSK);
      res.status(200).json(evaluations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createEvaluation(req, res) {
    try {
      const { MaPDK, NgayLap, SoDiem, NoiDung } = req.body;
      if (!MaPDK || !NgayLap || !SoDiem || !NoiDung) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const newEvaluation = await EvaluationService.createEvaluation(
        MaPDK,
        NgayLap,
        SoDiem,
        NoiDung
      );
      res.status(201).json(newEvaluation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateEvaluation(req, res) {
    try {
      const MaPDG = req.params.id;
      const { MaPDK, NgayLap, SoDiem, NoiDung } = req.body;
      if (!MaPDG || !MaPDK || !NgayLap || !SoDiem || !NoiDung) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const updatedEvaluation = await EvaluationService.updateEvaluation(
        MaPDG,
        MaPDK,
        NgayLap,
        SoDiem,
        NoiDung
      );
      res.status(200).json(updatedEvaluation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteEvaluation(req, res) {
    try {
      const id = req.params.id;
      const result = await EvaluationService.deleteEvaluation(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = EvaluationController;
