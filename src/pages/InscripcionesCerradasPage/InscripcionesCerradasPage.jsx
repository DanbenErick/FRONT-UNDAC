import React from 'react'
import './InscripcionesCerradasPage.css'
const InscripcionesCerradasPage = () => {
  return (
    <>
      <div className="containerPageInscripcionesCerradas">
        <div className="containerBoxInscripcionesCerradas">
          <img src={process.env.PUBLIC_URL + '/logo.jpg'} width={'200px'}  alt='Logo'/>
          <h1>Inscripciones Cerradas</h1>
        </div>
      </div>
    </>
  )
}

export default InscripcionesCerradasPage