import axios from './axiosConfig';
const API_HOST = process.env.REACT_APP_API_URL;
const API_ADMINISTRADOR = process.env.REACT_APP_API_ADMINISTRADOR;
const obtenerInscritosService = async () => {
  try {
    const resp = await axios.get(
      `${API_HOST}${API_ADMINISTRADOR}/inscritos/obtener-inscritos`,
    );
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};
const buscarInscritoService = async (params) => {
  try {
    const resp = await axios.post(
      `${API_HOST}${API_ADMINISTRADOR}/inscritos/buscar-inscrito`,
      params,
    );
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};
const modificarInscritoService = async (params) => {
  try {
    const resp = await axios.put(
      `${API_HOST}${API_ADMINISTRADOR}/inscritos/modificar-inscrito`,
      params,
    );
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};

const guardarInscripcionService = async(params) => {
  try {
    const resp = await axios.post(`${API_HOST}${API_ADMINISTRADOR}/inscritos/incribir-estudiante`,params);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
}

export {
  obtenerInscritosService,
  buscarInscritoService,
  modificarInscritoService,
  guardarInscripcionService
};
