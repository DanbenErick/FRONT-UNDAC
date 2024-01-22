import { message } from 'antd';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
  
  baseURL: process.env.REACT_APP_API_URL, 
});

// Añade un interceptor para agregar el token a todas las solicitudes
instance.interceptors.request.use(
  (config) => {
    // Obtén el token del localStorage
    const token = localStorage.getItem('token'); // Reemplaza 'miToken' con la clave real utilizada para almacenar el token

    // Añade el token al encabezado de autorización si está presente
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Añade un interceptor para manejar los errores de respuesta
instance.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, simplemente la devolvemos
    return response;
  },
  (error) => {
    // Si el error tiene un código de estado 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      // Realiza acciones específicas para manejar el 401, por ejemplo, redirige al usuario al login
      // y borra los datos del localStorage
      message.error('')
      console.error('Tu token ya vencio Error 401: No autorizado');

      localStorage.removeItem('token')
      localStorage.removeItem('expiresAt')
      localStorage.removeItem('dni')
      localStorage.removeItem('nombre')
      localStorage.removeItem('rol')
      const navigate = useNavigate();
      navigate('/login-estudiante');
      // window.location.href = '/login'; // Descomenta si deseas redirigir al usuario al login
      // localStorage.removeItem('token'); // Descomenta si deseas borrar el token del localStorage
    }

    // Devolvemos el error para que pueda ser manejado en el código que realiza la solicitud
    return Promise.reject(error);
  }
);

export default instance;