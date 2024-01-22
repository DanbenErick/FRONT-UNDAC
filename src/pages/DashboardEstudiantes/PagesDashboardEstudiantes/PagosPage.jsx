import { Button, DatePicker, Form, Input, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { comprobarVoucherPorFechaService, obtenerMisPagosService } from '../../../api/pagosDashEstudiService'

const formatDateUtil = (date) => {
  date = new Date(date)
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};
const columnsTable = [
  { title: 'Proceso', dataIndex: 'NOMBRE_PROCESO', key: 'NOMBRE_PROCESO' },
  { title: 'Codigo', dataIndex: 'CODIGO', key: 'CODIGO' },
  { title: 'DNI', dataIndex: 'DNI', key: 'DNI' },
  { title: 'Fecha de Pago', dataIndex: 'FECHA_PAGO', key: 'FECHA_PAGO', render: data => formatDateUtil(data) },
  { title: 'Confirmado', dataIndex: 'ESTADO', key: 'ESTADO', render: data => data === 1 ? 'Confirmado': 'Por confirmar' },
]

const PagosEstudiantePage = () => {
  const [dataTable, setDataTable] = useState()
  const [formPago] = Form.useForm()
  const comprobarPago = async(params) => {
    const fecha = formatDateUtil(new Date(params.FECHA_PAGO))
    const resp = await comprobarVoucherPorFechaService(fecha)
  }
  const refreshTable = async(params) => {
    const resp = await obtenerMisPagosService(params)
    setDataTable(resp.data)
  }
  useEffect(() => {
    refreshTable({ DNI: localStorage.getItem('dni') })
  }, [])
  return (
    <>
    <Form layout='vertical' form={formPago} onFinish={comprobarPago}>
      <div className="cardDashEstudiante">
        <div className="cardDashEstudianteHeader">
          <p>
            <i class="ri-file-history-fill"></i> Pagos Estudiante
          </p>
        </div>
        <div className="cardDashEstudianteBody">
          <div className="gridFormFormularioPagosEstudiante">
            <Form.Item
              className="FormItem"
              label="Codigo de pago "
              name="COD_PAGO"
              rules={[{ required: true }]}
            >
              <Input maxLength={7} />
            </Form.Item>
            <Form.Item
              className="FormItem"
              label="Fecha de Pago"
              name="FECHA_PAGO"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit'>Comprobar</Button>
            </Form.Item>
          </div>
        </div>
        
      </div>
    </Form>
    <div className="cardDashEstudiante" style={{marginTop: '30px'}}>
    <div className="cardDashEstudianteHeader">
      <p>
        <i className="ri-bank-card-fill"></i> Historial de pagos
      </p>
    </div>
    <div className="cardDashEstudianteBody">
      <div className="">
          <Table columns={columnsTable} dataSource={dataTable} scroll={{ x: 800  }} />
      </div>
    </div>
    
  </div>
  </>
  )
}

export default PagosEstudiantePage