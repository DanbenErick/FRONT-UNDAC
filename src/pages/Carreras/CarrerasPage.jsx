import React, { useEffect, useState } from 'react';
import SpinnerComponent from '../../components/Spinner';
import { Breadcrumb, Button, Table } from 'antd';
import { Card } from 'antd';
import { Form } from 'antd';
import { Select } from 'antd';
import { InputNumber } from 'antd';
import { Popconfirm } from 'antd';
import { SaveFilled, SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { obtenerFacultadesForm } from '../../api/apiInpputs';
import {
  buscarCarrerasPorFacultad,
  crearCarreraService,
  modificarCarreraService,
  obtenerCarrerasTable,
} from '../../api/carrerasService';
import { Drawer } from 'antd';
import { message } from 'antd';

const CarreraPage = () => {
  const [loading, setLoading] = useState(false);
  const [formCarreras] = Form.useForm();
  const [formModificarCarreras] = Form.useForm();
  const [dataTable, setDataTable] = useState([]);
  const [selectFacultad, setSelectFacultad] = useState([]);
  const [panelEditarCarrera, setPanelEditarCarrera] = useState(false);
  const showPanelEditCarrera = async (params) => {
    const data = dataTable.find((carrera) => carrera.ID === params.ID);
    formModificarCarreras.setFieldsValue(data);
    setPanelEditarCarrera(true);
  };
  const hiddenPanelEditCarrera = () => setPanelEditarCarrera(false);
  const columnsTable = [
    {
      title: 'Facultad',
      dataIndex: 'FACULTAD',
      key: 'FACULTAD',
    },
    {
      title: 'Carrera',
      dataIndex: 'ESCUELA_COMPLETA',
      key: 'ESCUELA_COMPLETA',
    },
    {
      title: 'Codigo',
      dataIndex: 'CODIGO_ESCUELA',
      key: 'CODIGO_ESCUELA',
    },
    {
      title: 'Area',
      dataIndex: 'AREA',
      key: 'AREA',
    },
    {
      title: 'Sede',
      dataIndex: 'SEDE_FACULTAD',
      key: 'SEDE_FACULTAD',
    },
    {
      title: 'Action',
      key: 'action',

      render: (_, column) => {
        // if (column.ESTADO === 1) {
        return (
          <Popconfirm
            title="Carerra"
            description="Quieres editar este carrera?"
            onConfirm={() => {
              showPanelEditCarrera({ ID: column.ID });
            }}
            onCancel={() => ''}
            okText="Si"
            cancelText="No"
          >
            <Button type="link" info>
              Editar
            </Button>
          </Popconfirm>
        );

        // }
        // return ""
      },
    },
  ];
  const loadSelects = async () => {
    const resp = await obtenerFacultadesForm();
    setSelectFacultad(resp.data);
  };
  const refreshTable = async () => {
    const resp = await obtenerCarrerasTable();
    setDataTable(resp.data);
  };
  useEffect(() => {
    loadSelects();
    refreshTable();
  }, []);

  const guardarCarrera = async (params) => {
    setLoading(true);
    params.ESCUELA_COMPLETA = `${params.ESCUELA} (${params.SEDE_FACULTAD})`;
    const resp = await crearCarreraService(params);
    setLoading(false);
    if (resp.data.ok) {
      message.success(resp.data.message);
      formCarreras.resetFields();
      refreshTable();
      return;
    }
    message.error(resp.data.message);
  };
  const modificarCarrera = async (params) => {
    setLoading(true);
    params.ESCUELA_COMPLETA = `${params.ESCUELA} (${params.SEDE_FACULTAD})`;
    const resp = await modificarCarreraService(params);
    setLoading(false);
    if (resp.data.ok) {
      message.success(resp.data.message);
      refreshTable();
      hiddenPanelEditCarrera();
      return;
    }
    message.error(resp.data.message);
  };
  const buscarCarreraPorFacultad = async () => {
    setLoading(true);
    const FACULTAD = formCarreras.getFieldValue('FACULTAD');
    const resp = await buscarCarrerasPorFacultad({ FACULTAD });
    setDataTable(resp.data);
    setLoading(false);
  };
  return (
    <div>
      {loading ? <SpinnerComponent /> : ''}
      <div className="contentDashboard">
        <h1 className="titlePageDashboard">Carreras</h1>
        <Breadcrumb className="bradcrumpPadding">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Carreras</Breadcrumb.Item>
        </Breadcrumb>
        <Card type="inner" title="Crear carrera">
          <Form layout="vertical" form={formCarreras} onFinish={guardarCarrera}>
            <div className="vacantesPageContainerFormCrearVacante">
              <Form.Item label="Facultad" name="FACULTAD">
                <Select
                  showSearch
                  placeholder="Selecciona un proceso"
                  options={selectFacultad}
                  // onChange={"verificarEstadoProceso"}
                />
              </Form.Item>
              <Form.Item label="Carrera" name="ESCUELA">
                <Input placeholder="Nombre de la carrera?" />
              </Form.Item>
              <Form.Item label="Codigo" name="CODIGO_ESCUELA">
                <InputNumber
                  min={1}
                  maxLength="10"
                  style={{ width: '100%' }}
                  placeholder="Cual es el codigo de carrera?"
                />
              </Form.Item>
              <Form.Item label="Area" name="AREA">
                <InputNumber
                  min={1}
                  max={8}
                  style={{ width: '100%' }}
                  placeholder="A que aria pertenece?"
                />
              </Form.Item>
              <Form.Item label="Sede" name="SEDE_FACULTAD">
                <Input placeholder="Cual sera la sede?" />
              </Form.Item>
              <Form.Item>{/* <Input  /> */}</Form.Item>

              <Form.Item className="filaBotones">
                <Popconfirm
                  title="Proceso"
                  description="Estas seguro de guardar el proceso?"
                  onConfirm={() => formCarreras.submit()}
                  onCancel={''}
                  okText="Si"
                  cancelText="No"
                >
                  <Button type="primary" icon={<SaveFilled />}>
                    Guardar Cambios
                  </Button>
                </Popconfirm>
                <Button
                  icon={<SearchOutlined />}
                  onClick={buscarCarreraPorFacultad}
                >
                  Buscar
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Card>
        <Card type="inner" title="Lista de Vacantes">
          <Table dataSource={dataTable} columns={columnsTable} size="small" />
        </Card>

        <Drawer
          title="Modificar carrera"
          placement="right"
          onClose={hiddenPanelEditCarrera}
          open={panelEditarCarrera}
        >
          <Form
            layout="vertical"
            form={formModificarCarreras}
            onFinish={modificarCarrera}
          >
            <Form.Item label="Facultad" name="FACULTAD">
              <Select
                showSearch
                placeholder="Selecciona un proceso"
                options={selectFacultad}
                // onChange={"verificarEstadoProceso"}
                rules={[{ required: true, message: 'El estado es requerido' }]}
              />
            </Form.Item>
            <Form.Item label="Carrera" name="ESCUELA">
              <Input
                rules={[{ required: true, message: 'El estado es requerido' }]}
              />
            </Form.Item>

            <Form.Item label="Codigo" name="CODIGO_ESCUELA">
              <Input
                rules={[{ required: true, message: 'El estado es requerido' }]}
              />
            </Form.Item>
            <Form.Item label="Area" name="AREA">
              <Input
                rules={[{ required: true, message: 'El estado es requerido' }]}
              />
            </Form.Item>
            <Form.Item label="Sede" name="SEDE_FACULTAD">
              <Input
                rules={[{ required: true, message: 'El estado es requerido' }]}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block htmlType="submit">
                Guardar cambios
              </Button>
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

export default CarreraPage;
