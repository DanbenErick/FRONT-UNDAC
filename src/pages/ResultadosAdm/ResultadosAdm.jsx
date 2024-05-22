import { Breadcrumb, Button, Card, Input, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Form } from 'antd'
import { obtenerPDFResultadosService, obtenerPDFResultadosServiceEF, obtenerPDFResultadosServicePE, procesarMultiPEFService, procesarMultiPPEService, procesarMultiPService, procesarSolapasEFService, procesarSolapasService } from '../../api/resultadosService';
import SpinnerComponent from '../../components/Spinner';
import { obtenerProcesosForm } from '../../api/apiInpputs';
import { FilePdfOutlined, SettingOutlined } from '@ant-design/icons';
const ResultadosAdmPage = () => {

  
  const [loading, setLoading] = useState(false)
  const [fileSolapa, setFileSolapa] = useState(null);
  const [fileSolapaEF, setFileSolapaEF] = useState(null);
  const [fileMultiP, setFileMultiP] = useState(null);
  const [stateProceso, setStateProceso] = useState(true)
  const [selectProcesos, setSelectProcesos] = useState([])
  const [nameProceso, setNameProceso] = useState('')
  const [formProceso] = Form.useForm()
  const [tipoProcesoSeleccionado, setTipoProcesoSeleccionado] = useState('')

  const cargarArchivoSolapasCSV = async () => {
    setLoading(true)
    // Crear un objeto FormData a partir del archivo
    const formData = new FormData();
    formData.append('solapa', fileSolapa);
    // Enviar el archivo al servidor usando Axios
    const formValues = formProceso.getFieldsValue()
    const resp = await procesarSolapasService(formData, formValues)
    if(resp && resp.data && resp.data.ok) {
      message.success(resp.data.message)
    }else {
      message.error(resp.data.message)
    }
    setLoading(false)
    console.log("Cargando archivo")
  }
  const cargarArchivoSolapasCSVEF = async () => {
    setLoading(true)
    // Crear un objeto FormData a partir del archivo
    const formData = new FormData();
    formData.append('solapa', fileSolapaEF);
    // Enviar el archivo al servidor usando Axios
    const formValues = formProceso.getFieldsValue()
    const resp = await procesarSolapasEFService(formData, formValues)
    if(resp && resp.data && resp.data.ok) {
      message.success(resp.data.message)
    }else {
      message.error(resp.data.message)
    }
    setLoading(false)
    console.log("Cargando archivo")
  }
  const cargarArchivoMultiPCSV = async() => {
    setLoading(true)
    // Crear un objeto FormData a partir del archivo
    const formData = new FormData();
    formData.append('multip', fileMultiP);

    // Enviar el archivo al servidor usando Axios
    const formValues = formProceso.getFieldsValue()
    const resp = await procesarMultiPService(formData, formValues)
    message.success(resp.data.message)
    // if(resp && resp.data && resp.data.ok) {
    //   message.success(resp.data.message)
    //   message.success(resp.data.message)
    // }else {
    //   message.sucess(resp.data.message)
    // }
    setLoading(false)
    console.log("Cargando archivo")
  }
  const procesarMultiPPE = async() => {
    setLoading(true)
    // Crear un objeto FormData a partir del archivo
    const formData = new FormData();
    formData.append('multip', fileMultiP);

    // Enviar el archivo al servidor usando Axios
    const formValues = formProceso.getFieldsValue()
    const resp = await procesarMultiPPEService(formData, formValues)
    message.success(resp.data.message)
    // if(resp && resp.data && resp.data.ok) {
    //   message.success(resp.data.message)
    //   message.success(resp.data.message)
    // }else {
    //   message.sucess(resp.data.message)
    // }
    setLoading(false)
    console.log("Cargando archivo")
  }
  const procesarMultiPEF = async() => {
    setLoading(true)
    // Crear un objeto FormData a partir del archivo
    const formData = new FormData();
    formData.append('multip', fileMultiP);

    // Enviar el archivo al servidor usando Axios
    const formValues = formProceso.getFieldsValue()
    const resp = await procesarMultiPEFService(formData, formValues)
    message.success(resp.data.message)
    // if(resp && resp.data && resp.data.ok) {
    //   message.success(resp.data.message)
    //   message.success(resp.data.message)
    // }else {
    //   message.sucess(resp.data.message)
    // }
    setLoading(false)
    console.log("Cargando archivo")
  }
  
  const getSelects = async() => {
    const resp = await obtenerProcesosForm()
    setSelectProcesos(resp.data)
  }
  useEffect(() => {
    getSelects()
  },[])
  const onChageSelectProcesos = async(valor) => {
    
    const [procesoSeleccionado] = selectProcesos.filter(proceso => proceso.value == valor)
    setTipoProcesoSeleccionado(procesoSeleccionado.TIPO_PROCESO)
    if(procesoSeleccionado.TIPO_PROCESO !== 'G'){
      console.log(procesoSeleccionado)
      setNameProceso(procesoSeleccionado.label)
      setStateProceso(false)
    }else {
      message.info('No es un proceso valido para procesar')
      setStateProceso(true)
    }
  }
  const obtenerPDFResultados = async(data) => {
    setLoading(true)
    const params = formProceso.getFieldsValue()
    const resp = await obtenerPDFResultadosService(params)
    console.log(resp)
    if(resp && resp.ok) {
      message.success('Todo correcto')
    }else { 
      message.error('Ocurrio un error')
    }
    setLoading(false)
  }
  const obtenerPDFResultadosPE = async(data) => {
    setLoading(true)
    const params = formProceso.getFieldsValue()
    const resp = await obtenerPDFResultadosServicePE(params)
    console.log(resp)
    if(resp && resp.ok) {
      message.success('Todo correcto')
    }else { 
      message.error('Ocurrio un error')
    }
    setLoading(false)
  }
  const obtenerPDFResultadosEF = async(data) => {
    setLoading(true)
    const params = formProceso.getFieldsValue()
    const resp = await obtenerPDFResultadosServiceEF(params)
    console.log(resp)
    if(resp && resp.ok) {
      message.success('Todo correcto')
    }else { 
      message.error('Ocurrio un error')
    }
    setLoading(false)
  }
  return (
    <>
    {loading ? <SpinnerComponent /> : ''}
    <div className="contentDashboard">
        <h1 className="titlePageDashboard">Resultados</h1>
        <Breadcrumb className="bradcrumpPadding">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Resultados</Breadcrumb.Item>
        </Breadcrumb>
        <Card type="inner" title="Panel Resultados">

          <Form layout="vertical" onFinish={cargarArchivoSolapasCSV} form={formProceso}>
            <Form.Item label="Procesos" name="ID_PROCESO" rules={[{ required: true }]}>
              <Select options={selectProcesos} onChange={onChageSelectProcesos}/>
            </Form.Item>
            <Form.Item label="Comision" name="RESPONSABLE" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Card type="inner" title="Panel Solapa">
            {
              !stateProceso
              ? (
                <>
                  {/* <h2>PROCESANDO: {nameProceso}</h2> */}
                  <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <input type="file" onChange={(event) => setFileSolapa(event.target.files[0])} />
                      <Button style={{ background: '#003459' }} icon={<SettingOutlined />} htmlType='submit' type="primary" disabled={stateProceso}>Procesar SP PE</Button>
                    </div>
                    {
                      (tipoProcesoSeleccionado === 'C') 
                      &&
                      (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <input type="file" onChange={(event) => setFileSolapaEF(event.target.files[0])} />
                          <Button style={{ background: '#003459' }} icon={<SettingOutlined />} onClick={cargarArchivoSolapasCSVEF} type="primary" disabled={stateProceso}>Procesar SP EF</Button>
                        </div>
                      )
                    }
                  </Form.Item>
                </>
              )
              :''
            }
            </Card>
          </Form>

          <Card type="inner" title="Panel Respuestas">
          {
            (tipoProcesoSeleccionado === 'O' || tipoProcesoSeleccionado === 'V')
            ?
            (
              <Form onFinish={cargarArchivoMultiPCSV}>
                <Form.Item>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <input type="file" onChange={(event) => setFileMultiP(event.target.files[0])} />
                    <Button style={{ background: '#003459' }} icon={<SettingOutlined />} type="primary" htmlType='submit' disabled={stateProceso}>Procesar</Button>
                  </div>
                </Form.Item>
              </Form>
            )
            : ''
          }
          {
            (tipoProcesoSeleccionado === 'C')
            ?
            (
              <Form onFinish={cargarArchivoMultiPCSV}>
                <Form.Item>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px' }}>
                    <input type="file" onChange={(event) => setFileMultiP(event.target.files[0])} />
                    <Button type="primary" icon={<SettingOutlined />} style={{ background: '#003459' }} onClick={procesarMultiPPE} disabled={stateProceso}>Procesar PE</Button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <input type="file" onChange={(event) => setFileMultiP(event.target.files[0])} />
                    <Button type="primary" icon={<SettingOutlined />} style={{ background: '#003459' }} onClick={procesarMultiPEF} disabled={stateProceso}>Procesar UE</Button>
                  </div>
                </Form.Item>
              </Form>
            )
            : ''
          }
          </Card>
          


          <Card type="inner" title="Panel de Publicacion">
          {/* Botones de Ordinario, Posgrado */}
          {
            (tipoProcesoSeleccionado === 'O' || tipoProcesoSeleccionado === 'V')
            ?
              <Button type="primary" block disabled={stateProceso} onClick={obtenerPDFResultados}>Publicar Resultado</Button>
            : ''
          }
          {/* Botones de cepre */}
          {
              (tipoProcesoSeleccionado === 'C') 
              ?
                (
                  <div style={{ display: 'flex' }}>
                    <Button type="primary" icon={<FilePdfOutlined />} block style={{ marginRight: '10px', background: '#151E3F' }} disabled={stateProceso} onClick={obtenerPDFResultadosPE}>Obtener Primer Resultado {nameProceso}</Button>
                    <Button type="primary" icon={<FilePdfOutlined />} block style={{ background: '#151E3F' }} disabled={stateProceso} onClick={obtenerPDFResultadosEF}>Obtener Resultado Final {nameProceso}</Button>
                  </div>
                )
              : ''
              
            }
            </Card>
        </Card>
      </div>
      </>
  )
};

export default ResultadosAdmPage;
