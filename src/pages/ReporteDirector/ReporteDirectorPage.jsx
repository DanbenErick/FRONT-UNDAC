import React, { useEffect, useState } from 'react';
import { Button, Form, Select, Input, Modal, Tooltip, Image, message } from 'antd';
import { obtenerProcesosForm } from '../../api/apiInpputs';
import '../ReporteCordinador/ReporteCordinadorPage.css'
import { consultarResultadoPorEstudiante } from '../../api/reporteDirectorService';
const ReporteDirectorPage = () => {
  const [selectProcesos, setSelectProcesos] = useState([])
  const [statusModal, setStatusModal] = useState(false)
  const [dataEstudiante, setDataEstudiante] = useState({})
  const [foto, setFoto] = useState('')
  const [formReporte] = Form.useForm()
  const getInputs = async() => {
    const { data } = await obtenerProcesosForm()
    setSelectProcesos(data)
  }
  useEffect(() => {
    getInputs()
  }, [])
  const openModal = async() => {
    
  }
  const generarPDFReporte = async(params) => {
    console.log("Paramtros ", params)
    const resp = await consultarResultadoPorEstudiante(params)
    
    if(params.CLAVE === 'admision-2025') {

      if(resp.status === 200 && resp.data.length) {
        setStatusModal(true)
        setDataEstudiante(resp.data[0])
        setFoto(`${process.env.REACT_APP_API_URL}/${dataEstudiante.DNI}/${dataEstudiante.DNI}.jpeg`)
        // setFoto(`http://143.198.105.92:3500/${dataEstudiante.DNI}/${dataEstudiante.DNI}.jpeg`)
        // setFoto(`http://143.198.105.92:3500/60010047/60010047.jpeg`)
        console.log(resp.data)
      }else {
        message.error('No se encontraron datos del dni mencionado')
      }
    }else {
      alert("Contraseña incorrecta")
    }

    // console.log(params.CLAVE === 'clave')
    // if(params.CLAVE === 'clave') {
    //   const resp = await generarReporteCordinadorService(params)
    //   if(resp.ok) {
    //     alert("Generado correctamente")
    //   }
    // }
    
  }
  return (
    <div className='containerReporteCordinador'>
      <div className="containerFormReporteCordinador">

        <Form
          layout="vertical"
          onFinish={generarPDFReporte}
          form={formReporte}
          // initialValues={initialValues}
        >
          <h1>Reporte Director</h1>
          <Form.Item
            label="Proceso"
            name="ID_PROCESO"
            rules={[{ required: true }]}
          >
            <Select
              options={selectProcesos}
            />
          </Form.Item>
          <Form.Item label="DNI" name="DNI" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Clave" name="CLAVE" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Button htmlType='submit' block type="primary" onClick={openModal}>Consultar</Button>
          
        </Form>
      </div>
      <Modal title="Direccion de Admision"  open={statusModal} onOk={() => setStatusModal(false)} onCancel={() => setStatusModal(false)}>
        <div className="containerModalReporteDirector">
          <h1>{dataEstudiante.NOMBRE_PROCESO}</h1>
          <h1>{dataEstudiante.EST_OPCION}</h1>
          <div className="containerImageModalReporteDirector">
            {/* <Image src={foto} /> */}
            <img src={foto} style={{ maxWidth: '80%', width: '80%' }} alt='Foto de perfil' />
          </div>
          <ul>
            <li><b>Nombre Completo:</b> {dataEstudiante.NOMBRE_COMPLETO}</li>
            <li><b>Celular:</b> {dataEstudiante.CELULAR}</li>
            <li><b>Correo:</b> {dataEstudiante.CORREO}</li>
            <li><b>Direccion:</b> {dataEstudiante.DIRECCION}</li>
            <li><b>Discapacidad:</b> {dataEstudiante.DISCAPACIDAD}</li>
            <li><b>DNI:</b> {dataEstudiante.DNI}</li>
            <li><b>Programa:</b> {dataEstudiante.ESCUELA_COMPLETA}</li>
            <li><b>Fecha de Nacimiento:</b> {dataEstudiante.FECHA_NACIMIENTO}</li>
            <li><b>Colegio:</b> {dataEstudiante.NOMBRE_COLEGIO}</li>
            <li><b>Puntaje:</b> {dataEstudiante.PUNT_T}</li>
            <li><b>Residencia:</b> {dataEstudiante.RESIDENCIA}</li>
            <li><b>Sexo:</b> {dataEstudiante.SEXO}</li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default ReporteDirectorPage;