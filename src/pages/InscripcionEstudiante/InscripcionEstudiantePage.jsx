import React, { useState } from 'react';
import { Steps } from 'antd';
import DatosPersonalIncripcion from './InscripcionEstudiantePages/DatosPersonalesIns';
import DatosContactoIns from './InscripcionEstudiantePages/DatosContactoIns';
import ResumenIns from './InscripcionEstudiantePages/ResumenIns';
import ValidacionIns from './InscripcionEstudiantePages/ValidacionIns';
import ConfirmacionIns from './InscripcionEstudiantePages/ConfirmacionIns';
import '../../assets/styles/InscripcionEstudiantePage.css';
// import { EstudianteContext } from '../../providers/EstudianteProvider';
const InscripcionEstudiantePage = () => {
  const [current, setCurrent] = useState(0);
  // const { estudiante } = useContext(EstudianteContext);
  const contentStyle = {
    marginTop: 10,
    paddingTop: 10,
  };
  const steps = [
    {
      title: <b>Informacion</b>,
      content: (
        <DatosPersonalIncripcion current={current} setCurrent={setCurrent} />
      ),
    },
    {
      title: <b>Celular</b>,
      content: <DatosContactoIns current={current} setCurrent={setCurrent} />,
    },
    {
      title: <b>Confirmacion</b>,
      content: <ResumenIns current={current} setCurrent={setCurrent} />,
    },
    {
      title: <b>Correo</b>,
      content: <ValidacionIns current={current} setCurrent={setCurrent} />,
    },
    {
      title: <b>Clave</b>,
      content: <ConfirmacionIns current={current} setCurrent={setCurrent} />,
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  return (
    <div className="InscripcionEstudiantePage">
      <div className="background"></div>
      <div className="containerInscripcionEstudiantePageCenter">
        <div className="containerInscripcionEstudiantePage">
          <Steps current={current} items={items} />
          <div style={contentStyle}>{steps[current].content}</div>
          <div
            style={{ marginTop: 24, display: 'flex', justifyContent: 'end' }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default InscripcionEstudiantePage;
