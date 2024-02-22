import React from 'react';
import '../../assets/styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="bodyNF">
      <div className="container">
        <img
          style={{ width: '350px', height: '300px' }}
          src={process.env.PUBLIC_URL + '/logo.jpg'}
        />
        <h1>UNDAC ADMISION</h1>
        <h2>La pagina que buscas no existe</h2>
        <a href="/login-estudiante">Volver al inicio</a>
      </div>
    </div>
  );
};

export default NotFound;
