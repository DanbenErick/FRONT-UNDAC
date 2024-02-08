
import { obtenerInscritosPorAreaService, obtenerInscritosPorCarreraService, obtenerInscritosPorModalidadService, obtenerInscritosPorSedeService, obtenerProcesosFull } from '../api/apiProcesos';

const getProcesosService = async () => {
  try {
    const resp = await obtenerProcesosFull();
    return resp;
  } catch (error) {
    console.error(`Error:`, error);
  }
};

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

export { getProcesosService, getInscritosPorProcesoAreasService, getInscritosPorProcesoCarrerasService, getInscritosPorProcesoModalidadesService, getInscritosPorProcesoSedeService };
