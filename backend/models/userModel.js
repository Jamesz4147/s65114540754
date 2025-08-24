const db = require('../config/dbConfig');

const User = {
  // สร้างผู้ใช้ใหม่
  create: async (data) => {
    const query = `
      INSERT INTO users (full_name, birth_date, phone, email, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;
    const result = await db.query(query, [
      data.full_name,
      data.birth_date,
      data.phone,
      data.email,
      data.password,
    ]);
    return result.rows[0]; // คืนค่า user ที่สร้างแล้ว
  },

  // ค้นหาผู้ใช้โดย email
  findOne: async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1 LIMIT 1';
    const result = await db.query(query, [email]);
    return result.rows[0] || null;
  },

  // ค้นหาผู้ใช้โดย id
  findById: async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1 LIMIT 1';
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  },

  // อัพเดตรหัสผ่าน
  updatePassword: async (email, newPassword) => {
    const query = 'UPDATE users SET password = $1 WHERE email = $2 RETURNING *';
    const result = await db.query(query, [newPassword, email]);
    return result.rows[0];
  },
};

module.exports = User;