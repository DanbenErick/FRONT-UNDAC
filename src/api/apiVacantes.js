import axios from './axiosConfig';


const obtenerVacantesProcesoActivo = async () => {
  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_ADMINISTRADOR}/vacantes/obtener-vacantes`,
    );
    return resp;
  } catch (error) {
    console.error('ERROR: ', error);
  }
};
const obtenerVacantesPorId = async (params) => {
  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_ADMINISTRADOR}/vacantes/obtener-vacantes-proceso?ID_PROCESO=${params}`,
    );
    return resp;
  } catch (error) {
    console.error('ERROR: ', error);
  }
};
const crearVacante = async (params) => {
  try {
    const resp = await axios.post(
      `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_ADMINISTRADOR}/vacantes/crear-vacante`,
      params,
    );
    return resp;
  } catch (error) {
    console.error('ERROR: ', error);
  }
};
const verificarDisponibilidadProceso = async (params) => {
  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_ADMINISTRADOR}/vacantes/verificar-proceso-id?ID_PROCESO=${params}`,
    );
    return resp;
  } catch (error) {
    console.error('ERROR: ', error);
  }
};
const obtenerCarrerasPorProcesoInput = async () => {
  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_ADMINISTRADOR}/vacantes/obtener-carreras-inputs`,
    );
    return resp;
  } catch (error) {
    console.error('ERROR: ', error);
  }
};

export {
  obtenerVacantesProcesoActivo,
  obtenerVacantesPorId,
  crearVacante,
  verificarDisponibilidadProceso,
  obtenerCarrerasPorProcesoInput,
};
