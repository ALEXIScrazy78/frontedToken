//Configuración de Axios para hacer peticiones al backend
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // URL de tu backend Flask

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener el token del localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Interceptor para añadir el token a las peticiones si está disponible
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;