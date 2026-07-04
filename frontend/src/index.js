// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// CSS PrimeReact (tema + core + icons)
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// CSS DevExtreme (dipakai nanti untuk module master/transaksi/report)
import 'devextreme/dist/css/dx.light.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
