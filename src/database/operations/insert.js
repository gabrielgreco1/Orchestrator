import pool from "./pool.js";

export default async function insertData(query) {
    try {
      const res = await pool.query(query);
      console.log('Execução gravada com sucesso.');
      return (res.rows[0].id)
    } catch (err) {
      console.error('Erro ao inserir dados:', err);
    }
  };