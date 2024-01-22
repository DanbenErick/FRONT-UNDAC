import axios from 'axios'

const API_HOST = process.env.REACT_APP_API_URL;
const getRuta = (params) => `${API_HOST}/general/resultados/${params}`;
const obtenerResultadosPorCarreraYProcesoService = async(params) => {
  try {
    const ruta = getRuta(`/obtener-resultados-carrera/${params}`)
    const resp = await axios.get(ruta);
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error);
  }
}

export { obtenerResultadosPorCarreraYProcesoService }