import { message } from 'antd';
import axios from './axiosConfig';
const API_HOST = process.env.REACT_APP_API_URL;
const API_ADMINISTRADOR = process.env.REACT_APP_API_ADMINISTRADOR;
const getRuta = (ruta) => `${API_HOST}${API_ADMINISTRADOR}/vouchers/${ruta}`;

const obtenerVouchersService = async () => {
  try {
    const resp = await axios.get(getRuta(`obtener-vouchers`));
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
    message.error('Ocurrio un error');
  }
};
const comprobarComprobantePagoService = async (params) => {
  try {
    const resp = await axios.get('http://api.undac.edu.pe/admision/92d5a7e264d88f03bd9e9eb1ff3317ee/2c23a4111a4a7d678527854953afba65/validate-payment', {
      params: params
    })
    return resp;
  }catch(error) {
    message.error('Ocurrio un error')
    console.error('Ocurrio un error', error)
  }
}
const buscarEstudianteVoucherService = async (params) => {
  try {
    const resp = axios.post(getRuta('buscar-estudiante-parar-voucher'), params);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};
const crearVoucherService = async (params) => {
  try {
    const resp = await axios.post(getRuta('crear-voucher'), params);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
    message.error('Ocurrio un error');
  }
};
const buscarVoucherService = async (params) => {
  try {
    const resp = await axios.post(getRuta('buscar-voucher'), params);
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
    message.error('Ocurrio un error');
  }
};


export {
  obtenerVouchersService,
  buscarEstudianteVoucherService,
  crearVoucherService,
  buscarVoucherService,
  comprobarComprobantePagoService
};
