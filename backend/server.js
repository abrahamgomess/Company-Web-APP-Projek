// server.js
// Ini adalah microservice "auth-service".
// Nanti module master, transaksi, report bisa jadi microservice terpisah
// (auth-service, master-service, transaksi-service, report-service)
// yang semuanya di-reverse-proxy oleh nginx jadi satu domain.
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const { verifyToken } = require('./middleware/authMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint publik
app.use('/api/auth', authRoutes);

// Contoh endpoint yang dilindungi middleware (dipakai nanti utk module master/transaksi/report)
app.get('/api/me', verifyToken, (req, res) => {
  res.json({ message: 'Token valid', user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Auth microservice jalan di http://localhost:${PORT}`);
});
