import axios from 'axios';

const AlkiloApi = axios.create({
  baseURL: import.meta.env.VITE_ALKILO_API_URL,
});

//Interceptoors

export { AlkiloApi };
