import pool from "./pool.js";

export default async function readData() {
    try {
      const res = await pool.query('SELECT * FROM execucoes');
      console.log('Dados:', res.rows);
    } catch (err) {
      console.error('Erro ao ler dados:', err);
    }
  };

readData()