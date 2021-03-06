import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5001/api",
});

api.interceptors.request.use(function (config) {
  
  const token = sessionStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;