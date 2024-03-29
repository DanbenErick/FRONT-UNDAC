import { Breadcrumb, Button, Card, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Form } from 'antd'
import { obtenerPDFResultadosService, procesarMultiPService, procesarSolapasService } from '../../api/resultadosService';
import SpinnerComponent from '../../components/Spinner';
import { obtenerProcesosForm } from '../../api/apiInpputs';
const ResultadosAdmPage = () => {

  
  const [loading, setLoading] = useState(false)
  const [fileSolapa, setFileSolapa] = useState(null);
  const [fileMultiP, setFileMultiP] = useState(null);
  const [stateProceso, setStateProceso] = useState(true)
  const [selectProcesos, setSelectProcesos] = useState([])
  const [nameProceso, setNameProceso] = useState('')
  const [formProceso] = Form.useForm()

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
  const cargarArchivoMultiPCSV = async() => {
    setLoading(true)
    // Crear un objeto FormData a partir del archivo
    const formData = new FormData();
    formData.append('multip', fileMultiP);

    // Enviar el archivo al servidor usando Axios
    const formValues = formProceso.getFieldsValue()
    const resp = await procesarMultiPService(formData, formValues)
    if(resp && resp.data && resp.data.ok) {
      message.success(resp.data.message)
    }else {
      message.error(resp.data.message)
    }
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
    console.log(procesoSeleccionado)
    setNameProceso(procesoSeleccionado.label)
    setStateProceso(false)
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
    // alert("Generando padron")
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
        <Card type="inner" title="Crear proceso">

          <Form
            layout="vertical"
            onFinish={cargarArchivoSolapasCSV}
            form={formProceso}         
          >
            <Form.Item label="Procesos" name="ID_PROCESO">
              <Select
                options={selectProcesos}
                onChange={onChageSelectProcesos}
              />
            </Form.Item>
            {
              !stateProceso
              ?
              <h2>Selecciona solapa y hojas de respuesta del proceso: {nameProceso}</h2>
              :
              ''
            }
            <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <input type="file" onChange={(event) => setFileSolapa(event.target.files[0])} />
              <Button htmlType='submit' type="primary" disabled={stateProceso}>Procesar Solapa {nameProceso}</Button>
            </div>
            </Form.Item>
            
          </Form>
          <Form
            onFinish={cargarArchivoMultiPCSV}
          >
            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <input type="file" onChange={(event) => setFileMultiP(event.target.files[0])} />
                <Button type="primary" htmlType='submit' disabled={stateProceso}>Procesar Respuestas {nameProceso}</Button>
              </div>
            </Form.Item>
          </Form>
          <Button type="primary" disabled={stateProceso} onClick={obtenerPDFResultados}>Obtener PDF {nameProceso}</Button>
        </Card>
      </div>
      </>
  )
};

export default ResultadosAdmPage;
