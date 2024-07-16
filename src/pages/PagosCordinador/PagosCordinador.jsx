import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal, Table, Tag } from 'antd';

import '../ReporteCordinador/ReporteCordinadorPage.css'
import './PagosCordinador.css'

import {  obtenerTodosLosProcesosActivosForm } from '../../api/apiInpputs';
import { CheckOutlined, ScheduleOutlined, UnlockOutlined } from '@ant-design/icons';
import { obtenerPagosEstudiante, validarPagoCordinadorService } from '../../api/PagosCordinadorService';



const PagosCordinadorPage = () => {
  const [statusModal, setStatusModal] = useState(false)
  const [selectProcesos, setSelectProcesos] = useState([])
  const [dataTable, setDataTable] = useState([])
  const [formReporte] = Form.useForm()
  const getInputs = async() => {
    const { data } = await obtenerTodosLosProcesosActivosForm()
    console.log(data)
    setSelectProcesos(data)
  }
  useEffect(() => {
    getInputs()
  }, [])
  const validarPago = async(pago) => {
    const DNI_CORDINADOR = formReporte.getFieldValue('DNI_CORDINADOR')
    const resp = await validarPagoCordinadorService({ID_PAGO:pago, DNI_CORDINADOR})
    if(resp.data.ok) {
      await obtenerListaDePagos(formReporte.getFieldsValue())
      message.success(resp.data.message)
      setStatusModal(false)
    }else {
      message.error(resp.data.message)
    }
  }
  const obtenerListaDePagos = async (params) => {
    setStatusModal(true)
    const resp = await obtenerPagosEstudiante(params)
    setDataTable(resp.data)
  }
  
  const columns =  [
    {
      title: 'DNI',
      dataIndex: 'DNI',
      key: 'DNI',
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Nombres',
      dataIndex: 'NOMBRE_COMPLETO',
      key: 'NOMBRE_COMPLETO',
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Codigo',
      dataIndex: 'CODIGO',
      key: 'CODIGO',
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Monto',
      dataIndex: 'MONTO',
      key: 'MONTO',
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Estado',
      dataIndex: 'ESTADO',
      key: 'ESTADOS',
      responsive: ['xs', 'sm', 'md', 'lg'],
      render: (data) => {
        return data === 1 ? <Tag color="green">CONFIRMADO</Tag> : <Tag color="red">FALTA CONFIRMAR</Tag>
      } 
    },
    {
      title: 'ACCION',
      dataIndex: 'ACCION',
      key: 'ACCION',
      responsive: ['xs', 'sm', 'md', 'lg'],
      render: (data, data2) => {
          if(data2.ESTADO !== 1) {
            return (<Button onClick={() => validarPago(data2.ID)} icon={<CheckOutlined />}></Button>)
          }else {
            return ''
          }
          
      }
    },
  ]

  return (
    <div className='containerReporteCordinador'>
      <div className="containerFormReporteCordinador">

        <Form
          layout="vertical"
          onFinish={obtenerListaDePagos}
          form={formReporte}
          // initialValues={initialValues}
        >
          <h1>Pagos Coordinador</h1>
          <Form.Item label="DNI del Coordinador" name="DNI_CORDINADOR" rules={[{ required: true }]}>
            <Input addonBefore={<UnlockOutlined />} />
          </Form.Item>
          <Form.Item label="DNI del Postulante" name="DNI_POSTULANTE" rules={[{ required: true }]}>
            <Input addonBefore={<ScheduleOutlined />} />
          </Form.Item>
          
          <Button htmlType='submit' block type="primary">Consultar</Button>
          
        </Form>
      </div>
      <Modal centered width={1000} title="Direccion de Admision" open={statusModal} onOk={() => setStatusModal(false)} onCancel={() => setStatusModal(false)} footer={null}>
        <div className="containerModalPagosCordinador">
          <Table columns={columns} dataSource={dataTable} pageSize={1000} pagination={false} scroll={{ x: 'max-content' }} />
        </div>
      </Modal>
    </div>
  );
};

export default PagosCordinadorPage;
