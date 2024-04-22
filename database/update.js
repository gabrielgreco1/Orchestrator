import pool from "./pool.js";

export default async function updateData(id, status) {
  const queryText = 'UPDATE linkedin_scrapper SET status = $1 WHERE id = $2'
    try {
      await pool.query(queryText, [status, id]);
      console.log('Dados atualizados com sucesso.');
    } catch (err) {
      console.error('Erro ao atualizar dados:', err);
    }
  };

