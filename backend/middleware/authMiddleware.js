// middleware/authMiddleware.js
// Ini bagian "middleware" nya: memverifikasi token JWT sebelum request
// diteruskan ke module master / transaksi / report
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan. Silakan login ulang.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token tidak valid atau sudah kadaluarsa.' });
    }
    req.user = decoded; // { id, username, role }
    next();
  });
}

module.exports = { verifyToken };
