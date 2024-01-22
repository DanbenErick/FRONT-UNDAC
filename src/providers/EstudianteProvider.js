import React, { createContext, useState } from 'react';

const EstudianteContext = createContext();

const EstudianteProvider = ({ children }) => {
  const [estudiante, setEstudiante] = useState({});
  return (
    <EstudianteContext.Provider value={{ estudiante, setEstudiante }}>
      {children}
    </EstudianteContext.Provider>
  );
};
export { EstudianteProvider, EstudianteContext };
