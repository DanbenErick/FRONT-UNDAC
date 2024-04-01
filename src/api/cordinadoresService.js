import axios from './axiosConfig'

const API_HOST = process.env.REACT_APP_API_URL;
const API_REPORTE = process.env.REACT_APP_API_URL_REPORTES
const getRuta = (ruta) => `${API_HOST}/administrador/cordinadores/${ruta}`
const getRutaReporte = (ruta) => `${API_REPORTE}/${ruta}`

const obtenerCordinadoresService = async () => {
    try {
        const ruta = getRuta('obtener-cordinadores')
        const resp = await axios.get(ruta)
        return resp
    } catch (error) {
        console.error('Ocurrio un error')
    }
}
const registrarCordinadorService = async (params) => {
    try {
        const ruta = getRuta('crear-cordinador')
        const resp = await axios.post(ruta, params)
        return resp
    } catch (error) {
        console.error('Ocurrio un error')
        throw error
    }
}
const modificarEstadoCordinador = async (params) => {
    try {
        const ruta = getRuta(`modificar-estado-cordinador?dni=${params.dni}&estado=${params.estado}`)
        const resp = await axios.get(ruta)
    } catch (error) {
        console.error('Ocurrio un error')
        throw error
    }
}
const buscarCordinadorService = async (params) => {
    try {
        console.log(params)
        const ruta = getRuta('buscar-cordinador', params)
        const resp = await axios.post(ruta, params)
        return resp
    } catch (error) {
        console.error('Ocurrio un error', error)
    }
}
const obtenerIngresantesService = async (params) => {
    try {
        const ruta = getRuta('obtener-ingresantes')
        const resp = await axios.get(ruta)
        return resp
    } catch (error) {
        console.error('Ocurrio un error', error)
    }
}
const obtenerIngresanteParaConstanciaPorDNIService = async (params) => {
    try {
        const ruta = getRuta(`obtener-ingresantes-para-contancia-pro-dni-y-proceso?dni=${params.dni}&proceso=${params.proceso}`)
        const resp = await axios.get(ruta)
        return resp
    } catch (error) {
        console.error('Ocurrio un erro', error)
    }
}
const generarConstanciasBloque = async(params) => {
    try {
        const ruta = getRutaReporte(`generar-constancia-bloque?id_proceso=${params.proceso}`)
        const resp = await axios.get(ruta)
        const pdfData = resp.data;
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const newTab = window.open(url, '_blank');
        return {ok: true, message: 'Se creo correctamente el pdf'}
    }catch(error) {
        console.error('Ocurrio un error', error)
    }
}
const generarConstanciaEstudiante = async(params) => {
    try {
        const ruta = getRutaReporte(`generar-constancia-estudiante?dni=${params.dni}&id_proceso=${params.proceso}`)
        const resp = await axios.get(ruta)
        const pdfData = resp.data;
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const newTab = window.open(url, '_blank');
        return {ok: true, message: 'Se creo correctamente el pdf'}
    }catch(error){
        console.error('Ocurrio un error', error)
    }
}

export { generarConstanciasBloque, generarConstanciaEstudiante, obtenerCordinadoresService, registrarCordinadorService, buscarCordinadorService, modificarEstadoCordinador, obtenerIngresantesService, obtenerIngresanteParaConstanciaPorDNIService }