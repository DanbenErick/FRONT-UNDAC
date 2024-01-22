import { Button, Form, Input } from 'antd';
import React, { useContext } from 'react';
import { EstudianteContext } from '../../../providers/EstudianteProvider';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { registrarEstudianteService } from '../../../api/inscripcionEstudianteService';

const ConfirmacionIns = (props) => {
  const [formConfirmacion] = Form.useForm();
  const { estudiante, setEstudiante } = useContext(EstudianteContext);
  const navigate = useNavigate();
  const guardarConfirmacion = async (params) => {
    if (params.PASSWORD !== params.PASSWORD_2) {
      message.error('Las contraseas no coindicen');
      return;
    }
    setEstudiante({ ...estudiante, PASSWORD: params.PASSWORD });
    const resp = await registrarEstudianteService({ ...estudiante, PASSWORD: params.PASSWORD });
    if (!resp.data.ok) {
      message.error(resp.data.message);
      return;
    }

    message.success(resp.data.message);
    localStorage.setItem('token', resp.data.token)
    localStorage.setItem('nombre', resp.data.name)
    localStorage.setItem('dni', resp.data.user)
    localStorage.setItem('expiresAt', resp.data.expiresAt);
    localStorage.setItem('rol', resp.data.rol)
    navigate('/dashboard-estudiantes/home');
  };
  const anteriorPage = () => props.setCurrent(props.current - 1);
  return (
    <>
      <Form
        layout="vertical"
        form={formConfirmacion}
        onFinish={guardarConfirmacion}
      >
        <Form.Item label="Contraseña" name="PASSWORD" rules={[{ required: true }]}>
          <Input.Password placeholder="Ingresa tu contraseña" />
        </Form.Item>
        <Form.Item label="Repite Contraseña" name="PASSWORD_2" rules={[{ required: true }]} >
          <Input.Password placeholder="Repite tu contraseña" />
        </Form.Item>
        <Button onClick={anteriorPage}>Anterior</Button>
        <Button type="primary" htmlType="submit">
          Terminar
        </Button>
      </Form>
    </>
  );
};

export default ConfirmacionIns;
