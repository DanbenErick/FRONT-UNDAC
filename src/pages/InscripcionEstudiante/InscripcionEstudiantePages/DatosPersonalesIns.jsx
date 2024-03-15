import { Button, InputNumber, notification } from 'antd';
import { Select } from 'antd';
import { Form, Input } from 'antd';
import React, { useContext } from 'react';
import { EstudianteContext } from '../../../providers/EstudianteProvider';
import { consultarDatosEstudiantePorDNI, consultarEstudianteExisteService } from '../../../api/inscripcionEstudianteService';
import { message } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const isNumeric = (value) => {
  return !/[^0-9]/.test(value);
}

const DatosPersonalIncripcion = (props) => {
  const [formDatosPersonales] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate()
  const openNotification = () => {
    api.open({
      message: 'UNDAC ADMISION',
      description: 'Usted ya esta registrado en el sistema, se le mandara al login.',
      icon: ( <SmileOutlined style={{ color: '#108ee9', }}/>),
      duration: 4,
    });
    setTimeout(() => {
      navigate('/login-estudiante')
    },2000)
  };
  const { setEstudiante } = useContext(EstudianteContext);
  const guardarDatosPersonales = async (params) => {
    if(!isNumeric(params.DNI)) {
      message.info('Ingresa un DNI valido')
      return 
    }
    if(params.DNI.length < 8) {
      message.info('El DNI tiene que tener 8 caracteres')
      return 
    }
    const resp = await consultarEstudianteExisteService({ DNI: params.DNI });
    if (resp.data.length > 0) {
      openNotification()
      // message.info('Ya esta registrado');
      return;
    }
    setEstudiante(params);
    props.setCurrent(props.current + 1);
  };
  const buscarDNI = async() => {
    if(formDatosPersonales.getFieldValue('DNI').length === 8) {
      const resp = await consultarDatosEstudiantePorDNI({dni: formDatosPersonales.getFieldValue('DNI')})
      if(resp.data.estado) {
        formDatosPersonales.setFieldValue('AP_PATERNO', resp.data.resultado.apellido_paterno)
        formDatosPersonales.setFieldValue('AP_MATERNO', resp.data.resultado.apellido_materno)
        formDatosPersonales.setFieldValue('NOMBRES', resp.data.resultado.nombres)
      }
    }
  }
  return (
    <>
    {contextHolder}
      <Form layout="vertical" form={formDatosPersonales} onFinish={guardarDatosPersonales}>
        <Form.Item label="Tipo" name="TIPO_DOC" rules={[{ required: true }]}>
          <Select options={[{ value: 'DNI', label: 'DNI' }]} />
          <Select options={[{ value: 'CE', label: 'Carnet de Extrangeria' }]} />
        </Form.Item>
        <Form.Item label="DNI" name="DNI" rules={[{ required: true }]}>
          <Input maxLength="20" placeholder="Ingresa tu numero de DNI" style={{ width: '100%' }} onChange={buscarDNI} />
        </Form.Item>
        <Form.Item label="Apellidos Paterno" name="AP_PATERNO" rules={[{ required: true }]}>
          <Input placeholder="Tu apellido paterno" />
        </Form.Item>
        <Form.Item label="Apellidos Materno" name="AP_MATERNO" rules={[{ required: true }]}>
          <Input placeholder="Tu apellido materno" />
        </Form.Item>
        <Form.Item label="Nombres" name="NOMBRES" rules={[{ required: true }]}>
          <Input placeholder="Tu nombre" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Siguiente</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default DatosPersonalIncripcion;
