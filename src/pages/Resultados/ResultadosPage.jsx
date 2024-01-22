import React from 'react'
import '../../assets/styles/ResultadosPage.css'
import { Link } from 'react-router-dom';

const ResultadoPage = () => {
  
  return (
    <div className='resultadoPage'>
      <h1>Resultados</h1>
      <div className="containerResultados">
        <Link to="/resultados-lis-carreras/CEPRE II/1" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="containerItemResultado">
            <div className="cotainerItemResultadoImg">
              <img src="https://img.freepik.com/vector-gratis/ilustracion-concepto-nerd_114360-190.jpg?size=626&ext=jpg" alt="" />
            </div>
            <div className="cotainerItemResultadoText">
              <p>CEPRE 2024</p>
            </div>
          </div>
        </Link>
        <Link to="/resultados-lis-carreras/MODALIDADES 2024/2" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="containerItemResultado">
            <div className="cotainerItemResultadoImg">
              <img src="https://img.freepik.com/vector-premium/chica-estudiante-estudiando-ordenador-portatil-mujer-joven-sentada-sobre-pila-libros-obteniendo-conocimientos-linea-ilustracion-e-learning-curso-internet-concepto-escuela_460582-47.jpg" alt="" />
            </div>
            <div className="cotainerItemResultadoText">
              <p>MODALIDADES 2024</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ResultadoPage;