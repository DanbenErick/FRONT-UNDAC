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
  return (
    <>
      <Form
        layout="vertical"
        form={formDatosContacto}
        onFinish={guardarDatosContacto}
      >
        <Form.Item label="Celular" name="CELULAR" rules={[{ required: true }]}>
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
