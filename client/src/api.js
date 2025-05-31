import axios from 'axios';

const API = axios.create({
  baseURL: 'https://finance-tracker-0uec.onrender.com/api',
});

// Automatically attach token from localStorage (if available)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
