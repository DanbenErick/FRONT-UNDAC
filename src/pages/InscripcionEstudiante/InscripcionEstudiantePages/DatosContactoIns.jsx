import { Button, Form, Input } from 'antd';
import React, { useContext } from 'react';
import { EstudianteContext } from '../../../providers/EstudianteProvider';

const DatosContactoIns = (props) => {
  const [formDatosContacto] = Form.useForm();
  const { setEstudiante, estudiante } = useContext(EstudianteContext);
  const guardarDatosContacto = (params) => {
    setEstudiante({ ...estudiante, ...params });
    props.setCurrent(props.current + 1);
  };
  const anteriorPage = () => props.setCurrent(props.current - 1);

  const validateCelular = (rule, value) => {
    console.log(value.length)
    if ( value.length !== 0 && !/^\d+$/.test(value)) {
      return Promise.reject('Celular inválido');
    }
    console.log(value[0])
    if(value[0] !== '9') {
      return Promise.reject('El Celular debe comenzar con 9');
    }
    if (value.length !== 0 && value.length !== 9) {
      return Promise.reject('El Celular debe tener 9 dígitos numericos');
    }
    return Promise.resolve();
  };
  return (
    <>
      <Form
        layout="vertical"
        form={formDatosContacto}
        onFinish={guardarDatosContacto}
      >
        <Form.Item label="Celular" name="CELULAR" rules={[{ required: true }, { validator: validateCelular }]}>
          <Input placeholder="Ingres tu numero de celular" maxLength={9} />
        </Form.Item>
        <Form.Item label="Correo Electronico" name="CORREO" rules={[{ required: true, type: 'email' }]}>
          <Input placeholder="Ingresa tu correo electronico"  />
        </Form.Item>
        <Button onClick={anteriorPage}>Anterior</Button>
        <Button type="primary" htmlType="submit">
          Siguiente
        </Button>
      </Form>
    </>
  );
};

export default DatosContactoIns;
