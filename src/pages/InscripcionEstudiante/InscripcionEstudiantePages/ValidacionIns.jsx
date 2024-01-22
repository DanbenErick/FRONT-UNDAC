import { Button, Form, Input } from 'antd';
import React, { useContext, useEffect } from 'react';
import { EstudianteContext } from '../../../providers/EstudianteProvider';

const ValidacionIns = (props) => {
  const { estudiante } = useContext(EstudianteContext);
  const [formValidacion] = Form.useForm();
  const anteriorPage = () => props.setCurrent(props.current - 1);
  const guardarCambios = () => {
    props.setCurrent(props.current + 1);
  };
  useEffect(() => {
    formValidacion.setFieldsValue(estudiante);
  }, [estudiante, formValidacion]);
  return (
    <>
      <Form layout="vertical" form={formValidacion} onFinish={guardarCambios}>
        <Form.Item label="Correo Electronico" name="CORREO">
          <Input placeholder="Ingresa tu correo" disabled />
        </Form.Item>
        <Form.Item label="Codigo" name="CODIGO" rules={[{ required: true }]}>
          <Input placeholder="Ingresa 123" />
        </Form.Item>
        <Button onClick={anteriorPage}>Anterior</Button>
        <Button type="primary" htmlType="submit">
          Siguiente
        </Button>
      </Form>
    </>
  );
};

export default ValidacionIns;
