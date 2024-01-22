// useAuth.js

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  loginUsuarioAdminService,
  crearUsuarioAdminService,
  cerrarSesionUsuarioAdminService,
} from '../api/authService';

import { message } from 'antd';
import { AuthContext } from '../providers/AuthProvider';

const useAuthAdmin = () => {
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const login = async (params) => {
    const response = await loginUsuarioAdminService(params);
    if (!response.data.ok) {
      message.info('No se encontro usuario o contraseña errada');
      return null;
    }
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('nombre', response.data.name);
    localStorage.setItem('rol', 'ADMIN_DARAS');
    localStorage.setItem('expiresAt', response.data.expiresAt);
    localStorage.setItem('dni', response.data.dni || '');
    message.success('Autenticado correctamente');
    context.setUser(response.data);
    // setUser(response.data);
    navigate('/dashboard/procesos');
  };

  const register = async (params) => {
    await crearUsuarioAdminService(params);
    navigate('/dashboard/procesos');
  };

  const logout = async (params) => {
    await cerrarSesionUsuarioAdminService(params);
    localStorage.removeItem('token');
    navigate('/login');
  };
  const logoutEstudiante = async() => {
    // await cerrarSesionUsuarioAdminService();
    localStorage.removeItem('token');
    navigate('/login-estudiante');
  }
 
  return {
    // user,
    login,
    register,
    logout,
  };
};

export default useAuthAdmin;
