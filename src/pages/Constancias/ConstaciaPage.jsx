import React, { useEffect, useState } from 'react';
import SpinnerComponent from '../../components/Spinner';
import {
  message,
  Popconfirm,
  Form,
  Breadcrumb,
  Button,
  Card,
  Table,
  Input,
  Select,
  Tooltip,
  Radio,
  
} from 'antd';
import { CheckOutlined, SaveFilled, SearchOutlined } from '@ant-design/icons';

import '../../assets/styles/VacantesPage.css';

import { generarConstanciaEstudiante, generarConstanciasBloqueService, obtenerIngresanteParaConstanciaPorDNIService, obtenerIngresantesService } from '../../api/cordinadoresService';
import { obtenerProcesosForm } from '../../api/apiInpputs';



const cancel = (e) => {
  message.error('Proceso cancelado');
};

const ConstanciaPage = () => {
  const [formCordinador] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState([]);
  const [inputProcesos, setInputProcesos] = useState([]);
  
  const obtenerDataTable = async() => {
    setLoading(true)
    const resp = await obtenerIngresantesService()
    setDataTable(resp.data)
    setLoading(false)
  }
  useEffect(() => {
    setLoading(true)
    obtenerDataTable()
    getProcesosInputs()
    setLoading(false);
  }, []);
  const columnsTable = [
    {
      title: 'Proceso',
      dataIndex: 'NOMBRE_PROCESO',
      key: 'NOMBRE_PROCESO',
    },
    {
      title: 'DNI',
      dataIndex: 'DNI',
      key: 'DNI',
      render(data, col) {
        return (
            <Tooltip title={col.NOMBRE_COMPLETO}>
                <span>{data}</span>
            </Tooltip>
        )
      }
    },
    {
      title: 'Puntaje',
      dataIndex: 'PUNT_T',
      key: 'PUNT_T',
      render(data, col) {
        return parseFloat(data).toFixed(2)
      }
    },
    {
      title: 'Cod. Matri',
      dataIndex: 'CODIGO_MATRICULA',
      key: 'CODIGO_MATRICULA',
    },
    {
      title: 'Carrera',
      dataIndex: 'CARRERA',
      key: 'CARRERA',
    },
    {
      title: 'Accion',
      align: 'center',
      dataIndex: 'ACCION',
      key: 'ACCION',
      render: (data, col) => (
        
        <>
          <Button onClick={() => { obtenerConstancia({dni: col.DNI, proceso: col.PROCESO, tipo_documento: formCordinador.getFieldValue('TIPO_DOCUMENTO')}) }} type="link" icon={<CheckOutlined />}></Button>
        </>
      )
    }
  ];
  const obtenerConstancia = async(params) => {
    await generarConstanciaEstudiante(params)
  }

  

  
  
  
  const getProcesosInputs = async () => {
    try {
      const resp = await obtenerProcesosForm();

      setInputProcesos(resp.data);
    } catch (error) {
      console.error('Error ', error);
    }
  };
  const buscarEstudiante = async() => {
    const form = formCordinador.getFieldsValue()
    const resp = await obtenerIngresanteParaConstanciaPorDNIService({dni: form.DNI, proceso: form.ID_PROCESO})
    setDataTable(resp.data)
  }
  const generarConstanciasBloque = async({ ID_PROCESO, TIPO_DOCUMENTO }) => {
    await generarConstanciasBloqueService({ proceso: ID_PROCESO, tipo_documento: TIPO_DOCUMENTO })
    
  }
  return (
    <div>
      
      {loading ? <SpinnerComponent /> : ''}
      <div className="contentDashboard">
        <h1 className="titlePageDashboard">Constancias</h1>
        <Breadcrumb className="bradcrumpPadding">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Constancias</Breadcrumb.Item>
        </Breadcrumb>
        <Card type="inner" title="Crear constancias">
          <Form
            layout="vertical"
            form={formCordinador}
            onFinish={generarConstanciasBloque}
          >
            <div className="vacantesPageContainerFormCrearVacante">
              
              
              <Form.Item label="Proceso" name="ID_PROCESO">
                <Select
                  showSearch
                  placeholder="Selecciona un proceso"
                  options={inputProcesos}
                />
              </Form.Item>
              <Form.Item label="DNI" name="DNI">
                <Input maxLength={8} />
              </Form.Item>
              <Form.Item label="Codigo de Matricula" name="TIPO_DOCUMENTO">
              <Radio.Group defaultValue="a" buttonStyle="solid">
                <Radio.Button value="ORIGINAL">Original</Radio.Button>
                <Radio.Button value="CARGO">Cargo</Radio.Button>
              </Radio.Group>
              </Form.Item>
            </div>
                <Popconfirm
                  title="Constancia"
                  description="Quieres generar un bloque de constancias?"
                  onConfirm={() => formCordinador.submit()}
                  onCancel={cancel}
                  okText="Si"
                  cancelText="No"
                >
                  <Button type="primary" style={{ marginRight: '5px' }} icon={<SaveFilled />}>Generar constancias</Button>
                </Popconfirm>
                <Button icon={<SearchOutlined />} onClick={buscarEstudiante}> Buscar</Button>
          </Form>
        </Card>
        <Card type="inner" title="Lista de constancias">
          <Table dataSource={dataTable} columns={columnsTable} size="small" />
        </Card>
      </div>
    </div>
  );
};

export default ConstanciaPage;
