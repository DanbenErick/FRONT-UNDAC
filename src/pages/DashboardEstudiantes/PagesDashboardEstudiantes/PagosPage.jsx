import { Button, DatePicker, Form, Image, Input, Modal, Select, Table, Tag, message } from 'antd'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { comprobarVoucherPorFechaService, obtenerMisPagosService, registrarPagoService } from '../../../api/pagosDashEstudiService'
import { obtenerModalidadesForm, obtenerProcesoActivoForm, obtenerTodosLosProcesosActivosForm } from '../../../api/apiInpputs';
import { validarRequisitosParaInscripcionService } from '../../../api/inscripcionDashEstudianteService';

const formatDateUtil = (date) => {
  date = new Date(date)
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}


const PagosEstudiantePage = () => {
  const [dataTable, setDataTable] = useState()
  const [formPago] = Form.useForm()
  const [selectProcesos, setSelectProcesos] = useState([]);

  const [statusModalFoto, setStatusModalFoto] = useState(false)

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
    // for(let i = 0; i < resp.data.length; i++) {
    //   console.log(resp.data[i].ID_PROCESO, resp.data[i].DNI)
    //   const {data} = await validarRequisitosParaInscripcionService({ DNI: resp.data[i].DNI, TIPO_PROCESO: 'O' , PROCESO: resp.data[i].ID_PROCESO})
    // }

    
    // resp.data.forEach(element => {
    // });
  }
  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  useEffect(() => {
    getInputs()
    refreshTable({ DNI: localStorage.getItem('dni') })
  }, [])

  const validateMonto = (rule, value) => {
    console.log(parseInt(value), value)
    if(value.length !== 0 && !/^\d+$/.test(value)) {
      return Promise.reject('Monto inválido');
    }
    if(value.length !== 0 && value.length !== 3) {
      return Promise.reject('El monto debe tener 3 dígitos como maximo');
    }
    if(parseInt(value) > 351) {
      return Promise.reject('El monto no debe ser mayor a 351');
    }
    return Promise.resolve();
  }


  const columnsTable = [
    { title: 'Proceso', dataIndex: 'NOMBRE_PROCESO', key: 'NOMBRE_PROCESO' },
    { title: 'Codigo', dataIndex: 'CODIGO', key: 'CODIGO' },
    { title: 'DNI', dataIndex: 'DNI', key: 'DNI' },
    { title: 'Fecha de Pago', dataIndex: 'FECHA_PAGO', key: 'FECHA_PAGO', render: data => dayjs(data).format('DD/MM/YYYY') },
    { title: 'Pago', dataIndex: 'MONTO', key: 'FECHA_PAGO', render: data => `S/. ${data}.00` },
    { title: 'Confirmado', dataIndex: 'ESTADO', key: 'ESTADO', render: data => data === 1 ? <Tag color="green">CONFIRMADO</Tag>: <Tag color="red">FALTA CONFIRMAR</Tag> },
  ]


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
              <DatePicker style={{ width: '100%' }} format={'DD-MM-YYYY'} />
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
              rules={[{ required: true }, { validator: validateMonto }]}
            >
              <Input maxLength={3} />
            </Form.Item>
          </div>
            <Form.Item>
              <Button htmlType='submit' type="primary">Registrar Pago</Button> | 
              <Button onClick={() => setStatusModalFoto(true)}>Ejemplar de Voucher</Button>
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
  <Modal title="Modelo de Fotografia (Actualizada)"  open={statusModalFoto} onOk={() => setStatusModalFoto(false)} onCancel={() => setStatusModalFoto(false)}>
    <Image src={process.env.PUBLIC_URL + '/ejemplo_voucher.png'} />
  </Modal>
  </>
  )
}

export default PagosEstudiantePage