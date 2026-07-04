require('dotenv').config();
const bcrypt = require('bcryptjs');
const { getConnection } = require('../config/db');

async function createUser() {
  const [, , username, password, role] = process.argv;

  if (!username || !password) {
    console.log('Cara pakai: node scripts/createUser.js <username> <password> <role>');
    process.exit(1);
  }

  const finalRole = role || 'staff';
  const hashedPassword = await bcrypt.hash(password, 10);

  const conn = await getConnection();
  await conn.query(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    [username, hashedPassword, finalRole]
  );

  console.log(`User "${username}" berhasil dibuat dengan role "${finalRole}".`);
  process.exit(0);
}

createUser().catch((err) => {
  console.error('Gagal membuat user:', err.message);
  process.exit(1);
});