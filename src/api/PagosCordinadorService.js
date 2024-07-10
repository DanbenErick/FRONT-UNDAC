import axios from './axiosConfig'


const API_HOST = process.env.REACT_APP_API_URL;
// const API_ADMINISTRADOR = process.env.REACT_APP_API_ADMINISTRADOR;
const getRuta = (ruta) => `${API_HOST}/general/estudiantes/${ruta}`;


const obtenerPagosEstudiante = async(params) => {
  try {
    const ruta = getRuta(`obtener-pagos-para-validar`)
    const resp = await axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error(error);
  }
}

const validarPagoCordinadorService = async(params) => {
  try {
    const ruta = getRuta('validar-pagos-cordinador')
    const resp = await axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error(error);
  }
}

export { obtenerPagosEstudiante, validarPagoCordinadorService }