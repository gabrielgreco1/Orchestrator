import pool from "./pool.js";

export default async function deleteData(id) {
    const queryText = 'DELETE FROM execucoes WHERE id = $1';
    try {
      await pool.query(queryText, [id]);
      console.log('Dados deletados com sucesso.');
    } catch (err) {
      console.error('Erro ao deletar dados:', err);
    }
  };
  
  deleteData('47')