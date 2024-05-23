import { Button, Form, Input, Select, message, notification } from 'antd'
import React from 'react'
import { consultarDatosEstudiantePorDNI, consultarEstudianteExisteService, registrarEstudianteService } from '../../api/inscripcionEstudianteService'
import './RegistrarPostulanteCordinadorPage.css'
import { validarCordinadorService } from '../../api/apiInpputs'
import { useNavigate } from 'react-router-dom'
import { SmileOutlined } from '@ant-design/icons'
const RegistrarPostulanteCordinadorPage = () => {
  const navigate = useNavigate();
  const [formDatosPersonales] = Form.useForm()
  const [nameCordinador, setNameCordinador] = React.useState('')
  const [disabledButtonSubmit, setDisabledButtonSubmit] = React.useState(true)
  const [api, contextHolder] = notification.useNotification();

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

  const buscarDNI = async(params) => {
    
    
    if(formDatosPersonales.getFieldValue('DNI').length === 8) {
      const resp = await consultarDatosEstudiantePorDNI({dni: formDatosPersonales.getFieldValue('DNI')})
      if(resp.data.estado) {
        formDatosPersonales.setFieldValue('AP_PATERNO', resp.data.resultado.apellido_paterno)
        formDatosPersonales.setFieldValue('AP_MATERNO', resp.data.resultado.apellido_materno)
        formDatosPersonales.setFieldValue('NOMBRES', resp.data.resultado.nombres)
      }
    }
  }
  const validateDNI = (rule, value) => {
    console.log(value.length)
    if ( value.length !== 0 && !/^\d+$/.test(value)) {
      return Promise.reject('DNI inválido');
    }
    if (value.length !== 0 && value.length !== 8) {
      return Promise.reject('El DNI debe tener 8 dígitos');
    }
    return Promise.resolve();
  };
  const registrarPosulantesPorCordinador = async(params) => {
    console.log("params:", params)
    if(params.PASSWORD !== params.PASSWORD_2){
      message.error("Las contraseñas no coinciden")
      return
    }
    const resp = await consultarEstudianteExisteService({ DNI: params.DNI });
    if (resp.data.length > 0) {
      openNotification()
      // message.info('Ya esta registrado');
      return;
    }
    delete params.CODIGO
    delete params.PASSWORD_2
    debugger
    const resp_2 = await registrarEstudianteService({ ...params, CORDINADOR: localStorage.getItem('CORDINADOR') || '' });
    if (!resp_2.data.ok) {
      message.error(resp_2.data.message);
      return;
    }

    message.success(resp_2.data.message);
    localStorage.setItem('token', resp_2.data.token)
    localStorage.setItem('nombre', resp_2.data.name)
    localStorage.setItem('dni', resp_2.data.user)
    localStorage.setItem('uuid', resp_2.data.uuid)
    localStorage.setItem('expiresAt', resp_2.data.expiresAt);
    localStorage.setItem('rol', resp_2.data.rol)
    navigate('/dashboard-estudiantes/home');
  }
  const validarCordinador = async() => {
    const params = formDatosPersonales.getFieldsValue()
    console.log(params)
    const resp = await validarCordinadorService(params)
    if(resp.data && resp.data.ok) {
      message.success(resp.data.message)
      setNameCordinador(resp.data.message)
      setDisabledButtonSubmit(false)
      localStorage.setItem('CORDINADOR', resp.data.result.ID)
      
      
    }else {
      message.error(resp.data.message)
    }
  }
  return (
    <div className='fondoRegistrarPostulanteCoordinador'>
      {contextHolder}
      <div className="containerFormRegistrarPostulanteCoordinador">

      <h1>Registrar Postulante Coordinador</h1>
      
      <Form form={formDatosPersonales} layout='vertical' onFinish={registrarPosulantesPorCordinador} initialValues={{ TIPO_DOC: 'DNI', CORREO: 'postulante@undac.edu.pe' }}>
        <div className="gridRegistrarPostulantesCordinador">
          <Form.Item label="Usuario o DNI de Cordinador" name="CODIGO" rules={[{ required: true }]}>
            <Input placeholder="Ingresa tu usuario o DNI" disabled={!disabledButtonSubmit} />
          </Form.Item>
            
          <Form.Item label="Tipo" name="TIPO_DOC" rules={[{ required: true }]}>
            <Select options={[{ value: 'DNI', label: 'DNI' }, { value: 'CE', label: 'Carnet de Extrangeria' }]} />
          </Form.Item>
          <Form.Item label="DNI" name="DNI" rules={[{ required: true }, { validator: validateDNI }]}>
            <Input maxLength="8" placeholder="Ingresa tu numero de DNI" style={{ width: '100%' }} onChange={buscarDNI} />
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
          <Form.Item label="Celular" name="CELULAR" rules={[{ required: true }]}>
            <Input placeholder="Ingres tu numero de celular" maxLength={9} />
          </Form.Item>
          <Form.Item label="Correo Electronico" name="CORREO" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="Ingresa tu correo electronico"  />
          </Form.Item>
          <Form.Item label="Contraseña" name="PASSWORD" rules={[{ required: true }]}>
            <Input.Password placeholder="Ingresa tu contraseña" />
          </Form.Item>
          <Form.Item label="Repite Contraseña" name="PASSWORD_2" rules={[{ required: true }]} >
            <Input.Password placeholder="Repite tu contraseña" />
          </Form.Item>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button type='primary' block onClick={validarCordinador}>Validar</Button>
          <Button block type="primary" htmlType='submit' disabled={disabledButtonSubmit}>Registrar Estudiante</Button>
        </div>
      </Form>
      <h2 style={{ textAlign: 'center' }}>{nameCordinador}</h2>
      </div>
    </div>
  )
}

export default RegistrarPostulanteCordinadorPage