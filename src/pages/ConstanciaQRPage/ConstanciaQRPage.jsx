import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './ConstanciaQRPage.css'

const ConstanciaQRPage = () => {
    const location = useLocation();
    let [data, setData] = useState({})
    useEffect(() => {

        // Parseamos la query string en un objeto
        const queryParams = new URLSearchParams(location.search);
        // Obtenemos los valores de los parámetros individuales
        
        // Y así sucesivamente para los demás parámetros
    
        // Aquí puedes usar los valores como desees
        setData({
            uuid: queryParams.get('uuid'),
            token: queryParams.get('token'),
            apellido_paterno: queryParams.get('apellido_paterno'),
            apellido_materno: queryParams.get('apellido_materno'),
            nombres: queryParams.get('nombres'),
            dni: queryParams.get('dni'),
            codigo_matricula: queryParams.get('codigo_matricula'),
            sede: queryParams.get('sede'),
            direccion: queryParams.get('direccion'),
            facultad: queryParams.get('facultad'),
            proceso: queryParams.get('proceso'),
            promedio: queryParams.get('promedio'),
        })

    }, [location.search])

    return (
        <div className="container-constancia-ingreso">
            <div className="headerConstancia">
                <img className="logoUndacAdmisionConstancia" src={process.env.PUBLIC_URL + '/UNDAC.png'}/>
                <h1>Constancia de Ingreso</h1>
                <img className="logoUndacAdmisionConstancia" src={process.env.PUBLIC_URL + '/logo.jpg'}/>
            </div>
            <div className="containerImageConstancia">
                <img src={`http://143.198.105.92:3500/${data.dni}/${data.dni}.jpeg`}></img>
            </div>
            {/* <p> data {data.uuid}</p> */}
            {/* <p>{data.token}</p> */}
            <div className="tableContainerContancia">
                <table className='tableConstanciaIngreso'>
                    <tbody>
                        <tr>
                            <td>Apellido Paterno: </td>
                            <td>{data.apellido_paterno}</td>
                        </tr>
                        <tr>
                            <td>Apellido Materno: </td>
                            <td>{data.apellido_materno}</td>
                        </tr>
                        <tr>
                            <td>Nombres: </td>
                            <td>{data.nombres}</td>
                        </tr>
                        <tr>
                            <td>DNI: </td>
                            <td>{data.dni}</td>
                        </tr>
                        <tr>
                            <td>Codigo Matricula: </td>
                            <td>{data.codigo_matricula}</td>
                        </tr>
                        <tr>
                            <td>Sede: </td>
                            <td>{data.sede}</td>
                        </tr>
                        <tr>
                            <td>Direccion: </td>
                            <td>{data.direccion}</td>
                        </tr>
                        <tr>
                            <td>Facultad: </td>
                            <td>{data.facultad}</td>
                        </tr>
                        <tr>
                            <td>Proceso: </td>
                            <td>{data.proceso}</td>
                        </tr>
                        <tr>
                            <td>Promedio: </td>
                            <td>{data.promedio}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h1 style={{ color: 'green', paddingBottom: '20px' }}>VALIDO</h1>
            {/* <h1>{ apellidoPaterno }</h1> */}
        </div>

    )
}

export default ConstanciaQRPage