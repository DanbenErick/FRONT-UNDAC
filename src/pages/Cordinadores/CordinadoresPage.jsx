import React, { useEffect, useState } from 'react';
import SpinnerComponent from '../../components/Spinner';
import {
  message,
  Popconfirm,
  Form,
  InputNumber,
  Select,
  Breadcrumb,
  Button,
  Card,
  Table,
  Input,
} from 'antd';
import { SaveFilled, SearchOutlined } from '@ant-design/icons';
import { obtenerModalidadesForm, obtenerProcesosForm } from '../../api/apiInpputs';
import '../../assets/styles/VacantesPage.css';
import {
  crearVacante,
  obtenerVacantesProcesoActivo,
  verificarDisponibilidadProceso,
  obtenerCarrerasPorProcesoInput,
  obtenerVacantesPorId,
} from '../../api/apiVacantes';
import { buscarCordinadorService, obtenerCordinadoresService, obtenerUsuariosService, registrarCordinadorService } from '../../api/cordinadoresService';

const onSearch = (value) => {
  console.log('search:', value);
};

const filterOption = (input, option) => {
  return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
};

const cancel = (e) => {
  message.error('Proceso cancelado');
};

const CordinadoresPage = () => {
  const [formCordinador] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState([]);
  
  
  const obtenerDataTable = async() => {
    const resp = await obtenerCordinadoresService()
    setDataTable(resp.data)
  }
  useEffect(() => {
    setLoading(true)
    obtenerDataTable()
    setLoading(false);
  }, []);
  const columnsTable = [
    {
      title: 'Nombre Completo',
      dataIndex: 'NOMBRES',
      key: 'NOMBRES',
    },
    {
      title: 'Usuario',
      dataIndex: 'USUARIO',
      key: 'USUARIO',
    },
    {
      title: 'DNI',
      dataIndex: 'DNI',
      key: 'DNI',
    },
    {
      title: 'Sede',
      dataIndex: 'SEDE',
      key: 'SEDE',
    },

  ];
  
  const crearCordinador = async(params) => {
    try {
      params.ROL = 3
      console.log(params)
      const resp = await registrarCordinadorService(params)
      console.log(resp)
      if(resp.data && resp.data.ok) {
        message.success(resp.data.message)
        await obtenerDataTable()
        return
      } 
      message.error(resp.data.message)
      // const params = formCordinador()
    }catch(err) {
      console.error(err);
      message.error('Ocurrio un error')
    }
  }
  
  const buscarCordinador = async() => {
    try {
      const params = formCordinador.getFieldsValue()
      const resp = await buscarCordinadorService(params)
      console.log(resp)
      if(resp) {
        // message.success(resp.data.message)
        setDataTable(resp.data)
      }
      // message.error(resp.data.message)
    }catch(error) {
      console.error(error)
    }
  }
  
  return (
    <div>
      
      {loading ? <SpinnerComponent /> : ''}
      <div className="contentDashboard">
        <h1 className="titlePageDashboard">Usuarios</h1>
        <Breadcrumb className="bradcrumpPadding">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
        </Breadcrumb>
        <Card type="inner" title="Crear usuario">
          <Form
            layout="vertical"
            form={formCordinador}
            onFinish={crearCordinador}
          >
            <div className="vacantesPageContainerFormCrearVacante">
              
              <Form.Item label="Nombres Completo" name="NOMBRES">
                <Input />
              </Form.Item>
              <Form.Item label="Usuario" name="USUARIO">
                <Input />
              </Form.Item>
              <Form.Item label="DNI" name="DNI">
                <Input maxLength={8} />
              </Form.Item>
              <Form.Item label="Sede" name="SEDE">
                <Input />
              </Form.Item>
              <Form.Item label="Contraseña" name="PASSWORD">
                <Input />
              </Form.Item>
            </div>
                <Popconfirm
                  title="Cordinadores"
                  description="Estas seguro de crear este cordinador?"
                  onConfirm={() => formCordinador.submit()}
                  onCancel={cancel}
                  okText="Si"
                  cancelText="No"
                >
                  <Button type="primary" icon={<SaveFilled />}>Crear usuario </Button>
                </Popconfirm>
                <Button icon={<SearchOutlined />} onClick={buscarCordinador}> Buscar</Button>
          </Form>
        </Card>
        <Card type="inner" title="Lista de vacantes">
          <Table dataSource={dataTable} columns={columnsTable} size="small" />
        </Card>
      </div>
    </div>
  );
};

export default CordinadoresPage;
