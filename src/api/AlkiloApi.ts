import axios from 'axios';

const AlkiloApi = axios.create({
  baseURL: import.meta.env.VITE_ALKILO_API_URL,
});

//Interceptoors

AlkiloApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { AlkiloApi };
