// src/services/authService.js
// Bagian ini yang "menghubungkan" React ke Node.js middleware/microservice
import axios from 'axios';

// Saat development: langsung ke backend Node.js (http://localhost:5000)
// Saat production/local hosting: dilewatkan nginx, jadi cukup "/api"
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

export async function login(username, password) {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    username,
    password,
  });
  return response.data; // { message, token, user }
}
