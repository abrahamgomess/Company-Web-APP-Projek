// src/pages/Dashboard.jsx
// Placeholder setelah login berhasil.
// Menu "Module Master", "Transaksi", "Report" nanti dipasang di sini,
// masing-masing bisa pakai DevExtreme DataGrid untuk tampilkan data dari SQL Server/MySQL/Postgre.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Selamat datang, {user.username || 'User'}</h2>
      <p>Role: {user.role}</p>
      <p style={{ color: '#666' }}>
        Di sinilah nanti menu Module Master, Transaksi, dan Report akan
        ditempatkan (masing-masing bisa pakai DevExtreme DataGrid/Form).
      </p>
      <Button label="Logout" icon="pi pi-sign-out" onClick={handleLogout} className="p-button-danger" />
    </div>
  );
}
