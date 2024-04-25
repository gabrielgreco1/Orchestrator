import pool from "./pool.js";

export default async function updateData(query) {
    try {
      await pool.query(query);
      // await pool.query(setFinishTime, [hourDate, id]);
      console.log('Dados atualizados com sucesso.');
    } catch (err) {
      console.error('Erro ao atualizar dados:', err);
    }
  };

