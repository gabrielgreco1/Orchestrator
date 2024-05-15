import pool from "./pool.js";

export default async function createTable() {
  const queryText =
    `CREATE TABLE LummaExecucoes (
      id SERIAL PRIMARY KEY,
      automacao VARCHAR(255) NOT NULL,
	    quantidade INTEGER, 
	    duracao_minutos INTEGER,
      data_hora_inicio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      data_hora_fim TIMESTAMP,
      status VARCHAR(50)  
      );`;

  try {
    await pool.query(queryText);
    console.log('Execução realizada com sucesso.');
  } catch (err) {
    console.error('Erro ao executar:', err);
  }
};

createTable();


