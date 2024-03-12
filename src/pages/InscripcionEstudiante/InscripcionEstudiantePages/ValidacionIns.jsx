import { Button, Form, Input, message } from 'antd';
import React, { useContext, useEffect } from 'react';
import { EstudianteContext } from '../../../providers/EstudianteProvider';
import { validarCordinadorService } from '../../../api/apiInpputs';

const ValidacionIns = (props) => {
  const { estudiante } = useContext(EstudianteContext);
  const [formValidacion] = Form.useForm();

  const anteriorPage = () => props.setCurrent(props.current - 1);
  const guardarCambios = async () => {
    const params = formValidacion.getFieldsValue()
    console.log(params)
    const resp = await validarCordinadorService(params)
    if(resp.data && resp.data.ok) {
      message.success(resp.data.message)
      localStorage.setItem('CORDINADOR', resp.data.result.ID)
      props.setCurrent(props.current + 1);
      
    }else {
      message.error(resp.data.message)
    }
  };
  useEffect(() => {
    formValidacion.setFieldsValue(estudiante);
  }, [estudiante, formValidacion]);
  return (
    <>
      <Form layout="vertical" form={formValidacion} onFinish={guardarCambios}>
        {/* <Form.Item label="Correo Electronico" name="CORREO">
          <Input placeholder="Ingresa tu correo" disabled />
        </Form.Item> */}
        <Form.Item label="Usuario o DNI de Cordinador" name="CODIGO" rules={[{ required: true }]}>
          <Input placeholder="Ingresa tu usuario o DNI" />
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
