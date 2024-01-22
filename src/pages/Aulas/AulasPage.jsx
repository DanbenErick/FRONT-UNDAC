import { Breadcrumb, Button, Drawer, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import SpinnerComponent from '../../components/Spinner';
import { Card } from 'antd';
import { Form } from 'antd';
import { Select } from 'antd';
import { CloseCircleOutlined, EditFilled, FilePdfOutlined, FolderOpenOutlined, SaveFilled, SearchOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { Input } from 'antd';
import { obtenerProcesosForm } from '../../api/apiInpputs';
import { abrirAulaService, buscarAulaService, cerrarAulaService, crearAulaService, generarPDFEstudiantesAulaService, modificarAulaService, obtenerAulasService } from '../../api/aulasService';

const AulasPage = () => {
  const [loading, setLoading] = useState();
  const [formAulas] = Form.useForm();
  const [formModificarAula] = Form.useForm();
  const [inputProcesos, setInputProcesos] = useState();
  const [dataTable, setDataTable] = useState();
  const [panelAula, setPanelAula] = useState();
  const modificarAula = async (params) => {
    const resp = await modificarAulaService(params)
    if (resp.data.ok) {
      message.success(resp.data.message);
      refreshTable();
      hiddenPanelAula()
      return;
    }
    message.error(resp.data.message);
  };
  const hiddenPanelAula = async () => { setPanelAula(false);  }
  const showPanelEditAula = async (params) => {
    const data = dataTable.find((aula) => aula.ID === params.ID);
    formModificarAula.setFieldsValue(data);
    setPanelAula(true);
  };
  const generarReporteEstudiantesPorAula = async (params) => {
    try {
      const resp = await generarPDFEstudiantesAulaService(params);
      // if (resp.data.ok) {
        message.success(resp.data.message);
        // return;
      // }
      // message.error(resp.data.message);
    }catch(error) {
      console.error(error)
    }
  }
  const abrirAula = async (params) => {
    try {
      const resp = await abrirAulaService(params);
      if (resp.data.ok) {
        message.success(resp.data.message)
        await refreshTable()
        return;
      }
      message.error(resp.data.message);
    }catch(error){
      console.error(error)
    }
  }
  const cerrarAula = async(params) => {
    try {
      const resp = await cerrarAulaService(params);
      if(resp.data.ok) { 
        message.success(resp.data.message)
        await refreshTable()
        return
      }
      message.error(resp.data.message)
    }catch(error) {
      console.error(error)
    }
  }
  const columnsTable = [
    {
      title: 'Proceso',
      dataIndex: 'NOMBRE_PROCESO',
      key: 'NOMBRE_PROCESO',
    },
    {
      title: 'Aula',
      dataIndex: 'NOMBRE_AULA',
      key: 'NOMBRE_AULA',
    },
    {
      title: 'Area',
      dataIndex: 'AREA',
      key: 'AREA',
    },
    {
      title: 'Turno',
      dataIndex: 'TURNO',
      key: 'TURNO',
      render: (data) => data === 'M' ? 'Mañana' : 'Tarde'
    },
    {
      title: 'Capacidad',
      dataIndex: 'INSCRITOS_CAPACIDAD',
      key: 'INSCRITOS_CAPACIDAD',
    },
    {
      title: 'Lleno',
      dataIndex: 'OCUPADO',
      key: 'OCUPADO',
      render: (data) => {
        return data === '1' ? 'Si' : 'No'
      }
    },
    {
      title: 'Action',
      key: 'action',

      render: (_, column) => {
        // if (column.ESTADO === 1) {
        return (
          <>
          <Popconfirm
            title="Carerra"
            description="Quieres editar este aula?"
            onConfirm={() => {
              showPanelEditAula({ ID: column.ID });
            }}
            onCancel={() => ''}
            okText="Si"
            cancelText="No"
          >
            <Button type="link" info icon={<EditFilled />}></Button>
          </Popconfirm>
          <Popconfirm
            title="Aula"
            description="Quieres cerrar esta aula?"
            onConfirm={() => {
              cerrarAula({ ID: column.ID });
            }}
            onCancel={() => ''}
            okText="Si"
            cancelText="No"
          >
            <Button type="link" info style={{ color: 'red' }} icon={<CloseCircleOutlined />}></Button>
          </Popconfirm>
          <Popconfirm
            title="Aula"
            description="Quieres abrir este  aula?"
            onConfirm={() => {
              abrirAula({ID: column.ID});
            }}
            onCancel={() => ''}
            okText="Si"
            cancelText="No"
          >
            <Button type="link" info style={{ color: 'green' }} icon={<FolderOpenOutlined /> }></Button>
          </Popconfirm>
          <Popconfirm
            title="Aula"
            description="Quieres generar un pdf de este aula?"
            onConfirm={() => {
              generarReporteEstudiantesPorAula({ ID_AULA: column.ID, NOMBRE_PROCESO: column.NOMBRE_PROCESO, NOMBRE_AULA: column.NOMBRE_AULA, TURNO: column.TURNO });
            }}
            onCancel={() => ''}
            okText="Si"
            cancelText="No"
          >
            <Button type="link" info style={{ color: 'red' }} icon={<FilePdfOutlined /> }></Button>
          </Popconfirm>
          </>
        );

        // }
        // return ""
      },
    },
  ];
  const guardarAulas = async (params) => {
    const resp = await crearAulaService(params);
    if (resp.data.ok) {
      message.success(resp.data.message);
      refreshTable();
      return;
    }
    message.error(resp.data.message);
  };
  const refreshTable = async () => {
    const resp = await obtenerAulasService();
    setDataTable(resp.data);
  };
  const buscarAula = async () => {
    const resp = await buscarAulaService(formAulas.getFieldsValue())
    if (resp.data.length > 0) {
      setDataTable(resp.data);
      message.success('Encontrado correctamente');
      return;
    }
    message.error(resp.data.message);
  };
  const getInputs = async () => {
    const resp = await obtenerProcesosForm();
    setInputProcesos(resp.data);
  };

  useEffect(() => {
    setLoading(true);
    refreshTable();
    getInputs();
    setLoading(false);
  }, []);
  return (
    <div>
      {loading ? <SpinnerComponent /> : ''}
      <div className="contentDashboard">
        <h1 className="titlePageDashboard">Aulas</h1>
        <Breadcrumb className="bradcrumpPadding">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Aulas</Breadcrumb.Item>
        </Breadcrumb>
        <Card type="inner" title="Crear aula">
          <Form layout="vertical" form={formAulas} onFinish={guardarAulas}>
            <div className="vacantesPageContainerFormCrearVacante">
              <Form.Item rules={[{ required: true }]} label="Proceso" name="ID_PROCESO">
                <Select
                  showSearch
                  placeholder="Selecciona un proceso"
                  options={inputProcesos}
                  
                />
              </Form.Item>
              <Form.Item rules={[{ required: true }]} label="Nombre Aula" name="NOMBRE_AULA">
                <Input  />
              </Form.Item>
              <Form.Item rules={[{ required: true }]} label="Capacidad" name="CAPACIDAD">
                <Input  />
              </Form.Item>
              <Form.Item rules={[{ required: true }]} label="Turno" name="TURNO">
                <Select
                  showSearch
                  placeholder="Seleeciona un turno"
                  options= {[
                    {label: 'Mañana', value: 'M'},
                    {label: 'Tarde', value: 'T'}
                  ]}
                  
                />
              </Form.Item>
              <Form.Item rules={[{ required: true }]} label="Area" name="AREA">
                <Input  />
              </Form.Item>
            </div>
            <Form.Item className="filaBotones">
              <Popconfirm
                title="Proceso"
                description="Estas seguro de guardar el proceso?"
                onConfirm={() => formAulas.submit()}
                onCancel={''}
                okText="Si"
                cancelText="No"
              >
                <Button type="primary" icon={<SaveFilled />}>
                  Guardar Cambios
                </Button>
              </Popconfirm>
              <Button icon={<SearchOutlined />} onClick={buscarAula}>Buscar</Button>
            </Form.Item>
          </Form>
        </Card>
        <Card type="inner" title="Lista de Vouchers">
          <Table dataSource={dataTable} columns={columnsTable} size="small" />
        </Card>

        <Drawer
          title="Modificar carrera"
          placement="right"
          onClose={hiddenPanelAula}
          open={panelAula}
        >
          <Form
            layout="vertical"
            form={formModificarAula}
            onFinish={modificarAula}
          >
            <Form.Item rules={[{ required: true }]} label="Proceso" name="ID_PROCESO">
              <Select
                showSearch
                placeholder="Selecciona un proceso"
                options={inputProcesos}
              />
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label="Nombre Aula" name="NOMBRE_AULA">
              <Input />
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label="Capacidad" name="CAPACIDAD">
              <Input />
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label="Area">
              <Input />
            </Form.Item>
            <Form.Item className="filaBotones">
              <Popconfirm
                title="Proceso"
                description="Estas seguro de guardar el proceso?"
                onConfirm={() => formModificarAula.submit()}
                onCancel={''}
                okText="Si"
                cancelText="No"
              >
                <Button type="primary" icon={<SaveFilled />}>
                  Guardar Cambios
                </Button>
              </Popconfirm>
            </Form.Item>
            <Form.Item name="ID">
              <Input type="hidden" />
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </div>
  );
};

export default AulasPage;
