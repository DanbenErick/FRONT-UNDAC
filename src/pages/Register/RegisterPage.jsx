import React, { useState } from 'react';
import '../../assets/styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, message } from 'antd';
import { Input } from 'antd';
import SpinnerComponent from '../../components/Spinner';
import { InputNumber } from 'antd';
import { crearUsuarioAdminService } from '../../api/registerService';
const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [formRegister] = Form.useForm();
  const initialValues = {};
  const navigate = useNavigate()
  
  const crearUsuario = async (values) => {
    setLoading(true)
    const resp = await crearUsuarioAdminService(values);
    if(resp.data.ok) {
      message.success('Se registro correctamente')
      navigate('/dashboard/procesos')
    }else {
      message.error('No se registro correctamente')
    }
    setLoading(false)
  };
  return (
    <>
      {loading ? <SpinnerComponent /> : ''}

      <div className="pageLogin">
        <div className="body">
          <div className="background"></div>
          <div className="login">
            <Form
              layout="vertical"
              form={formRegister}
              initialValues={initialValues}
              onFinish={crearUsuario}
              className="form"
            >
              <div className="containerImg">
                <img
                  className="img"
                  src="https://undac.edu.pe/wp-content/uploads/elementor/thumbs/cropped-undac-otxjxjp3hh6yj3evud6f4g667rmvghjh2tp91gonu8.png"
                  alt=""
                />
              </div>
              <h1>Registrarse</h1>
              <Form.Item
                name="CODIGO_ACCESO"
                rules={[{ required: true }]}
                label="CODIGO ACCESO"
              >
                <Input
                  placeholder="Ingresa el codigo"
                  style={{ width: '100%', padding: '12px' }}
                  maxLength="40"
                />
              </Form.Item>
              <Form.Item
                name="NOMBRES"
                rules={[{ required: true }]}
                label="Nombres"
              >
                <Input
                  placeholder="Nombres"
                  style={{ width: '100%', padding: '12px' }}
                  maxLength="15"
                />
              </Form.Item>
              <Form.Item
                name="USUARIO"
                rules={[{ required: true }]}
                label="Usuario"
              >
                <Input
                  placeholder="Usuario"
                  style={{ width: '100%', padding: '12px' }}
                  maxLength="15"
                />
              </Form.Item>
              <Form.Item name="DNI" rules={[{ required: true }]} label="DNI">
                <InputNumber
                  placeholder="Numero de DNI"
                  maxLength="8"
                  style={{ width: '100%', padding: '6px' }}
                />
              </Form.Item>
              <Form.Item
                name="PASSWORD"
                rules={[{ required: true }]}
                label="Contraseña"
              >
                <Input.Password
                  placeholder="Contraseña"
                  style={{ width: '100%', padding: '12px' }}
                  maxLength="20"
                />
              </Form.Item>
              <Button type="primary" block size="large" htmlType="submit">
                Registrarme
              </Button>
              <p>
                ¿Ya tienes cuenta? <Link to="/login">Ir</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
