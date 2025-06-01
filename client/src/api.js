import axios from 'axios';

const API = axios.create({
  baseURL: 'https://finance-tracker-0uec.onrender.com/api',
  withCredentials: true, // ⬅️ required to send cookies/auth headers across origins
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // (error) => Promise.reject(error)
);

export default API;
