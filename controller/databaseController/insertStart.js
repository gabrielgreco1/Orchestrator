import "dotenv/config";
import insertData from "../../database/insert.js";

export default async function start(automacao, hora) {
  // const hora = new Date().toISOString();
  const status = "Em execução";
  const query = `
    INSERT INTO LummaExecucoes(automacao, data_hora_inicio, status) 
    VALUES('${automacao}', '${hora}', '${status}')
    RETURNING id`;
  const id = insertData(query);
  return id;
}
