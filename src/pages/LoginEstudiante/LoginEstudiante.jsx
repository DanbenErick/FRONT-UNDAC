import React from 'react';

import { Input, Button, Form } from 'antd';
import { Link } from 'react-router-dom';
import '../../assets/styles/Login.css';
import { loginUsuarioEstudianteService } from '../../api/authService';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const LoginEstudiantePage = () => {
  const [formLogin] = Form.useForm();
  const navigate = useNavigate()
  const initialValues = {};
  const loginUsuario = async (params) => {
    const resp = await loginUsuarioEstudianteService(params);
    if(resp.data.ok) {
      localStorage.setItem('token', resp.data.token)
      localStorage.setItem('nombre', resp.data.name)
      localStorage.setItem('dni', resp.data.dni)
      localStorage.setItem('expiresAt', resp.data.expiresAt);
      localStorage.setItem('uuid', resp.data.uuid)
      localStorage.setItem('rol', 'ESTUDIANTE')
      message.success(resp.data.message)
      navigate('/dashboard-estudiantes/home')
      return
    }
    message.error(resp.data.message)
  };
  return (
    <div className="pageLogin">
      <div className="body">
        <div className="background"></div>
        <div className="login">
          <Form
            layout="vertical"
            className="form"
            form={formLogin}
            initialValues={initialValues}
            onFinish={loginUsuario}
          >
            <div className="containerImg">
              <img
                className="img"
                style={{ width: '150px', height: '120px' }}
                src={process.env.PUBLIC_URL + '/logo.jpg'}
                alt=""
              />
            </div>
            <h1>Postulante</h1>
            <Form.Item
              label="Usuario o DNI"
              name="USUARIO"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="Ingresa tu DNI"
                className="control"
                maxLength="20"
              />
            </Form.Item>
            <Form.Item
              label="Contraseña"
              name="PASSWORD"
              rules={[{ required: true }]}
            >
              <Input.Password
                placeholder="Contraseña"
                className="control"
                maxLength="20"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Continuar
              </Button>

              <p>
                ¿No tienes cuenta?  
                <Link to="/inscripcion"> Registrarse</Link>
                {/* <div><Link to="/inscripcion-cordinador">(Soy Coordinador)</Link></div> */}
              </p>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginEstudiantePage;
