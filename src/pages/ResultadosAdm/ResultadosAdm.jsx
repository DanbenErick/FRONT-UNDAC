import { Breadcrumb, Button, Card } from 'antd';
import React, { useState } from 'react';
import { Form } from 'antd'
import { procesarSolapasService } from '../../api/resultadosService';
const ResultadosAdmPage = () => {

  const [fileSolapa, setFileSolapa] = useState(null);

  const cargarArchivoSolapasCSV = async () => {

    

    // Crear un objeto FormData a partir del archivo
    const formData = new FormData();
    formData.append('solapa', fileSolapa);

    // Enviar el archivo al servidor usando Axios
  
    await procesarSolapasService(formData)
    console.log("Cargando archivo")
  }
  const cargarArchivoMultiPCSV = () => {
    console.log('Cargando archivo multip')
  }
  return (
    <div className="contentDashboard">
        <h1 className="titlePageDashboard">Procesos</h1>
        <Breadcrumb className="bradcrumpPadding">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Resultados</Breadcrumb.Item>
        </Breadcrumb>
        <Card type="inner" title="Crear proceso">

          <Form
            layout="horizontal"
            onFinish={cargarArchivoSolapasCSV}
          >
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
                <input type="file" />
              </div>
              <Button type="primary">Procesar MultiP</Button>
            </Form.Item>
          </Form>
          <Button>Procesar Ingresantes</Button>
        </Card>
      </div>
  )
};

export default ResultadosAdmPage;
