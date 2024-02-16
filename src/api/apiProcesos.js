import axios from './axiosConfig';
const API_HOST = process.env.REACT_APP_API_URL;
const getRuta = (params) => `${API_HOST}/administrador/procesos/${params}`;
const obtenerProcesosFull = async () => {
  try {
    const ruta = getRuta('obtener-procesos')
    const resp = await axios.get(ruta);
    return resp;
  } catch (error) {
    console.error('ERROR: ', error);
  }
};
const crearProceso = async (params) => {
  try {
    const ruta = getRuta('crear-proceso')
    const resp = await axios.post(ruta,params);
    return resp;
  } catch (error) {
    console.error('ERROR: ', error);
  }
};
const cerrarProceso = async (params) => {
  try {
    const ruta = getRuta('cerrar-proceso')
    const resp = await axios.post(ruta, params);
    return resp;
  } catch (error) {
    console.error('ERROR: ', error);
  }
};
const obtenerInscritosNombresService = async(params) => {
  try {
    const ruta = getRuta('obtener-inscritos-datos-estudiante')
    const resp = axios.post(ruta,params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const obtenerInscritosPorSedeService = async (params) => {
  try {
    const ruta = getRuta('obtener-inscritos-por-sede')
    const resp = await axios.post(ruta, params);
    return resp;
  }catch (error) {
    console.error(`Error:`, error);
  }
}
const obtenerInscritosPorCarreraService = async (params) => {
  try {
    const ruta = getRuta('obtener-inscritos-por-carrera')
    const resp = await axios.post(ruta, params);
    return resp;
  }catch (error) {
    console.error(`Error:`, error);
  }
}
const obtenerInscritosPorAreaService = async (params) => {
  try {
    const ruta = getRuta('obtener-inscritos-por-area')
    const resp = await axios.post(ruta, params);
    return resp;
  }catch (error) {
    console.error(`Error:`, error);
  }
}
const obtenerInscritosPorModalidadService = async (params) => {
  try {
    const ruta = getRuta('obtener-inscritos-por-modalidad')
    const resp = await axios.post(ruta, params);
    return resp;
  }catch (error) {
    console.error(`Error:`, error);
  }
}

export { obtenerProcesosFull, crearProceso, cerrarProceso, obtenerInscritosPorSedeService, obtenerInscritosPorCarreraService, obtenerInscritosPorModalidadService, obtenerInscritosPorAreaService, obtenerInscritosNombresService};
