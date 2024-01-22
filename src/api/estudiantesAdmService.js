import axios from './axiosConfig';

const API_HOST = process.env.REACT_APP_API_URL;
const API_ADMINISTRADOR = process.env.REACT_APP_API_ADMINISTRADOR;

const getRuta = (params) =>
  `${API_HOST}${API_ADMINISTRADOR}/estudiantes/${params}`;
const obtenerEstudiantesService = async () => {
  try {
    const resp = await axios.get(getRuta('obtener-estudiantes'));
    return resp;
  } catch (error) {
    console.error('Ocurrio un error ', error);
  }
};

const buscarEstudianteService = async (params) => {
  try {
    const resp = await axios.post(getRuta('buscar-estudiante'), params);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};

const registrarEInscribirEstudianteService = async(parmams) => {
  try {
    const resp = await axios.post(getRuta('registrar-inscribir-estudiante'), parmams);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
}

const modificarEstudianteService = async (params) => {
  try {
    const resp = await axios.put(getRuta('modificar-estudiante'), params);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};

const editarFotoEstudianteService = async(params) => {
  try {
    const ruta = getRuta('editar-foto-estudiante');
    const resp = await axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error);
  }
}

const editarArchivoEstudianteService = async(params) => {
  try {
    const ruta = getRuta('editar-documento-estudiante')
    const resp = await axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}

export {
  obtenerEstudiantesService,
  buscarEstudianteService,
  modificarEstudianteService,
  registrarEInscribirEstudianteService,
  editarFotoEstudianteService,
  editarArchivoEstudianteService
};
