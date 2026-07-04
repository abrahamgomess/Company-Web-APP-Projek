# Login Page - Company Web App

## Pemetaan Requirement -> Implementasi

| Requirement Anda            | Dipakai di                                                                 |
|------------------------------|-----------------------------------------------------------------------------|
| **Node.js**                  | `backend/server.js` — server Express, dijalankan dengan `node`/`npm start` |
| **DevExtreme**                | Sudah di-install & di-import di `frontend/src/index.js` (`dx.light.css`). Belum dipakai di halaman login (login cukup form sederhana), tapi siap dipakai untuk **DataGrid** di module Master/Transaksi/Report nanti |
| **PrimeReact**                | `frontend/src/pages/Login.jsx` — komponen `Card`, `InputText`, `Password`, `Button`, `Toast` semua dari PrimeReact |
| **Middleware (microservice, Visual Studio)** | `backend/middleware/authMiddleware.js` — verifikasi JWT sebelum request masuk ke endpoint terproteksi. `backend/server.js` adalah microservice `auth-service` yang berdiri sendiri (bisa dibuka & dijalankan dari Visual Studio/VS Code) |
| **Database: MySQL**            | `backend/config/db.js` — pakai driver `mysql2` (connection pool). Kredensial diatur di `.env` (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`) |
| **Module: login**             | Selesai — `Login.jsx` (frontend) + `routes/auth.js` (backend) |
| **Module: master / transaksi / report** | Belum dibuat (menyusul). Sudah disiapkan tempatnya di `Dashboard.jsx` dan struktur microservice supaya masing-masing module bisa jadi service Node.js terpisah kalau perlu |
| **Hosting local: nginx**      | `nginx/nginx.conf.example` — nginx men-serve hasil build React sebagai static file, dan me-reverse-proxy semua request `/api/*` ke backend Node.js |

## Cara Menjalankan (Development)

### 1. Backend
```bash
cd backend
npm install
npm start
# jalan di http://localhost:5000
```

Buat database & tabel `users` dulu di MySQL pakai `backend/schema.sql`, lalu isi minimal 1 user dengan password yang sudah di-hash bcrypt (jangan plain text).

### 2. Frontend
```bash
cd frontend
npm install
npm start
# jalan di http://localhost:3000, langsung memanggil backend di :5000
```

### 3. Hosting Local dengan nginx (opsional, untuk simulasi production)
```bash
cd frontend
npm run build          # menghasilkan folder build/
```
Lalu edit `nginx/nginx.conf.example`:
- sesuaikan path `root` ke lokasi folder `frontend/build`
- copy isinya ke config nginx Anda, reload nginx (`nginx -s reload`)
- akses via `http://localhost` (port 80)

## Alur Login
1. User isi username & password di `Login.jsx` (PrimeReact form)
2. Frontend kirim POST ke `/api/auth/login` (lewat `authService.js`)
3. Request masuk ke Node.js (`server.js` -> `routes/auth.js`)
4. `routes/auth.js` query user ke database MySQL via `config/db.js`
5. Password dicocokkan pakai bcrypt, kalau cocok generate JWT token
6. Token disimpan di `localStorage`, dipakai lagi tiap kali akses module master/transaksi/report — diverifikasi oleh `authMiddleware.js`

