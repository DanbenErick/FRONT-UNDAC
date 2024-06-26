
import { abrirProcesoServiceApi, obtenerInscritosNombresService, obtenerInscritosPorAreaService, obtenerInscritosPorCarreraService, obtenerInscritosPorModalidadService, obtenerInscritosPorSedeService, obtenerProcesosFull, obtenerReportePDFPadron } from '../api/apiProcesos';

const getProcesosService = async () => {
  try {
    const resp = await obtenerProcesosFull();
    return resp;
  } catch (error) {
    console.error(`Error:`, error);
  }
};

const obtenerReportePDFPadronService = async(params) => {
  try {
    const resp = await obtenerReportePDFPadron(params);
    return resp
  }catch(error) {
    console.error('Error: ', error)
  }
}

const obtenerEstudiantesParaCSVService = async (params) => {
  try {
    const resp = await obtenerInscritosNombresService(params)
    return resp
  } catch (error) {
    console.error('Error: ', error)
  }
}
const abrirProcesoService = async(params) => {
  try {
    const resp = await abrirProcesoServiceApi(params);
    return resp;
  } catch (error) {
    console.error(`Error:`, error);
  }
}
const getInscritosPorProcesoSedeService = async (params) => {
  try {
    const resp = await obtenerInscritosPorSedeService(params);
    return resp;
  } catch (error) {
    console.error(`Error:`, error);
  }
}
const getInscritosPorProcesoCarrerasService = async (params) => {
  try {
    const resp = await obtenerInscritosPorCarreraService(params);
    return resp;
  } catch (error) {
    console.error(`Error:`, error);
  }
}
const getInscritosPorProcesoAreasService = async (params) => {
  try {
    const resp = await obtenerInscritosPorAreaService(params);
    return resp;
  } catch (error) {
    console.error(`Error:`, error);
  }
}
const getInscritosPorProcesoModalidadesService = async (params) => {
  try {
    const resp = await obtenerInscritosPorModalidadService(params);
    return resp;
  } catch (error) {
    console.error(`Error:`, error);
  }
}

export { 
  abrirProcesoService,
  getProcesosService,
  getInscritosPorProcesoAreasService,
  getInscritosPorProcesoCarrerasService,
  getInscritosPorProcesoModalidadesService,
  getInscritosPorProcesoSedeService,
  obtenerEstudiantesParaCSVService,
  obtenerReportePDFPadronService
};
