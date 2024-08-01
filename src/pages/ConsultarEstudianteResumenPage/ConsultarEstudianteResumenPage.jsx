import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './ConsultarEstudianteResumenPage.css'

const ConsultarEstudianteResumenPage = () => {
    const location = useLocation();
    let [data, setData] = useState({})
    useEffect(() => {

        // Parseamos la query string en un objeto
        const queryParams = new URLSearchParams(location.search);
        // Obtenemos los valores de los parámetros individuales
        
        // Y así sucesivamente para los demás parámetros
    
        // Aquí puedes usar los valores como desees
        setData({
            ap_pat: queryParams.get('ap_pat'),
            ap_mat: queryParams.get('ap_mat'),
            nombre: queryParams.get('nombre'),
            programa: queryParams.get('programa'),
            area: queryParams.get('area'),
            sede_examen: queryParams.get('sede_examen'),
            codigo_estudiante: queryParams.get('codigo_estudiante'),
            
        })

    }, [location.search])

    return (
        <div className="container-constancia-ingreso">
            <div className="headerConstancia">
                <img className="logoUndacAdmisionConstancia" src={process.env.PUBLIC_URL + '/UNDAC.png'}/>
                <h1>FICHA DE INSCRIPCION</h1>
                <img className="logoUndacAdmisionConstancia" src={process.env.PUBLIC_URL + '/logo.jpg'}/>
            </div>
            <div className="containerImageConstancia">
                <img src={`http://85.209.93.137:3500/${data.codigo_estudiante}/${data.codigo_estudiante}.jpeg`}></img>
            </div>
            {/* <p> data {data.uuid}</p> */}
            {/* <p>{data.token}</p> */}
            <div className="tableContainerContancia">
                <table className='tableConstanciaIngreso'>
                    <tbody>
                        <tr>
                            <td>Apellido Paterno: </td>
                            <td>{data.ap_pat}</td>
                        </tr>
                        <tr>
                            <td>Apellido Materno: </td>
                            <td>{data.ap_mat}</td>
                        </tr>
                        <tr>
                            <td>Nombres: </td>
                            <td>{data.nombre}</td>
                        </tr>
                        <tr>
                            <td>DNI: </td>
                            <td>{data.codigo_estudiante}</td>
                        </tr>
                        <tr>
                            <td>Sede: </td>
                            <td>{data.sede_examen}</td>
                        </tr>
                        <tr>
                            <td>Area: </td>
                            <td>{data.area}</td>
                        </tr>
                        <tr>
                            <td>Programa: </td>
                            <td>{data.programa}</td>
                        </tr>
                        {/* <tr>
                            <td>Proceso: </td>
                            <td>{data.proceso}</td>
                        </tr>
                        <tr>
                            <td>Promedio: </td>
                            <td>{data.promedio}</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
            <h1 style={{ color: 'green', paddingBottom: '20px' }}>VALIDO</h1>
            {/* <h1>{ apellidoPaterno }</h1> */}
        </div>

    )
}

export default ConsultarEstudianteResumenPage