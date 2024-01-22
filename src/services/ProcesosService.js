
import { obtenerInscritosPorSedeService, obtenerProcesosFull } from '../api/apiProcesos';

const getProcesosService = async () => {
  try {
    const resp = await obtenerProcesosFull();
    return resp;
  } catch (error) {
    console.error(`Error:`, error);
  }
};

const getInscritosPorProcesoService = async (params) => {
  try {
    const resp = await obtenerInscritosPorSedeService(params);
    return resp;
  } catch (error) {
    console.error(`Error:`, error);
  }
}

export { getProcesosService, getInscritosPorProcesoService };
