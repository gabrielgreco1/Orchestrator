import pool from "./pool.js";

export default async function readData(query) {
    try {
      const res = await pool.query(query);
      return res.rows
    } catch (err) {
      console.error('Erro ao ler dados:', err);
    }
  };