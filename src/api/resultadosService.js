import axios from './axiosConfig'

const API_HOST = process.env.REACT_APP_API_URL;
const getRuta = (params) => `${API_HOST}/administrador/resultados/${params}`;
const procesarSolapasService = async (params) => {
    try {
        const ruta = getRuta('procesar-solapas-csv')
        const resp = await axios.post(ruta, params)
        return resp
    }catch(error) {
        console.log('Ocurrio un error', error)
    }
}

export { procesarSolapasService }