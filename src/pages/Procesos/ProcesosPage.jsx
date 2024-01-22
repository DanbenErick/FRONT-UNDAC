import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Modal, Select, Table, Tooltip } from 'antd';
import { Tag, Popconfirm, Card, Form, Input, Radio, DatePicker } from 'antd';
import SpinnerCompoent from '../../components/Spinner';
import {
  crearProceso,
  cerrarProceso,
} from '../../api/apiProcesos';
import '../../assets/styles/DashboardAdmin.css';
import moment from 'moment';
import { getInscritosPorProcesoService, getProcesosService } from '../../services/ProcesosService';
import { message } from 'antd/es';
import { CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';

export default function ProcesosPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState([]);
  const [statusModal, setStatusModal] = useState(false);
  const [dataInscritos, setDataInscritos] = useState([]);
  const initialValues = {
    NOMBRE: '',
    FECHA_REGISTRO: '',
    ESTADO: '1',
    USUARIO_REGISTRO: 1,
  };
  const [formProceso] = Form.useForm();
  const refreshTableProcesos = async () => {
    setLoading(true);
    const respProcesosTablet = await getProcesosService();
    setDataTable(respProcesosTablet.data);
    setLoading(false);
  };
  useEffect(() => {
    const start = async () => {
      await refreshTableProcesos();
    };
    start();
  }, []);

  const obtenerInscritosPorProceso = async (params) => {
    setStatusModal(true)
    const resp = await getInscritosPorProcesoService(params)
    console.log(resp)
    setDataInscritos(resp.data)
  }
  const columnsInscritos = [
    {
      title: 'Sede',
      dataIndex: 'SEDE',
      key: 'SEDE',
    },
    {
      title: 'Total de inscritos',
      dataIndex: 'CANTIDAD',
      key: 'CANTIDAD',
    },
  ]
  const columns = [
    {
      title: 'Titulo',
      dataIndex: 'NOMBRE',
      key: 'NOMBRE',
    },
    {
      title: 'Fecha Registro',
      dataIndex: 'FECHA_REGISTRO',
      key: 'FECHA_REGISTRO',
      render: (fecha) =>
        new Date(fecha)
          .toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
          .replace(/\//g, '/'),
    },
    {
      title: 'Inscritos',
      dataIndex: 'TOTAL_INSCRITOS',
      key: 'TOTAL_INSCRITOS'
    },
    {
      title: 'Estado',
      dataIndex: 'ESTADO',
      key: 'ESTADO',
      render: (text) => {
        return text === 0 ? (
          <Tag color="success">Cerrado</Tag>
        ) : (
          <Tag color="processing">Abierto</Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',

      render: (_, column) => {
        if (column.ESTADO === 1) {
          return (
            <>
            <Popconfirm
              title="Proceso"
              description="Quieres borrar este proceso?"
              onConfirm={() => handleCerrarProceso({ ID: column.ID })}
              onCancel={() => ''}
              okText="Si"
              cancelText="No"
            >
              <Button type="link" danger icon={<CloseCircleOutlined />}></Button>
            </Popconfirm>
            <Tooltip title="Ver inscritos por sede">
              <Button onClick={() => obtenerInscritosPorProceso({ID_PROCESO: column.ID})} type="link" sucess icon={<EyeOutlined />}></Button>
            </Tooltip>
            </>
          );
        }
        return '';
      },
    },
  ];
  const handleCerrarProceso = async (params) => {
    setLoading(true);
    const resp = await cerrarProceso(params);
    if (resp.data.ok) sucessMessage(resp.data.message);
    else errorMessage(resp.data.message);
    await refreshTableProcesos();
    setLoading(false);
  };
  const handleSubmit = async (values) => {
    setLoading(true);
    values.FECHA_REGISTRO = moment(values.FECHA_REGISTRO).format('YYYY/MM/DD');
    const resp = await crearProceso(values);
    if (resp.data.procesoAbiertoExistente) warnignMessage(resp.data.message);
    else if (resp.data.ok) sucessMessage(resp.data.message);
    else errorMessage(resp.data.message);
    await refreshTableProcesos();
    setLoading(false);
    formProceso.resetFields();
  };
  const errorMessage = (message) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };
  const sucessMessage = (message) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };
  const warnignMessage = (message) => {
    messageApi.open({
      type: 'warning',
      content: message,
    });
  };
  return (
    <div>
      {contextHolder}
      {loading ? <SpinnerCompoent /> : ''}
      <div className="contentDashboard">
        <h1 className="titlePageDashboard">Procesos</h1>
        <Breadcrumb className="bradcrumpPadding">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Procesos</Breadcrumb.Item>
        </Breadcrumb>
        <Card type="inner" title="Crear proceso">
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            form={formProceso}
            initialValues={initialValues}
          >
            <div className="formProcesosDashAdmin">
              <Form.Item
                label="Nombre del proceso"
                name="NOMBRE"
                rules={[{ required: true, message: 'El nombre es requerido' }]}
              >
                <Input
                  className="fullSizeInput"
                  placeholder="Ingrese el nombre del proceso"
                />
              </Form.Item>
              <Form.Item
                label="Fecha de inicio"
                name="FECHA_REGISTRO"
                rules={[{ required: true, message: 'La fecha es requerida' }]}
              >
                <DatePicker
                  placeholder="Fecha que comienza el proceso"
                  className="fullSizeInput"
                  format="YYYY/MM/DD"
                />
              </Form.Item>

              <Form.Item
                label="Tipo de Proceso"
                name="TIPO_PROCESO"
                rules={[{ required: true, message: 'El estado es requerido' }]}
              >
                <Select
                  options={[
                    {label: 'CEPRE', value: 'C'},
                    {label: 'ORDINARIO', value: 'O'},
                    {label: 'MODALIDADES', value: 'M'},
                    {label: 'PRIMARA SELECCION', value: 'P'},
                  ]}
                />
                  
              </Form.Item>

              <Form.Item
                label="Estado del proceso"
                name="ESTADO"
                rules={[{ required: true, message: 'El estado es requerido' }]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="1">Abierto</Radio.Button>
                  <Radio.Button value="0">Cerrado</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </div>
            <div className="botonFormProcesosAdminDash">
              <Form.Item>
                <Popconfirm
                  title="Proceso"
                  description="Estas seguro de guardar el proceso?"
                  onConfirm={() => formProceso.submit()}
                  onCancel={() => alert('Borrando')}
                  okText="Si"
                  cancelText="No"
                >
                  <Button type="primary">Guardar Cambios</Button>
                </Popconfirm>
              </Form.Item>
            </div>
          </Form>
        </Card>
        <Card type="inner" title="Lista de procesos">
          <Table dataSource={dataTable} columns={columns} size="small" />
        </Card>
      </div>
      <Modal title="Informacion adicional" open={statusModal} onOk={() => setStatusModal(false)} onCancel={() => setStatusModal(false)}>
        <Table dataSource={dataInscritos} columns={columnsInscritos} size='large' />
      </Modal>
    </div>
  );
}
