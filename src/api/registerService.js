import axios from 'axios';
const API_HOST = process.env.REACT_APP_API_URL;
const API_SISTEMA = process.env.REACT_APP_API_SISTEMA;
const crearUsuarioAdminService = async (params) => {
  try {
    const resp = axios.post(
      `${API_HOST}${API_SISTEMA}/admin/crear-usuario`,
      params,
    );
    return resp;
  } catch (error) {
    console.error('Ocurrio un error, ', error);
  }
};
const loginUsuarioAdminService = async (params) => {
  try {
    const resp = axios.post(
      `${API_HOST}${API_SISTEMA}/admin/login-usuario`,
      params,
    );
    return resp;
  } catch (error) {
    console.error('Ocurrio un error, ', error);
  }
};

export { crearUsuarioAdminService, loginUsuarioAdminService };
