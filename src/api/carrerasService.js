import axios from './axiosConfig';
const API_HOST = process.env.REACT_APP_API_URL;
const API_ADMINISTRADOR = process.env.REACT_APP_API_ADMINISTRADOR;
const getRuta = (ruta) => `${API_HOST}${API_ADMINISTRADOR}/carreras/${ruta}`;
const obtenerCarrerasTable = async (params) => {
  try {
    const resp = await axios.get(getRuta('obtener-carreras'));
    // const resp = axios.post(`${API_HOST}${API_ADMINISTRADOR}/carreras/crear-usuario`, params)
    return resp;
  } catch (error) {
    console.error('Ocurrio un error, ', error);
  }
};

const buscarCarrerasPorFacultad = async (params) => {
  try {
    const resp = await axios.post(getRuta('buscar-por-facultad'), params);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};
const modificarCarreraService = async (params) => {
  try {
    const resp = await axios.put(getRuta('modificar-carrera'), params);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};

const crearCarreraService = async (params) => {
  try {
    const resp = await axios.post(getRuta('crear-carrera'), params);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};
export {
  obtenerCarrerasTable,
  buscarCarrerasPorFacultad,
  modificarCarreraService,
  crearCarreraService,
};
