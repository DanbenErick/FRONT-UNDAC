import React, { useEffect, useState } from 'react';
import AsideComponent from '../../components/Aside/AsideComponent';
import { Outlet, useNavigate } from 'react-router-dom';
import { message } from 'antd';

const DashboardPage = () => {
  const navigate = useNavigate()
  const [expiresAt, setExpiresAt] = useState(null); 
  const [token, setToken] = useState(null); 
  useEffect(() => {
    const rol = localStorage.getItem('rol')
    if(rol !== 'ADMIN_DARAS') navigate('/dashboard-estudiantes/home') 
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
      navigate('/login')
    }
  },[navigate, token, expiresAt])
  return (
    <div className="containerGridDashboardPage">
      <div className="asideContainer">
        <AsideComponent />
      </div>
      <div className="mainContainer">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
