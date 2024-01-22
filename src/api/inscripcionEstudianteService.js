import axios from './axiosConfig';
const API_HOST = process.env.REACT_APP_API_URL;
const API_GENERAL = process.env.REACT_APP_API_GENERAL;
const getRuta = (params) => `${API_HOST}${API_GENERAL}/estudiantes/${params}`;

const consultarEstudianteExisteService = async (params) => {
  try {
    const resp = await axios.post(getRuta('consultar-dni'), params);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};
const registrarEstudianteService = async (params) => {
  try {
    const resp = await axios.post(getRuta('registrar-estudiante'), params);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};

export { consultarEstudianteExisteService, registrarEstudianteService };
