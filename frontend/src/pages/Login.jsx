// src/pages/Login.jsx
// Ini HALAMAN LOGIN-nya. Semua komponen visual (Card, InputText, Password,
// Button, Toast) berasal dari PrimeReact — sesuai stack yang diminta.
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { login } from '../services/authService';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.current.show({
        severity: 'warn',
        summary: 'Peringatan',
        detail: 'Username dan password wajib diisi',
      });
      return;
    }

    setLoading(true);
    try {
      // Panggil Node.js middleware/microservice (routes/auth.js -> config/db.js)
      const data = await login(username, password);

      // Simpan token JWT untuk dipakai di module master/transaksi/report
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.current.show({
        severity: 'success',
        summary: 'Berhasil',
        detail: 'Login berhasil, mengalihkan...',
      });

      setTimeout(() => navigate('/dashboard'), 800);
    } catch (err) {
      const message =
        err.response?.data?.message || 'Login gagal, periksa koneksi server.';
      toast.current.show({ severity: 'error', summary: 'Gagal', detail: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f4f6f9',
      }}
    >
      <Toast ref={toast} />
      <Card title="Login" style={{ width: '380px' }}>
        <form onSubmit={handleLogin} className="p-fluid">
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="username">Username</label>
            <InputText
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="password">Password</label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              toggleMask
              placeholder="Masukkan password"
            />
          </div>

          <Button
            type="submit"
            label={loading ? 'Memproses...' : 'Login'}
            icon="pi pi-sign-in"
            loading={loading}
            className="p-button-primary"
          />
        </form>
      </Card>
    </div>
  );
}
