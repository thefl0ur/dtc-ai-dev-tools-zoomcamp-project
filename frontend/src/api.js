import axios from 'axios';

const API_BASE_URL = process.env.VUE_APP_API_URL || 'http://backend:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;