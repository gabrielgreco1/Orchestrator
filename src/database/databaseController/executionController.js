// ExecutionController.js
import "dotenv/config";
import insertData from "../operations/insert.js";
import updateData from '../operations/update.js';

class ExecutionController {
  async start(automacao, hora) {
    const status = "Em execução";
    const query = `
      INSERT INTO LummaExecucoes(automacao, data_hora_inicio, status) 
      VALUES('${automacao}', '${hora}', '${status}')
      RETURNING id`;
    const id = await insertData(query);
    return id;
  }
  
  async updateSuccess(id, finalTime, duration) {
    const query = `UPDATE LummaExecucoes SET status = 'Finalizado', data_hora_fim = '${finalTime}', duracao_minutos = ${duration} WHERE id = '${id}'`;
    await updateData(query);
  }

  async updateError(id, finalTime, duration) {
    const query = `UPDATE LummaExecucoes SET status = 'Erro', data_hora_fim = '${finalTime}', duracao_minutos = ${duration} WHERE id = '${id}'`;
    await updateData(query);
  }
}

export default ExecutionController;
