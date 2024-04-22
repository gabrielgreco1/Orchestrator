import pool from "./pool.js";

export default async function insertData(automacao, inicio, status) {
    const queryText = `
    INSERT INTO linkedin_scrapper(automacao, data_hora_inicio, status) 
    VALUES($1, $2, $3)
    RETURNING id`;
    try {
      const res = await pool.query(queryText, [automacao, inicio, status]);
      console.log('Execução gravada com sucesso.');
      return (res.rows[0].id)
    } catch (err) {
      console.error('Erro ao inserir dados:', err);
    }
  };