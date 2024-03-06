import axios from './axiosConfig'

const API_HOST = process.env.REACT_APP_API_URL;
const getRuta = (params) => `${API_HOST}/administrador/resultados/${params}`;
const getRutaResultado = (params) => `${API_REPORTE}/${params}`;
const procesarSolapasService = async (params, params2) => {
    try {
        const ruta = getRuta('procesar-solapas-csv?ID_PROCESO='+params2.ID_PROCESO)
        const resp = await axios.post(ruta, params)
        return resp
    }catch(error) {
        console.log('Ocurrio un error', error)
    }
}
const procesarMultiPService = async(params, params2) => {
    try {
        const ruta = getRuta('procesar-multip-csv?ID_PROCESO='+params2.ID_PROCESO)
        const resp = await axios.post(ruta, params)
        return resp
    }catch(error) {
        console.log('Ocurrio un error', error)
    }
}
const obtenerPDFResultadosService = async(params) => {
    try {
        const ruta = getRutaResultado('generar-resultados-pdf?id_proceso='+ params.ID_PROCESO)
        const pdfData = resp.data;
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const newTab = window.open(url, '_blank');
        newTab.name = `resultados`
        return {ok: true, message: 'Se creo correctamente el pdf'}
    }catch(error) {
        console.error('Ocurrio un error', error)
    }
}

export { procesarSolapasService, procesarMultiPService, obtenerPDFResultadosService }