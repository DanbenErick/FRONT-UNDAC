import { Button, DatePicker, Form, Input, Select, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { comprobarVoucherPorFechaService, obtenerMisPagosService, registrarPagoService } from '../../../api/pagosDashEstudiService'
import { obtenerModalidadesForm, obtenerProcesoActivoForm, obtenerTodosLosProcesosActivosForm } from '../../../api/apiInpputs';

const formatDateUtil = (date) => {
  date = new Date(date)
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
const columnsTable = [
  { title: 'Proceso', dataIndex: 'NOMBRE_PROCESO', key: 'NOMBRE_PROCESO' },
  { title: 'Codigo', dataIndex: 'CODIGO', key: 'CODIGO' },
  { title: 'DNI', dataIndex: 'DNI', key: 'DNI' },
  { title: 'Fecha de Pago', dataIndex: 'FECHA_PAGO', key: 'FECHA_PAGO', render: data => dayjs(data).format('DD/MM/YYYY') },
  { title: 'Pago', dataIndex: 'MONTO', key: 'FECHA_PAGO', render: data => `S/. ${data}.00` },
  { title: 'Confirmado', dataIndex: 'ESTADO', key: 'ESTADO', render: data => data === 1 ? 'Confirmado': 'Por confirmar' },
]

const PagosEstudiantePage = () => {
  const [dataTable, setDataTable] = useState()
  const [formPago] = Form.useForm()
  const [selectProcesos, setSelectProcesos] = useState([]);
  const comprobarPago = async(params) => {
    const fecha = formatDateUtil(new Date(params.FECHA_PAGO))
    const data_send = {
      ID_PROCESO: params.ID_PROCESO,
      DNI: localStorage.getItem('dni'),
      CODIGO: params.COD_PAGO,
      FECHA_PAGO: fecha,
      AGE: params.AGE,
      CAJ: params.CAJ,
      MONTO: params.MONTO
    }
    console.log(data_send)
    // const resp = await comprobarVoucherPorFechaService(fecha)
    const resp = await registrarPagoService(data_send)
    if(resp.data.ok) {
      message.success(resp.data.message)
      refreshTable({ DNI: localStorage.getItem('dni') })
    }else {
      message.error(resp.data.message)
    }
  }
  const getInputs = async() => {
    const resp_proceso_activo = await obtenerTodosLosProcesosActivosForm();
    setSelectProcesos(resp_proceso_activo.data);
  }
  const refreshTable = async(params) => {
    const resp = await obtenerMisPagosService(params)
    setDataTable(resp.data)
  }
  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  useEffect(() => {
    getInputs()
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
              label="Proceso"
              name="ID_PROCESO"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                placeholder="Selecciona un proceso"
                options={selectProcesos}
                filterOption={filterOption}
              />
            </Form.Item>
            <Form.Item
              className="FormItem"
              label="Codigo de pago"
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
            <Form.Item
              className="FormItem"
              label="Caj"
              name="CAJ"
              rules={[{ required: true }]}
            >
              <Input maxLength={4} />
            </Form.Item>
            <Form.Item
              className="FormItem"
              label="Age"
              name="AGE"
              rules={[{ required: true }]}
            >
              <Input maxLength={4} />
            </Form.Item>
            <Form.Item
              className="FormItem"
              label="Monto"
              name="MONTO"
              rules={[{ required: true }]}
            >
              <Input maxLength={3} />
            </Form.Item>
          </div>
            <Form.Item>
              <Button htmlType='submit'>Registrar Pago</Button>
            </Form.Item>
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
          <Table columns={columnsTable} dataSource={dataTable} scroll={{ x: 800  }} pagination={false} />
      </div>
    </div>
    
  </div>
  </>
  )
}

export default PagosEstudiantePage