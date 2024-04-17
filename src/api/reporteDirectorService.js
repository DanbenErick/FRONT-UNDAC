import axios from './axiosConfig'

const API_HOST = process.env.REACT_APP_API_URL;
// const API_ADMINISTRADOR = process.env.REACT_APP_API_ADMINISTRADOR;
const getRuta = (ruta) => `${API_HOST}/general/resultados/${ruta}`;


const consultarResultadoPorEstudiante = async(params) => {
  try {
    const ruta = getRuta(`obtener-resultado-estudiante?DNI=${params.DNI}&PROCESO=${params.ID_PROCESO}`)
    const resp = await axios.get(ruta)
    return resp
  }catch(error) {
    console.error(error);
  }
}

export { consultarResultadoPorEstudiante }