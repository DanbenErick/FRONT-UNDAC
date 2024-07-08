import React, { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { obtenerProcesosActivosService, validarRequisitosParaInscripcionService, verificarDatosComplementariosEstudiante, verificarEstudianteInscritoService, verificarPagoEstudianteService, verificarTestpsicologicoEstudianteService } from "../../../api/inscripcionDashEstudianteService";
import { Button } from "antd";
import SpinnerComponent from '../../../components/Spinner'

import './HomeDashEstudiantes.css'
const HomeDashEstudinte = () => {



  const [loading, setLoading] = useState(true)
  const [procesosActivos, setProcesosActivos] = useState([])
  const [statusProcesos, setStatusProcesos] = useState([])
  
  
  const verificarStates =  async () => {
    
    let ultimoProcesoActivo = await obtenerProcesosActivosService()
    ultimoProcesoActivo = ultimoProcesoActivo.data
    setProcesosActivos(ultimoProcesoActivo)
    let data_object = []
    for(let i = 0; i < ultimoProcesoActivo.length; i++) {
      
      console.log("procesos Activos", ultimoProcesoActivo)
      const {data} = await validarRequisitosParaInscripcionService({ DNI: localStorage.getItem('dni'), TIPO_PROCESO: ultimoProcesoActivo[i].TIPO_PROCESO , PROCESO: ultimoProcesoActivo[i].ID})
      data_object.push({
        proceso: ultimoProcesoActivo[i].ID,
        inscrito: data.inscrito,
        datos_complementarios: data.datos_complementarios,
        test_psicologico: data.test_psicologico,
        pago: data.pago,
        carnet: data.carnet
      })
      
    }
    setStatusProcesos(data_object)
  }
  useEffect(() => {
    setLoading(true)
      verificarStates()
    setLoading(false)
    
  }, [])
  return (
    <>
      {loading ? <SpinnerComponent /> : ''}
      <h1>Bienvenido {localStorage.getItem('nombre')}</h1>
      <div className="gridHomePageDashboardEstudiante">
        <div className="containerEnlaces">
          <h4>Contenido</h4>
          <ul>
            <li>
              <a href="https://www.facebook.com/admisionundac/" rel="noopener noreferrer" target="_blank">
                Reglamento del proceso de admision
                <i className="ri-arrow-right-line"></i>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/admisionundac/" rel="noopener noreferrer" target="_blank">
                Guia de Inscripcion - Pregrado
                <i className="ri-arrow-right-line"></i>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/admisionundac/" rel="noopener noreferrer" target="_blank">
                Guia de Inscripcion - Segunda Especilidad
                <i className="ri-arrow-right-line"></i>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/admisionundac/" rel="noopener noreferrer" target="_blank">
                Catalogo de Pregrado<i className="ri-arrow-right-line"></i>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/admisionundac/" rel="noopener noreferrer" target="_blank">
                Temario<i className="ri-arrow-right-line"></i>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/admisionundac/" rel="noopener noreferrer" target="_blank">
                Vacantes Segunda Especialidad
                <i className="ri-arrow-right-line"></i>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/admisionundac/" rel="noopener noreferrer" target="_blank">
                Temario segunda especialidad
                <i className="ri-arrow-right-line"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="containerMain">
          <div className="containerMainImage">
          <img
            src={process.env.PUBLIC_URL + '/wallpaper_ordinario_i_2025.png'}
            alt="Banner"
          />
          </div>
        </div>
      </div>
      <div className="containerEstodosProcesos">
        {
          procesosActivos.length > 0
          ? 
          
          procesosActivos.map(e => {
            return (
              // <div className="containerItemResultado">
              //   <div className="cotainerItemResultadoImg">
              //     <img src={process.env.PUBLIC_URL + '/logo.jpg'} alt="" />
              //   </div>
              //   <div className="cotainerItemResultadoText">
              //     <p>{e.label}</p>
              //   </div>
              // </div>
              <div className="containerEnlaces" key={e.ID}>
                <h4>Requisitos {e.NOMBRE}</h4>
                  {
                    statusProcesos.map(element => {
                      // console.log("Comparacion ", element.proceso, e.ID)
                      if(element.proceso === e.ID) {
                        
                        return (
                          <>
                          <ul>
                            <li style={{ borderLeft: 'solid 2px green' }}>
                              <i className="ri-check-line" style={{ fontWeight: 'bold', color: 'green' }}></i>Registro
                            </li>
                            <li style={{ borderLeft: element.datos_complementarios ? 'solid 2px green' : 'solid 2px red' }}>
                              <i className={element.datos_complementarios ? "ri-check-line" : 'ri-close-line'} style={{ fontWeight: 'bold', color: element.datos_complementarios ? 'green' : 'red' }}></i>Datos del Apoderado
                            </li>
                            <li style={{ borderLeft: element.inscrito ? 'solid 2px green' : 'solid 2px red' }}>
                              <i className={element.inscrito ? "ri-check-line" : 'ri-close-line'} style={{ fontWeight: 'bold', color: element.inscrito ? 'green' : 'red' }}></i>Inscripcion
                            </li>
                            <li style={{ borderLeft: element.inscrito ? 'solid 2px green' : 'solid 2px red' }}>
                              <i className={element.inscrito ? "ri-check-line" : 'ri-close-line'} style={{ fontWeight: 'bold', color: element.inscrito ? 'green' : 'red' }}></i>Foto
                            </li>
                            <li style={{ borderLeft: element.pago ? 'solid 2px green' : 'solid 2px red' }}>
                              <i className={element.pago ? "ri-check-line" : 'ri-close-line'} style={{ fontWeight: 'bold', color: element.pago ? 'green' : 'red' }}></i>Voucher de pago
                            </li>
                            <li style={{ borderLeft: element.inscrito ? 'solid 2px green' : 'solid 2px red' }}>
                              <i className={element.inscrito ? "ri-check-line" : 'ri-close-line'} style={{ fontWeight: 'bold', color: element.inscrito ? 'green' : 'red' }}></i>Documentacion (DNI, CERT. EST.)
                            </li>
                            <li style={{ borderLeft: element.test_psicologico ? 'solid 2px green' : 'solid 2px red' }}>
                              <i className={element.test_psicologico ? "ri-check-line" : 'ri-close-line'} style={{ fontWeight: 'bold', color: element.test_psicologico ? 'green' : 'red' }}></i>Test psicologico
                            </li>
                            </ul>
                            {element.carnet
                            ?
                            <a href={`/generar-pdf?proceso=${e.ID}`} target="_blank" style={{ display: 'flex', gap: '5px', textDecoration: 'none', padding: '10px 30px' }}>
                              <Button block type="primary" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}><i class="ri-refund-line" style={{ fontSize: '14px' }}></i>Ver mi carnet</Button>
                              {/* <a href="https://wa.me/5192070271?text=UNIVERSIDAD DANIEL ALCIDES CARRION" target="_blank"><Button block type="primary" style={{ backgroundColor: '#25D366' }}><i class="ri-whatsapp-fill"></i> Enviar Whatsapp</Button></a> */}
                            </a>
                            :
                            ''}
                          </>
                        )
                      }
                    })
                  }
                
                {
                  
                }
              </div>
            )
          })
          :
          ''
        }
      </div>
      
    </>
  );
};

export default HomeDashEstudinte;
