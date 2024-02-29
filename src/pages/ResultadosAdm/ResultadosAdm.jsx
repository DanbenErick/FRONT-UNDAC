import { Breadcrumb, Button, Card, Select, message } from 'antd';
import React, { useState } from 'react';
import { Form } from 'antd'
import { procesarMultiPService, procesarSolapasService } from '../../api/resultadosService';
import SpinnerComponent from '../../components/Spinner';
const ResultadosAdmPage = () => {

  
  const [loading, setLoading] = useState(false)
  const [fileSolapa, setFileSolapa] = useState(null);
  const [fileMultiP, setFileMultiP] = useState(null);


  const cargarArchivoSolapasCSV = async () => {

    
    setLoading(true)
    // Crear un objeto FormData a partir del archivo
    const formData = new FormData();
    formData.append('solapa', fileSolapa);

    // Enviar el archivo al servidor usando Axios
  
    const resp = await procesarSolapasService(formData)
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
  
    const resp = await procesarMultiPService(formData)
    if(resp && resp.data && resp.data.ok) {
      message.success(resp.data.message)
    }else {
      message.error(resp.data.message)
    }
    setLoading(false)
    console.log("Cargando archivo")
  }
  return (
    <>
    {loading ? <SpinnerComponent /> : ''}
    <div className="contentDashboard">
        <h1 className="titlePageDashboard">Procesos</h1>
        <Breadcrumb className="bradcrumpPadding">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Resultados</Breadcrumb.Item>
        </Breadcrumb>
        <Card type="inner" title="Crear proceso">

          <Form
            layout="vertical"
            onFinish={cargarArchivoSolapasCSV}
          >
            <Form.Item label="Procesos">
              <Select
                options={[]}
              />
            </Form.Item>

            <Form.Item>
              <input type="file" onChange={(event) => setFileSolapa(event.target.files[0])} />
              <Button htmlType='submit' type="primary">Procesar Solapa</Button>
            </Form.Item>
            
          </Form>
          <Form
            onFinish={cargarArchivoMultiPCSV}
          >
            <Form.Item>
              <div>
                <input type="file" onChange={(event) => setFileMultiP(event.target.files[0])} />
              </div>
              <Button type="primary" htmlType='submit'>Procesar MultiP</Button>
            </Form.Item>
          </Form>
          <Button>Procesar Ingresantes</Button>
        </Card>
      </div>
      </>
  )
};

export default ResultadosAdmPage;
