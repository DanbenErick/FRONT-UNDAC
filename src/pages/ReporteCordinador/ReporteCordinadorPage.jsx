import React, { useEffect, useState } from 'react';
import { Button, Form, Select, Input } from 'antd';
import {  generarReporteCordinadorService, obtenerProcesosForm } from '../../api/apiInpputs';
import './ReporteCordinadorPage.css'
const ReporteCordinadorPage = () => {
  const [selectProcesos, setSelectProcesos] = useState([])
  const [formReporte] = Form.useForm()
  const getInputs = async() => {
    const { data } = await obtenerProcesosForm()
    setSelectProcesos(data)
  }
  useEffect(() => {
    getInputs()
  }, [])
  const generarPDFReporte = async(params) => {
    console.log(params.CLAVE === 'clave')
    if(params.CLAVE === 'clave') {
      const resp = await generarReporteCordinadorService(params)
      if(resp.ok) {
        alert("Generado correctamente")
      }
    }
    
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
          <h1>Reporte Cordinador</h1>
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
          <Button htmlType='submit' block type="primary">Generar reporte</Button>
        </Form>
      </div>
    </div>
  );
};

export default ReporteCordinadorPage;
