import axios from './axiosConfig'

const API_HOST = process.env.REACT_APP_API_URL;
const getRuta = (params) => `${API_HOST}/general/reportes/${params}`;

const obtenerReportePrimerPuestosService = async(params) => {
  try {
    const ruta = getRuta('reporte-primeros-puestos?PROCESO='+params.PROCESO+'&COD_CARRERA='+params.COD_CARRERA);
    const resp = await axios.get(ruta);
    return resp;
  }catch(err) {
    console.error('Ocurrio un error', err)
  }
}
const obtenerReportePagosService = async(params) => {
  try {
    const ruta = getRuta('reporte-pagos?PROCESO='+params.PROCESO+'&COD_CARRERA='+params.COD_CARRERA);
    const resp = await axios.get(ruta);
    return resp;
  }catch(err) {
    console.error('Ocurrio un error', err)
  }
}
const obtenerReportedeEstudiantesPorAula = async(params) => {
  try {
    const ruta = getRuta(`reporte-estudiantes-por-aula?PROCESO=${params.PROCESO}`)
    const resp = await axios.get(ruta);
    return resp;
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const obtenerReportedeInscritosPorProceso = async(params) => {
  try {
    const ruta = getRuta(`reporte-inscritos-por-proceso?PROCESO=${params.PROCESO}&COD_CARRERA=${params.COD_CARRERA}`)
    const resp = await axios.get(ruta);
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const obtenerReportePorCarrerasService = async(params) => {
  try {
    const ruta = getRuta(`reporte-inscritos-por-carrera?PROCESO=${params.PROCESO}`)
    const resp = await axios.get(ruta)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const obtenerReportePorSedeService = async(params) => {
  try {
    const ruta = getRuta(`reporte-inscritos-por-sede?PROCESO=${params.PROCESO}`)
    const resp = await axios.get(ruta);
    return resp;
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}

export { 
  obtenerReportePrimerPuestosService,
  obtenerReportePagosService,
  obtenerReportedeEstudiantesPorAula,
  obtenerReportedeInscritosPorProceso,
  obtenerReportePorSedeService,
  obtenerReportePorCarrerasService,
}