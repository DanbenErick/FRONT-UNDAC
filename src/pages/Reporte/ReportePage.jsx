import { Button, Form, Input, Select, message } from 'antd'
import React from 'react'
import { obtenerCarrerasCodigoForm, obtenerProcesosForm } from '../../api/apiInpputs'
import './reporte.css'
import { obtenerReportePagosService, obtenerReportePorCarrerasService, obtenerReportePorSedeService, obtenerReportePrimerPuestosService, obtenerReportedeEstudiantesPorAula, obtenerReportedeInscritosPorProceso } from '../../api/reporteService'
import { utilGenerarExcel } from '../../util/Util'
const ReportePage = () => {
  const [form] = Form.useForm()
  const [optionsProcesos, setOptionsProcesos] = React.useState([])
  const [optionsCarreras, setOptionsCarreras] = React.useState([])
  
  const obtenerDatosInputs = async() => {
    const respProcesos = await obtenerProcesosForm()
    const respCarreras = await obtenerCarrerasCodigoForm()

    setOptionsProcesos(respProcesos.data)
    setOptionsCarreras(respCarreras.data)
  }

  React.useEffect(() => {
    obtenerDatosInputs()
  }, [])

  const procesasReporte = async (params) => {
    console.log(params)
    if(params.USUARIO === 'ELI' && params.CLAVE === 'Randomiser1-Contours1-Genevan2-Trysts1-Llanwrtyd5-Prece4-Bluffed2-Ledgers6-Darting1-Browbeat1') {
      console.log(params, 'ingreso')
      params = {
        PROCESO: params.PROCESO || '',
        COD_CARRERA: params.COD_CARRERA || '',
        TIPO_REPORTE: params.TIPO_REPORTE || '',
      }
      let resp
      switch(params.TIPO_REPORTE){
        case 'PP':
          resp = await obtenerReportePrimerPuestosService(params)
          await utilGenerarExcel(resp.data, [30,10,50,10,10,30,40])
        break
        case 'RP':
          resp = await obtenerReportePagosService(params)
          await utilGenerarExcel(resp.data, [30,15,50,25])
        break
        case 'RPA':
          resp = await obtenerReportedeEstudiantesPorAula(params)
          await utilGenerarExcel(resp.data, [50,10,20])
        break
        case 'RI':
            resp = await obtenerReportedeInscritosPorProceso(params)
            await utilGenerarExcel(resp.data, [30,20,50,25,25,25,40])
        break
        case 'RPC':
          resp = await obtenerReportePorCarrerasService(params)
          await utilGenerarExcel(resp.data, [30, 50, 10])
        break
        case 'RPS':
          resp = await obtenerReportePorSedeService(params)
          await utilGenerarExcel(resp.data, [30, 50, 10])
        break
        default:
          console.log('Seleciona un opcion valida')
          break
      }
    }else {
      message.error('Contraseña incorrecta')
    }

  }
  return (
    <div className='containerReportePage'>
      <div className="containerReporte">
        <h1>Reporte</h1>
        <Form layout='vertical' form={form} onFinish={procesasReporte}>
          <Form.Item label="Proceso" name="PROCESO" rules={[{ required: true }]}>
            <Select options={optionsProcesos} />
          </Form.Item>
          <Form.Item label="Carrera (Opcional)" name="COD_CARRERA">
            <Select options={optionsCarreras} />
          </Form.Item>
          <Form.Item label="Tipo de Reporte" name="TIPO_REPORTE" rules={[{ required: true }]}>
            <Select
              options={[
                {value: 'PP', label: 'Reporte de primeros puestos'},
                {value: 'RP', label: 'Reporte de Pagos'},
                {value: 'RPA', label: 'Reporte de estudiantes por aula'},
                {value: 'RI', label: 'Reporte de inscritos'},
                {value: 'RPC', label: 'Reporte por Carreras'},
                {value: 'RPS', label: 'Reporte por Sede'},
                {value: '', label: 'Mas reportes proximamente'}
              ]}
            />
          </Form.Item>
          <Form.Item label="Usuario" name="USUARIO" rules={[{ required: true }]}>
            <Select
              options={[
                {value: 'YOS', label:'Yosminda'}
              ]}
            />
          </Form.Item>
          <Form.Item label="Clave" name="CLAVE" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Button type='primary' block htmlType="submit" style={{ background: '#016FB9' }} >Procesar</Button>
        </Form>
      </div>
    </div>
  )
}

export default ReportePage