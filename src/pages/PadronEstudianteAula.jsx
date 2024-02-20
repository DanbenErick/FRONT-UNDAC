import React from 'react'




const PadronEstudianteAulaPage = () => {
    return (
        <>
            <div className="containerListaEstudiante" style={{ display: 'grid', width: '100%',  gridTemplateColumns: '140px calc(100% - 240px) 100px' }}>
                <div className="fotoEstudiante" style={{ width: '140px' }}>
                    <img src="https://api-zszn.onrender.com/60010034/60010034.jpeg" alt="" style={{ width: '100%' }}  />
                </div>
                <div className="nombresCompletosEstudiante">
                    <p>Apellidos Paterno: <b>CRUZ</b></p>
                    <p>Apellidos Materno: <b>BARRETO</b></p>
                    <p>Nombres: <b>Danben Erick</b></p>
                    <p>Carrera: <b>Educacion Primario (Pasco)</b></p>
                </div>
                <div className="firmaEstudiante">
                    <div className="huella" style={{ width: '150px', height: '200px', border: 'solid 1px black' }}></div>
                </div>
            </div>
        </>
    )
}

export default PadronEstudianteAulaPage