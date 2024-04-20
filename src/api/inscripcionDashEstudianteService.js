import axios from './axiosConfig';
const API_HOST = process.env.REACT_APP_API_URL;
const API_GENERAL = process.env.REACT_APP_API_GENERAL;
const getRuta = (params) => `${API_HOST}${API_GENERAL}/estudiantes/${params}`;

const obtenerProcesosActivosService = async() => {
  try {
    const ruta = getRuta('obtener-procesos-home')
    const resp = await axios.get(ruta)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const inscribirEstudianteService  = async (params) => {
  try {
    const ruta = getRuta('inscribir-estudiante')
    const resp = await axios.post(ruta, params, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token-estudiante')}` },
    })
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
};
const registrarTestpsicologicoService  = async (params) => {
  try {
    const ruta = getRuta('registrar-test-psicologico')
    const resp = await axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
};

const subirFotoEstudianteService = async (params) => {
  try {
    const ruta = getRuta('subir-foto-estudiante')
    const resp = await axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
};

const subirDocumentacionEstudianteService = async(params) => {
  try {
    const ruta = getRuta('subir-documentos-estudiante')
    const resp = await axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}

const verificarEstudianteInscritoService = async(params) => {
  try {
    const ruta = getRuta('verificar-inscripcion-estudiante')
    const resp = await axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}

const obtenerDatosEstudianteCarnetService = async(params) => {
  try {
    const ruta = getRuta('obtener-datos-estudiante-carnet')
    const resp = await axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const validarRequisitosParaInscripcionService = async(params) => {
  try {
    const ruta = getRuta('validar-requisitos-para-inscripcion')
    const resp = await axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const verificarPagoEstudianteService = async(params) => {
  try {
    const ruta = getRuta('verificar-pago-requisitos')
    const resp = await axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}

const verificarTestpsicologicoEstudianteService = async(params) => {
  try {
    const ruta = getRuta('verificar-test-psicologico-inscrito',)
    const resp = await axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const verificarInscripcionEstudianteService = async(params) => {
  try {
    const ruta = getRuta('verificar-inscripcion-estudiante',params)
    const resp = await axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const verificarDatosComplementariosEstudiante = async(params) => {
  try {
    const ruta = getRuta('verificar-registro-complementario-estudiante',)
    const resp = await axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const verificarRegistroComplementarioEstudianteService = async(params) => {
  try {
    const ruta = getRuta('verificar-registro-complementario')
    const resp = await axios.get(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
  
}

export { 
  validarRequisitosParaInscripcionService,
  obtenerProcesosActivosService,
  inscribirEstudianteService,
  subirFotoEstudianteService,
  subirDocumentacionEstudianteService,
  registrarTestpsicologicoService,
  verificarEstudianteInscritoService,
  verificarRegistroComplementarioEstudianteService,
  verificarTestpsicologicoEstudianteService,
  verificarInscripcionEstudianteService,
  verificarDatosComplementariosEstudiante,
  verificarPagoEstudianteService,
  obtenerDatosEstudianteCarnetService
};
