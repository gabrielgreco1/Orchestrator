import updateData from '../../database/update.js'

async function updateSuccess(id, finalTime, duration){
  const query = `UPDATE LummaExecucoes SET status = 'Finalizado', data_hora_fim = '${finalTime}' , duracao_minutos = ${duration} WHERE id = '${id}'`
  updateData(query)
}

async function updateError(id, finalTime, duration){
  const query = `UPDATE LummaExecucoes SET status = 'Erro', data_hora_fim = '${finalTime}', duracao_minutos = ${duration} WHERE id = '${id}'`
  updateData(query)
}

export { updateSuccess, updateError }