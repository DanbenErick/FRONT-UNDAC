import axios from './axiosConfig';

const obtenerProcesos = async () => {
  try {
    const response = axios.get(
      'http://localhost:3500/input-controls/obtener-procesos',
    );
    return response;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export { obtenerProcesos };
