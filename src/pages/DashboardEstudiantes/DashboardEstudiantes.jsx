import React, { useState } from 'react';
import AsideDashboardEstudiantes from './components/AsideDashEstudiantes';

import { Outlet, useNavigate } from 'react-router-dom';
import '../../assets/styles/DashboardEstudiantes.css';
import { message } from 'antd';
const DashboardEstudiantes = () => {
  const navigate = useNavigate()
  const [expiresAt, setExpiresAt] = useState(null); 
  const [token, setToken] = useState(null);

  React.useEffect(() => {
    const rol = localStorage.getItem('rol')
    if(rol !== 'ESTUDIANTE') navigate('/dashboard')
    setExpiresAt(localStorage.getItem('expiresAt'))
    setToken(localStorage.getItem('token'))
    if(!token || !expiresAt) {
      return;
    }
    const timeout = expiresAt - Date.now(); // obtener tiempo restante
    if(timeout < 60 * 1000) {
      message.open({
        type: 'info',
        content: 'Ya se vencio tu sesion',
        duration: 10,
      })
      localStorage.removeItem('token')
      localStorage.removeItem('nombre')
      localStorage.removeItem('expiresAt')
      localStorage.removeItem('dni')
      localStorage.removeItem('rol')
      navigate('/login-estudiante')
    }
  },[navigate, token, expiresAt])
  return (
    
    <div className="containerGridDashboardEstudiantesPage">
      <div className="asideContainerEstudiantes">
        <AsideDashboardEstudiantes />
      </div>
      <div className="mainContainerEstudiantes" style={{background: '#f3f3f3'}}>
        {/* <InscripcionDashboardEstudiante /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardEstudiantes;
