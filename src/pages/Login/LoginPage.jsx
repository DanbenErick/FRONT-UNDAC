import React from 'react';
import useAuthAdmin from '../../hooks/useAuthAdmin';
import { Input, Button, Form } from 'antd';
import { Link } from 'react-router-dom';
import '../../assets/styles/Login.css';

const LoginPage = () => {
  const [formLogin] = Form.useForm();
  const { login } = useAuthAdmin();
  const initialValues = {};
  const loginUsuario = async (params) => {
    const resp = await login(params);
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
                src="https://undac.edu.pe/wp-content/uploads/elementor/thumbs/cropped-undac-otxjxjp3hh6yj3evud6f4g667rmvghjh2tp91gonu8.png"
                alt=""
              />
            </div>
            <h1>Ingresar</h1>
            <Form.Item
              label="Usuario o DNI"
              name="USUARIO"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="Ingresa tu usuario"
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
                ¿No tienes cuenta? <Link to="/register">Registrarse</Link>
              </p>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
