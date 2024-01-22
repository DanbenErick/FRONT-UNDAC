import React from 'react';
import '../../assets/styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="bodyNF">
      <div className="container">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <a href="/login">Volver al inicio</a>
      </div>
    </div>
  );
};

export default NotFound;
