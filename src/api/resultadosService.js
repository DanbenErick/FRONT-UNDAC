import axios from './axiosConfig'

const API_HOST = process.env.REACT_APP_API_URL;
const getRuta = (params) => `${API_HOST}/administrador/resultados/${params}`;
const procesarSolapasService = async (params) => {
    try {
        const ruta = getRuta('procesar-solapas-csv?ID_PROCESO='+params.ID_PROCESO)
        const resp = await axios.post(ruta, params)
        return resp
    }catch(error) {
        console.log('Ocurrio un error', error)
    }
}
const procesarMultiPService = async(params) => {
    try {
        const ruta = getRuta('procesar-multip-csv?ID_PROCESO'+params.ID_PROCESO)
        const resp = await axios.post(ruta, params)
        return resp
    }catch(error) {
        console.log('Ocurrio un error', error)
    }
}

export { procesarSolapasService, procesarMultiPService }