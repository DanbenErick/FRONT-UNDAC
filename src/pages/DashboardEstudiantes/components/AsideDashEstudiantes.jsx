import React, { useEffect, useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import '../../../assets/styles/DashboardEstudiantes.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { obtenerProcesosAbiertosAside } from '../../../api/apiInpputs';
import { DatabaseFilled } from '@ant-design/icons';
import { Button } from 'antd';

const AsideDashboardEstudiantes = () => {
  const [selectProcesos, setSelectProcesos] = React.useState(false);
  const [statusCepre, setStatusCepre] = React.useState(false);
  const [statusOrdinario, setStatusOrdinario] = React.useState(false);
  const [statusModalidades, setStatusModalidades] = React.useState(false);
  const [statusExtraOrdinario, setStatusExtraOrdinario] = React.useState(false)
  const navigate = useNavigate()
  const cerrarSesion = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('rol')
    localStorage.removeItem('nombre')
    navigate('/login-estudiante')
  }
  const getData = async() => {
    const response = await obtenerProcesosAbiertosAside()
    const {data} = response;
    
    data.forEach(element => {
      // debugger
      if(element.TIPO_PROCESO === 'C') setStatusCepre(true) 
      if(element.TIPO_PROCESO === 'O') setStatusOrdinario(true) 
      if(element.TIPO_PROCESO === 'M') setStatusModalidades(true) 
      if(element.TIPO_PROCESO === 'P') setStatusExtraOrdinario(true) 
    })
    setSelectProcesos(data)
  }
  const [showAside, setShowAside] = useState(false);

  const toggleAside = () => {
    setShowAside(!showAside);
  };
  useEffect(() => {
    getData()

  },[])
  return (
    <>
      <Button className='iconMenuAsideDashEstudiante' icon={<DatabaseFilled />} onClick={toggleAside}></Button>
      <aside className={`asideEstudiantesDash ${showAside ? 'show' : ''}`}>
        <div className="avatarEstudiante" style={{ marginBottom: '40px' }}>
          <div className="containerImgAvatar">
          <img className='imgAvatarEstudiante' src={process.env.PUBLIC_URL + '/logo.jpg'} alt="Logo avatar" />
          </div>
          <b>{localStorage.getItem('nombre')}</b>
          
        </div>
        <ul className="">
          <li>
            <NavLink to="/dashboard-estudiantes/home" activeclassname="active" >
              <i className="icon ri-home-fill"></i>
              Inicio
            </NavLink>
          </li>
          {
            statusCepre === true
            ?
            <li>
              <NavLink
                to="/dashboard-estudiantes/inscripcion-cepre"
                activeclassname="active">
                <i className="icon ri-file-paper-fill"></i>
                Inscripcion CEPRE
              </NavLink>
            </li>
            :
            ''
          }
          {
            statusOrdinario === true
            ?
              <li>
                <NavLink
                  to="/dashboard-estudiantes/inscripcion-ordinario"
                  activeclassname="active">
                  <i className="icon ri-file-paper-fill"></i>
                  Inscripcion Ordinario
                </NavLink>
              </li>
            :
            ''
          }
          {
            statusExtraOrdinario === true
            ?
              <li>
                <NavLink
                  to="/dashboard-estudiantes/inscripcion-extraordinario"
                  activeclassname="active">
                  <i className="icon ri-file-paper-fill"></i>
                  Inscripcion Extraordinario
                </NavLink>
              </li>
            :
            ''
          }
          {
            statusModalidades === true
            ?
              <li>
                <NavLink
                  to="/dashboard-estudiantes/inscripcion-modalidad"
                  activeclassname="active">
                  <i className="icon ri-file-paper-fill"></i>
                  Inscripcion Modalidades
                </NavLink>
              </li>
            :
            ''
          }
          <li>
            <NavLink
              to="/dashboard-estudiantes/test-psicologico"
              activeclassname="active">
                <i className="icon ri-flask-fill"></i>
              Test psicologico
            </NavLink>
            <NavLink
              to="/dashboard-estudiantes/pagos"
              activeclassname="active">
              <i className="icon ri-bank-card-fill"></i> 
              Pagos
            </NavLink>
          </li>
          <li>
            <a  onClick={cerrarSesion}>
              <i className="icon ri-logout-box-fill"></i>
              Salir
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default AsideDashboardEstudiantes;
