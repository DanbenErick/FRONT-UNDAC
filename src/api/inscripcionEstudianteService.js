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
const consultarDatosEstudiantePorDNI = async(params) => {
  try {
    const resp = await axios.get(`https://api.perudevs.com/api/v1/dni/simple?document=${params.dni}&key=${process.env.REACT_APP_API_KEY_DNI}`)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const registrarEstudianteService = async (params) => {
  try {
    params.AP_PATERNO = params.AP_PATERNO.toUpperCase()
    params.AP_MATERNO = params.AP_MATERNO.toUpperCase()
    params.AP_NOMBRES = params.AP_NOMBRES.toUpperCase()
    const resp = await axios.post(getRuta('registrar-estudiante'), params);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};

export { consultarEstudianteExisteService, registrarEstudianteService,consultarDatosEstudiantePorDNI };
