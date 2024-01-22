import React, { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { verificarDatosComplementariosEstudiante, verificarEstudianteInscritoService, verificarTestpsicologicoEstudianteService } from "../../../api/inscripcionDashEstudianteService";
const HomeDashEstudinte = () => {
  const [statusDatosApoderado, setStatusDatosApoderado] = useState(false)
  const [statusInscripcion, setStatusInscripcion] = useState(false)
  const [statusTestpsicologico, setStatusTestpsicologico] = useState(false)
  const verificarStates = async () => {
    const resp_inscrito = await verificarEstudianteInscritoService({DNI: localStorage.getItem('dni')})
    const resp_datos_co = await verificarDatosComplementariosEstudiante({DNI: localStorage.getItem('dni')})
    const resp_test_pic = await verificarTestpsicologicoEstudianteService({DNI: localStorage.getItem('dni')})
    if(resp_inscrito.data.ok) setStatusInscripcion(true)
    if(resp_datos_co.data.ok) setStatusDatosApoderado(true)
    if(resp_test_pic.data.ok) setStatusTestpsicologico(true)
  }
  useEffect(() => {
    verificarStates()
  },[])
  return (
    <>
      <h1>Bienvenido { localStorage.getItem('nombre') }</h1>
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
            src="https://undac.edu.pe/wp-content/uploads/2023/12/410930831_886290123497590_5080581941822328473_n-2048x759.jpg"
            alt=""
          />
          {/* </div> */}
        </div>
        <div className="containerEnlaces">
          <h4>Requisitos</h4>
          <ul>
            <li style={{borderLeft: 'solid 2px green'}}>
              <i class="ri-check-line" style={{ fontWeight: 'bold', color: 'green' }}></i>Registro
            </li>
            <li style={{borderLeft: statusDatosApoderado ? 'solid 2px green': 'solid 2px red'}}>
              <i class={statusDatosApoderado ? "ri-check-line": 'ri-close-line'} style={{ fontWeight: 'bold', color: statusDatosApoderado ? 'green': 'red' }}></i>Datos del Apoderado
            </li>
            <li style={{borderLeft: statusInscripcion ? 'solid 2px green': 'solid 2px red'}}>
              <i class={statusInscripcion ? "ri-check-line": 'ri-close-line'} style={{ fontWeight: 'bold', color: statusInscripcion ? 'green': 'red' }}></i>Inscripcion
            </li>
            <li style={{borderLeft: statusInscripcion ? 'solid 2px green': 'solid 2px red'}}>
              <i class={statusInscripcion ? "ri-check-line": 'ri-close-line'} style={{ fontWeight: 'bold', color: statusInscripcion ? 'green': 'red' }}></i>Foto
            </li>
            <li style={{borderLeft: false ? 'solid 2px green': 'solid 2px red'}}>
              <i class={false ? "ri-check-line": 'ri-close-line'} style={{ fontWeight: 'bold', color: false ? 'green': 'red' }}></i>Voucher de pago
            </li>
            <li style={{borderLeft: statusInscripcion ? 'solid 2px green': 'solid 2px red'}}>
              <i class={statusInscripcion ? "ri-check-line": 'ri-close-line'} style={{ fontWeight: 'bold', color: statusInscripcion ? 'green': 'red' }}></i>Documentacion (DNI, CERT. EST.)
            </li>
            <li style={{borderLeft: statusTestpsicologico ? 'solid 2px green': 'solid 2px red'}}>
              <i class={statusTestpsicologico ? "ri-check-line": 'ri-close-line'} style={{ fontWeight: 'bold', color: statusTestpsicologico ? 'green': 'red' }}></i>Test psicologico
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomeDashEstudinte;
