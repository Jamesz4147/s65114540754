const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'db',   // ในคอนเทนเนอร์ใช้ 'db'
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'iot',
  port: Number(process.env.DB_PORT) || 5432,
  max: 10,
});
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};