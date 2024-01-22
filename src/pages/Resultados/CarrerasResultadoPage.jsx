import React, { useEffect, useState } from 'react'
import { obtenerCarrerasCodigoForm } from '../../api/apiInpputs'
import { Link, useParams } from 'react-router-dom'

const CarreraResultadoPage = () => {
  const [carreras, setCarreras] = useState([])
  const { id, nombre } = useParams()
  const obtenerCarreras = async() => {
    const resp = await obtenerCarrerasCodigoForm()
    console.log(resp.data)
    setCarreras(resp.data)
  }
  useEffect(() => {
    obtenerCarreras() 
  },[])
  
  return (
    <div className='resultadoPageCarreras'>
      <h1>Lista de carreras ( {nombre} {id} )</h1>
      <div className="containerResultadosListaCarrera">
        { carreras.length > 0 && carreras.map(item => (
          <Link to={`/tabla-resultado/${item.value}/${item.label}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="containerItemResultado">
            <div className="cotainerItemResultadoImg">
              <img src={process.env.PUBLIC_URL + '/logo.jpg'} alt="" />
            </div>
            <div className="cotainerItemResultadoText">
              <p>{item.label}</p>
            </div>
          </div>
        </Link>
        ))}
      </div>
    </div>
  )
}

export default CarreraResultadoPage