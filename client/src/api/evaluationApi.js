import {
  addValuesToDB,
  deleteValuesFromDB,
  getValuesFromDB,
  updateValuesToDB,
} from "./api";

class EvaluationApi {
  static async addEvaluation(data) {
    const evaluationData = {
      MaPDK: data.MaPDK,
      NgayLap: data.NgayLap,
      SoDiem: data.SoDiem,
      NoiDung: data.NoiDung,
    };
    return await addValuesToDB("evaluations", JSON.stringify(evaluationData));
  }

  static async updateEvaluation(id, data) {
    const evaluationData = {
      MaPDK: data.MaPDK,
      NgayLap: data.NgayLap,
      SoDiem: data.SoDiem,
      NoiDung: data.NoiDung,
    };
    return await updateValuesToDB(
      `evaluations/${id}`,
      JSON.stringify(evaluationData)
    );
  }

  static async deleteEvaluation(id) {
    return await deleteValuesFromDB(`evaluations/${id}`);
  }

  static async getEvaluationByMSK(MaSuKien) {
    const evaluations = await getValuesFromDB(`evaluations/msk/${MaSuKien}`);
    return evaluations;
  }
}

export default EvaluationApi;
