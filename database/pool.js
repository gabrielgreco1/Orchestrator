import pg from 'pg'
import 'dotenv/config'
const { Pool } = pg;

const pool = new Pool({
    user: process.env.userDB,
    host: process.env.host,
    database: process.env.database,
    password: process.env.passwordDB,
    port: process.env.port,
    min: 1,
    ssl:{
        rejectUnauthorized: false
    }
});

export default pool;