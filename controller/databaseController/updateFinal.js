import updateData from '../../database/update.js'

async function updateSuccess(id){
  const finalTime = new Date().toISOString()
  const query = `UPDATE LummaExecucoes SET status = 'Finalizado', data_hora_fim = '${finalTime}' WHERE id = '${id}'`
  updateData(query)
}

async function updateError(id){
  const finalTime = new Date().toISOString()
  const query = `UPDATE LummaExecucoes SET status = 'Erro', data_hora_fim = '${finalTime}' WHERE id = '${id}'`
  updateData(query)
}

export { updateSuccess, updateError }