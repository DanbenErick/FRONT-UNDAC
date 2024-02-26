import axios from './axiosConfig';
const API_HOST = process.env.REACT_APP_API_URL;
const API_REPORTE = process.env.REACT_APP_API_URL_REPORTES
const getRuta = (params) => `${API_HOST}/administrador/procesos/${params}`;
const getRutaReporte = (params) => `${API_REPORTE}/${params}`;
const obtenerReportePDFPadron = async({ID_PROCESO, INICIO, FIN, AREA, AULA, FECHA, SEDE}) => {
  try {
    const ruta = getRutaReporte(`generar-pdf`)
    const resp = await axios.get(ruta, {
      params: {
        id_proceso: ID_PROCESO,
        inicio: INICIO,
        fin: FIN,
        area: AREA,
        aula: AULA,
        fecha: FECHA,
        sede: SEDE,
      }
    })
    const pdfData = resp.data;
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    return {ok: true, message: 'Se creo correctamente el pdf'}
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
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

export { obtenerProcesosFull, crearProceso, cerrarProceso, obtenerInscritosPorSedeService, obtenerInscritosPorCarreraService, obtenerInscritosPorModalidadService, obtenerInscritosPorAreaService, obtenerInscritosNombresService, obtenerReportePDFPadron};
