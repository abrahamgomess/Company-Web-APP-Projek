-- Skema tabel users untuk MySQL
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'staff',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contoh insert user (password harus di-hash dulu pakai bcrypt sebelum insert,
-- jangan insert manual seperti ini di production)
-- INSERT INTO users (username, password, role) VALUES ('admin', '$2a$10$hashedpasswordhere', 'admin');
