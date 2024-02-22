import React, { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { verificarDatosComplementariosEstudiante, verificarEstudianteInscritoService, verificarPagoEstudianteService, verificarTestpsicologicoEstudianteService } from "../../../api/inscripcionDashEstudianteService";
import { Button } from "antd";
import { obtenerTodosLosProcesosActivosForm } from "../../../api/apiInpputs";

const HomeDashEstudinte = () => {





  const [statusDatosApoderado, setStatusDatosApoderado] = useState(false)
  const [statusInscripcion, setStatusInscripcion] = useState(false)
  const [statusTestpsicologico, setStatusTestpsicologico] = useState(false)
  const [statusPago, setStatusPago] = useState(false)
  const [statusCarnet, setStatusCarnet] = useState(false)
  let carnetContador = 0
  const verificarStates = async () => {
    const ultimoProcesoActivo = await obtenerTodosLosProcesosActivosForm()
    console.log(ultimoProcesoActivo)
    const resp_inscrito = await verificarEstudianteInscritoService({ DNI: localStorage.getItem('dni'), TIPO_PROCESO: ultimoProcesoActivo.data[0].TIPO_PROCESO })
    const resp_datos_co = await verificarDatosComplementariosEstudiante({ DNI: localStorage.getItem('dni') })
    const resp_test_pic = await verificarTestpsicologicoEstudianteService({ DNI: localStorage.getItem('dni') })
    const resp_pago = await verificarPagoEstudianteService({ DNI: localStorage.getItem('dni') })
    if (resp_inscrito.data.ok) { setStatusInscripcion(true); carnetContador += 1 }
    if (resp_datos_co.data.ok) { setStatusDatosApoderado(true); carnetContador += 1 }
    if (resp_test_pic.data.ok) { setStatusTestpsicologico(true); carnetContador += 1 }
    if (resp_pago.data.ok) { setStatusPago(true); carnetContador += 1 }

  }
  let i = 0
  useEffect(() => {
    verificarStates()
    if (statusDatosApoderado && statusInscripcion && statusTestpsicologico && statusPago) {
      console.log('ingreso')
      setStatusCarnet(true)
    }
    console.log(statusCarnet)
  }, [statusDatosApoderado, statusInscripcion, statusTestpsicologico, statusPago, statusCarnet])
  return (
    <>
      <h1>Bienvenido {localStorage.getItem('nombre')}</h1>
      <div className="gridHomePageDashboardEstudiante">
        <div className="containerEnlaces">
          <h4>Contenido</h4>
          <ul>
            <li>
              <a href="https://gooogle.com" rel="noopener noreferrer" target="_blank">
                Reglamento del proceso de admision
                <i className="ri-arrow-right-line"></i>
              </a>
            </li>
            <li>
              <a href="https://gooogle.com" rel="noopener noreferrer" target="_blank">
                Guia de Inscripcion - Pregrado
                <i className="ri-arrow-right-line"></i>
              </a>
            </li>
            <li>
              <a href="https://gooogle.com" rel="noopener noreferrer" target="_blank">
                Guia de Inscripcion - Segunda Especilidad
                <i className="ri-arrow-right-line"></i>
              </a>
            </li>
            <li>
              <a href="https://gooogle.com" rel="noopener noreferrer" target="_blank">
                Catalogo de Pregrado<i className="ri-arrow-right-line"></i>
              </a>
            </li>
            <li>
              <a href="https://gooogle.com" rel="noopener noreferrer" target="_blank">
                Temario<i className="ri-arrow-right-line"></i>
              </a>
            </li>
            <li>
              <a href="https://gooogle.com" rel="noopener noreferrer" target="_blank">
                Vacantes Segunda Especialidad
                <i className="ri-arrow-right-line"></i>
              </a>
            </li>
            <li>
              <a href="https://gooogle.com" rel="noopener noreferrer" target="_blank">
                Temario segunda especialidad
                <i className="ri-arrow-right-line"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="containerMain">
          {/* <div className="containerMainImage"> */}
          <img
            src="https://undac.edu.pe/wp-content/uploads/2024/02/facebook_Mesa-de-trabajo-1-2048x758.png"
            alt="Banner"
          />
          {/* </div> */}
        </div>
        <div className="containerEnlaces">
          <h4>Requisitos</h4>
          <div>
          </div>
          <ul>
            <li style={{ borderLeft: 'solid 2px green' }}>
              <i className="ri-check-line" style={{ fontWeight: 'bold', color: 'green' }}></i>Registro
            </li>
            <li style={{ borderLeft: statusDatosApoderado ? 'solid 2px green' : 'solid 2px red' }}>
              <i className={statusDatosApoderado ? "ri-check-line" : 'ri-close-line'} style={{ fontWeight: 'bold', color: statusDatosApoderado ? 'green' : 'red' }}></i>Datos del Apoderado
            </li>
            <li style={{ borderLeft: statusInscripcion ? 'solid 2px green' : 'solid 2px red' }}>
              <i className={statusInscripcion ? "ri-check-line" : 'ri-close-line'} style={{ fontWeight: 'bold', color: statusInscripcion ? 'green' : 'red' }}></i>Inscripcion
            </li>
            <li style={{ borderLeft: statusInscripcion ? 'solid 2px green' : 'solid 2px red' }}>
              <i className={statusInscripcion ? "ri-check-line" : 'ri-close-line'} style={{ fontWeight: 'bold', color: statusInscripcion ? 'green' : 'red' }}></i>Foto
            </li>
            <li style={{ borderLeft: statusPago ? 'solid 2px green' : 'solid 2px red' }}>
              <i className={statusPago ? "ri-check-line" : 'ri-close-line'} style={{ fontWeight: 'bold', color: statusPago ? 'green' : 'red' }}></i>Voucher de pago
            </li>
            <li style={{ borderLeft: statusInscripcion ? 'solid 2px green' : 'solid 2px red' }}>
              <i className={statusInscripcion ? "ri-check-line" : 'ri-close-line'} style={{ fontWeight: 'bold', color: statusInscripcion ? 'green' : 'red' }}></i>Documentacion (DNI, CERT. EST.)
            </li>
            <li style={{ borderLeft: statusTestpsicologico ? 'solid 2px green' : 'solid 2px red' }}>
              <i className={statusTestpsicologico ? "ri-check-line" : 'ri-close-line'} style={{ fontWeight: 'bold', color: statusTestpsicologico ? 'green' : 'red' }}></i>Test psicologico
            </li>
          </ul>
          {
            statusCarnet
              ?
              <a href="/generar-pdf" target="_blank">
                <Button block type="primary">Ver mi carnet</Button>
              </a>
              :
              ''
          }
        </div>
      </div>
    </>
  );
};

export default HomeDashEstudinte;
