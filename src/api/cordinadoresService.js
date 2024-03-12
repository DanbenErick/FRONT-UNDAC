import axios from './axiosConfig'

const API_HOST = process.env.REACT_APP_API_URL;
const getRuta = (ruta) => `${API_HOST}/administrador/cordinadores/${ruta}`

const obtenerCordinadoresService = async () => {
    try {
        const ruta = getRuta('obtener-cordinadores')
        const resp = await axios.get(ruta)
        return resp
    }catch(error) {
        console.error('Ocurrio un error')
    }
}
const registrarCordinadorService = async(params) => {
    try {
        const ruta = getRuta('crear-cordinador')
        const resp = await axios.post(ruta, params)
        return resp
    }catch(error) {
        console.error('Ocurrio un error')
        throw error
    } 
}
const buscarCordinadorService = async(params) => {
    try {
        console.log(params)
        const ruta = getRuta('buscar-cordinador', params)
        const resp = await axios.post(ruta, params)
        return resp
    }catch(error) {
        console.error('Ocurrio un error', error)
    }
}

export { obtenerCordinadoresService, registrarCordinadorService, buscarCordinadorService }