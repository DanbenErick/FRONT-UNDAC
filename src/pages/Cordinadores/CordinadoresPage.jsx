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
  Tag,
  
} from 'antd';
import { CheckOutlined, SaveFilled, SearchOutlined, StopOutlined } from '@ant-design/icons';

import '../../assets/styles/VacantesPage.css';

import { buscarCordinadorService, modificarEstadoCordinador, obtenerCordinadoresService, obtenerUsuariosService, registrarCordinadorService } from '../../api/cordinadoresService';



const cancel = (e) => {
  message.error('Proceso cancelado');
};

const CordinadoresPage = () => {
  const [formCordinador] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState([]);
  
  
  const obtenerDataTable = async() => {
    setLoading(true)
    const resp = await obtenerCordinadoresService()
    setDataTable(resp.data)
    setLoading(false)
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
      align: 'center',
    },
    {
      title: 'DNI',
      dataIndex: 'DNI',
      key: 'DNI',
      align: 'center',
    },
    {
      title: 'Sede',
      dataIndex: 'SEDE',
      align: 'center',
      key: 'SEDE',
    },
    {
      title: 'Estado',
      align: 'center',
      dataIndex: 'ESTADO',
      key: 'ESTADO',
      render: (data, col) => {
        return  (data === 1) ? <Tag color="success">Habilitado</Tag> : <Tag color="error">Desabilitado</Tag>
      }
    },
    {
      title: 'Accion',
      align: 'center',
      dataIndex: 'ACCION',
      key: 'ACCION',
      render: (data, col) => (
        
        <>
          <Button onClick={() => { habilitarCordinador(col.DNI) }} type="link" icon={<CheckOutlined />}></Button>
          <Button onClick={() => { desabilitarCordinador(col.DNI) }} style={{ color: 'red' }} type="link" icon={<StopOutlined />}></Button>
        </>
      )
    }
  ];
  
  const habilitarCordinador = async(params) => {
    await modificarEstadoCordinador({dni: params, estado:1})
    await obtenerDataTable()
  }
  const desabilitarCordinador = async(params) => {
    await modificarEstadoCordinador({dni: params, estado:0})
    await obtenerDataTable()
  }

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
        <h1 className="titlePageDashboard">Cordinador</h1>
        <Breadcrumb className="bradcrumpPadding">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Cordinador</Breadcrumb.Item>
        </Breadcrumb>
        <Card type="inner" title="Crear cordinador">
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
        <Card type="inner" title="Lista de cordinadores">
          <Table dataSource={dataTable} columns={columnsTable} size="small" />
        </Card>
      </div>
    </div>
  );
};

export default CordinadoresPage;
