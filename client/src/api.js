import axios from 'axios';

const API = axios.create({
  baseURL: 'https://finance-tracker-0uec.onrender.com/api',
});

export default API;
