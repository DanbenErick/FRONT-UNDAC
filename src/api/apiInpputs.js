import axios from './axiosConfig';

const API_HOST = process.env.REACT_APP_API_URL;
const getRuta = (params) => `${API_HOST}/input-controls/${params}`;

const buscarAulaPorTurnoForm = async (params) => {
  try {
    const ruta = getRuta('buscar-aula-por-turno');
    const resp = await axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
} 
const obtenerProcesosForm = async () => {
  try {
    const ruta = getRuta('obtener-procesos')
    const response = await axios.get(ruta);
    return response;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
const obtenerCarrerasForm = async () => {
  try {
    const ruta = getRuta('obtener-carreras')
    const response = await axios.get(ruta);
    return response;
  } catch (error) {
    console.error('Error', error);
  }
};
const obtenerCarrerasCodigoForm = async () => {
  try {
    const ruta = getRuta('obtener-carreras-codigo')
    const response = await axios.get(ruta);
    return response;
  } catch (error) {
    console.error('Error', error);
  }
};
const obtenerFacultadesForm = async () => {
  try {
    const ruta = getRuta('obtener-facultades')
    const resp = await axios.get(ruta);
    return resp;
  } catch (error) {
    console.error('Error', error);
  }
};
const obtenerProcesoActivoForm = async (params) => {
  try {
    const ruta = getRuta('obtener-proceso-activo')
    const resp = await axios.post(ruta, params);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};
const obtenerTodosLosProcesosActivosForm = async(params) => {
  try {
    const ruta = getRuta('obtener-todos-procesos-activo')
    const resp = await axios.get(ruta, { params })
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error);
  }
}
const obtenerDiscapacidadesForm = async () => {
  try {
    const ruta = getRuta('obtener-discapacidades')
    const resp = await axios.get(ruta);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};
const obtenerRazasEtnicasForm = async () => {
  try {
    const ruta = getRuta('obtener-razas-etnicas')
    const resp = await axios.get(ruta);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};
const obtenerUbicacionesForm = async () => {
  try {
    const ruta = getRuta('obtener-ubicaciones')
    const resp = await axios.get(ruta);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};
const obtenerDepartamentosForm = async () => {
  try {
    const ruta = getRuta('obtener-departamentos')
    const resp = await axios.get(ruta);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};
const obtenerProcesosAbiertosAside = async () => {
  try {
    const ruta = getRuta('obtener-procesos-abiertos')
    const resp = await axios.get(ruta);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
}
const obtenerProvinciasForm = async (params) => {
  try {
    const ruta = getRuta('obtener-provincias')
    const resp = await axios.get(ruta,{params: { ...params }});
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};
const obtenerDistritosForm = async (params) => {
  try {
    const ruta = getRuta('obtener-distritos')
    const resp = await axios.get(ruta, { params: { ...params }});
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};
const obtenerModalidadesForm = async (params) => {
  try {
    const ruta = getRuta('obtener-modalidades')
    const resp = await axios.get(ruta);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
}
const obtenerCarrerasPorModalidadesForm = async(params) => {
  try {
    const ruta = getRuta('obtener-carreras-por-modalidades')
    const resp = await axios.post(ruta, params);
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error);
  }
}

export {
  obtenerCarrerasPorModalidadesForm,
  obtenerModalidadesForm,
  obtenerCarrerasForm,
  obtenerProcesosForm,
  obtenerFacultadesForm,
  obtenerCarrerasCodigoForm,
  obtenerProcesoActivoForm,
  obtenerDiscapacidadesForm,
  obtenerRazasEtnicasForm,
  obtenerUbicacionesForm,
  obtenerDepartamentosForm,
  obtenerProvinciasForm,
  obtenerDistritosForm,
  buscarAulaPorTurnoForm,
  obtenerProcesosAbiertosAside,
  obtenerTodosLosProcesosActivosForm
};
