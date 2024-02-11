import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const t = localStorage.getItem('token');
  if (t) config.headers.Authorization = 'Bearer ' + t;
  return config;
});

api.interceptors.response.use(r => r, (err) => {
  if (err.response && err.response.status === 401) {
    localStorage.removeItem('token');
  }
  return Promise.reject(err);
});

export default api;
