// StatusController.js
import readData from "../operations/read.js";

class StatusController {
  async getStatus(automacao) {
    const query = `SELECT status FROM LummaExecucoes WHERE automacao = '${automacao}' ORDER BY id DESC LIMIT 1`;
    const res = await readData(query);
    if (res[0] != undefined) {
      return res[0].status;
    }
    return 'Primeira execução';
  }
}

export default StatusController;
