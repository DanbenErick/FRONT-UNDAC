import axios from './axiosConfig'
const API_HOST = process.env.REACT_APP_API_URL;
const API_ADMINISTRADOR = process.env.REACT_APP_API_ADMINISTRADOR;
const getRuta = (ruta) => `${API_HOST}${API_ADMINISTRADOR}/aulas/${ruta}`;
const obtenerAulasService = async() => {
  try {
    const ruta = getRuta('obtener-aulas')
    const resp = await axios.get(ruta)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const crearAulaService = async(params) => {
  try {
    const ruta = getRuta('crear-aula')
    const resp = await axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const cerrarAulaService = async(params) => {
  try {
    const ruta = getRuta('cerrar-aula')
    const resp = await axios.put(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const abrirAulaService = async(params) => {
  try {
    const ruta = getRuta('abrir-aula')
    const resp = await axios.put(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const generarPDFEstudiantesAulaService = async(params) => {
  try {
    const ruta = getRuta('generar-pdf')
    const resp = await axios.post(ruta, params, { responseType: 'blob' })

    // Verificar si la respuesta indica un error
    if (resp.data.error) {
      throw new Error(resp.data.message);
    }

    // Crear una URL para el Blob y abrir una nueva pestaña
    const blob = new Blob([resp.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');

    // Liberar recursos después de abrir el enlace
    window.URL.revokeObjectURL(url);

    return {ok: true, message: 'Se genero correctamente el reporte'}
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const modificarAulaService = async(params) => {
  try {
    const ruta = getRuta('modificar-aula')
    const resp = await axios.put(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const buscarAulaService = async(params) => {
  try {
    const ruta = getRuta('buscar-aula')
    const resp = await axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}

export {
  obtenerAulasService,
  crearAulaService,
  modificarAulaService,
  buscarAulaService,
  abrirAulaService,
  cerrarAulaService,
  generarPDFEstudiantesAulaService
}