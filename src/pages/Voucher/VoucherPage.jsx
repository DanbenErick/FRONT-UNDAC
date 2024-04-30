import React, { useEffect, useState } from 'react';
import SpinnerComponent from '../../components/Spinner';
import { Breadcrumb, Button, Drawer, Table, message } from 'antd';
import { Card } from 'antd';
import { Form } from 'antd';
import { Popconfirm } from 'antd';
import { FormOutlined, ReloadOutlined, SaveFilled, SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { obtenerProcesosForm } from '../../api/apiInpputs';
import { Select } from 'antd';
import { DatePicker } from 'antd';
import {
  buscarEstudianteVoucherService,
  buscarVoucherService,
  comprobarComprobantePagoService,
  crearVoucherService,
  modificarPagoService,
  obtenerVouchersService,
} from '../../api/voucherService';
import moment from 'moment';
import { formatDateUtil } from '../../util/Util';

const VoucherPage = () => {
  const [formVoucher] = Form.useForm();
  const [loading, setLoading] = useState();
  const [inputProcesos, setInputProcesos] = useState();
  const [stateDisabledGuardar, setStateDisabledGuardar] = useState(true);
  const [dataTable, setDataTable] = useState();
  const [statePanelVoucher, setStatePanelVoucher] = useState(false)
  const [formPanelVoucher] = Form.useForm()
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
    },
    {
      title: 'Nombre completo',
      dataIndex: 'NOMBRE_COMPLETO',
      key: 'NOMBRE_COMPLETO',
    },
    {
      title: 'Codigo',
      dataIndex: 'CODIGO',
      key: 'CODIGO',
    },
    {
      title: 'Fecha',
      dataIndex: 'FECHA_PAGO',
      key: 'FECHA_PAGO',
      render: (data) => moment(data).format('YYYY-MM-DD') 
    },
    {
      title: 'Monto',
      dataIndex: 'MONTO',
      key: 'MONTO',
    },
    {
      title: 'Action',
      key: 'action',

      render: (_, column) => {
        // if (column.ESTADO === 1) {
        return (
          <Button type="link" info icon={<FormOutlined />} onClick={() => { showPanelEditarVoucher(column) }}></Button>
        );

        // }
        // return ""
      },
    },
  ];
  const showPanelEditarVoucher = async (params) => {
    params.FECHA_PAGO = moment(params.FECHA_PAGO).format('YYYY-MM-DD');
    delete params.FECHA_PAGO;
    setStatePanelVoucher(true)
    formPanelVoucher.setFieldsValue(params)
  }
  const modificarPago = async(params) => {
    const resp = await modificarPagoService(params);
    console.log(resp)
    if (!resp.data) {
      message.error('Ocurrio un error');
      return;
    }
  }
  const obtenerInputs = async () => {
    const resp = await obtenerProcesosForm();
    setInputProcesos(resp.data);
  };
  const refreshTable = async () => {
    const resp = await obtenerVouchersService();
    setDataTable(resp.data);
  };
  const guardarPago = async (params) => {
    
    console.log(params)
    params.ESTADO = 1;
    // // delete params.age
    // // delete params.caj
    delete params.NOMBRE_COMPLETO
    const fechaFormateada = new Date(params.FECHA_PAGO);
    const fechaFormateadaString = fechaFormateada.toISOString().substring(0, 10); // Obtener la fecha en formato YYYY-MM-DD
    params.FECHA_PAGO = fechaFormateadaString;

    
    params.FECHA_PAGO = moment(params.FECHA_PAGO).format('YYYY-MM-DD');
    const resp = await crearVoucherService(params);
    if (!resp.data) {
      message.error('Ocurrio un error');
      return;
    }
    if (resp.data.ok) {
      message.success(resp.data.message);
      refreshTable();
      return;
    }
    message.error(resp.data.message);
  };

  const buscarVoucher = async () => {
    const params = formVoucher.getFieldValue();
    const resp = await buscarVoucherService(params);
    setDataTable(resp.data);
  };
  const buscarEstudiante = async () => {
    const params = formVoucher.getFieldValue('DNI');
    if (params.length === 8) {
      const { DNI } = formVoucher.getFieldValue();
      const resp = await buscarEstudianteVoucherService({ DNI });

      if (resp.data.length !== 0) {
        formVoucher.setFieldValue(
          'NOMBRE_COMPLETO',
          resp.data[0].NOMBRE_COMPLETO,
        );
        message.success('Se encontro estudiante');
        return;
      }
      message.error('No se encontro estudian');
    }
  };
  const comprobarVoucher = async() => {
    const params = formVoucher.getFieldsValue()
    const data = {
      age: params.age,
      caj: params.caj,
      secuencia: params.CODIGO,
      payment_date: moment(params.FECHA_PAGO).format('YYYY-MM-DD')
    }
    const resp = await comprobarComprobantePagoService(data)
    if(resp.data.state) {
      message.success(resp.data.msg)
      if(resp.data.data.n_docum.substring(resp.data.data.n_docum.length - 8) === params.DNI) {
        message.success('DNI concuerdan')
        formVoucher.setFieldValue('MONTO', resp.data.data.monto_pagado)
        setStateDisabledGuardar(false)
      }else { message.error('Los dni no concuerdan') }
    }
    
  }
  useEffect(() => {
    setLoading(true)
    obtenerInputs();
    refreshTable();
    setLoading(false)
  }, []);
  return (
    <div>
      {loading ? <SpinnerComponent /> : ''}
      <div className="contentDashboard">
        <h1 className="titlePageDashboard">Voucher</h1>
        <Breadcrumb className="bradcrumpPadding">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Voucher</Breadcrumb.Item>
        </Breadcrumb>
        <Card type="inner" title="Crear voucher">
          <Form layout="vertical" form={formVoucher} onFinish={guardarPago}>
            <div className="vacantesPageContainerFormCrearVacante">
              <Form.Item label="Proceso" name="ID_PROCESO">
                <Select
                  showSearch
                  placeholder="Selecciona un proceso"
                  options={inputProcesos}
                />
              </Form.Item>
              <Form.Item label="DNI" name="DNI" rules={[{ required: true }]}>
                <Input
                  placeholder="Ingresa el codigo del voucher"
                  onChange={buscarEstudiante}
                  maxLength={8}
                />
              </Form.Item>
              <Form.Item
                label="Codigo"
                name="CODIGO"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Ingresa el codigo del voucher"
                  maxLength={7}
                />
              </Form.Item>
              <Form.Item
                label="Fecha de Pago"
                name="FECHA_PAGO"
                rules={[{ required: true }]}
              >
                <DatePicker
                  placeholder="Fecha del voucher"
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                label="Monto"
                name="MONTO"
                rules={[{ required: true }]}
              >
                <Input placeholder="Ingresa la monto" />
              </Form.Item>
              <Form.Item
                label="Nombre completo"
                name="NOMBRE_COMPLETO"
                rules={[{ required: false }]}
              >
                <Input disabled={true} />
              </Form.Item>
              <Form.Item
                label="Caja"
                name="caj"
                rules={[{ required: true }]}
              >
                <Input maxLength={4} />
              </Form.Item>
              <Form.Item
                label="Age"
                name="age"
                rules={[{ required: true }]}
              >
                <Input maxLength={4} />
              </Form.Item>
            </div>
            <Form.Item className="filaBotones">
              <Popconfirm
                title="Proceso"
                description="Estas seguro de guardar el proceso?"
                onConfirm={() => formVoucher.submit()}
                onCancel={''}
                okText="Si"
                cancelText="No"
              >
                {/* <Button type="primary" disabled={stateDisabledGuardar} icon={<SaveFilled />}>
                  Guardar Pago
                </Button> */}
                <Button type="primary"  icon={<SaveFilled />}>
                  Guardar Pago
                </Button>
              </Popconfirm>
              <Button  icon={<ReloadOutlined />} onClick={comprobarVoucher} type="primary" style={{ background: '#3C887E' }}>
                Comprobar
              </Button>
              <Button icon={<SearchOutlined />} onClick={buscarVoucher} type="primary" style={{ background: '#031927' }}>
                Buscar
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card type="inner" title="Lista de Vouchers">
          <Table dataSource={dataTable} columns={columnsTable} size="small" />
        </Card>

        <Drawer 
        extra={
          
            
            <Button type="primary" onClick={() => {formPanelVoucher.submit()}}>Guardar</Button>
          
        }
        title="Modificar carrera" placement="right" onClose={() => { setStatePanelVoucher(false) }} open={statePanelVoucher}>
            <Form layout='vertical' form={formPanelVoucher} onFinish={modificarPago}>
                <Form.Item label="Identificador" name="ID" rules={[{ required: true }]}>
                <Input
                    placeholder="Ingresa el codigo del voucher"
                    maxLength={7}
                    disabled={true}
                  />
                </Form.Item>
                <Form.Item label="Proceso" name="ID_PROCESO" rules={[{ required: true }]}>
                  <Select
                    showSearch
                    placeholder="Selecciona un proceso"
                    options={inputProcesos}
                  />
                </Form.Item>
                <Form.Item label="DNI" name="DNI" rules={[{ required: true }]}>
                <Input
                  placeholder="Ingresa el codigo del voucher"
                  onChange={buscarEstudiante}
                  maxLength={8}
                  />
                </Form.Item>
                <Form.Item
                  label="Codigo"
                  name="CODIGO"
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="Ingresa el codigo del voucher"
                    maxLength={7}
                  />
                </Form.Item>
                {/* <Form.Item
                  label="Fecha de Pago"
                  name="FECHA_PAGO"
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    placeholder="Fecha del voucher"
                    style={{ width: '100%' }}
                  />
                </Form.Item> */}
                <Form.Item
                  label="Monto"
                  name="MONTO"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Ingresa la monto" />
                </Form.Item>
                <Form.Item
                  label="Caja"
                  name="CAJ"
                  rules={[{ required: true }]}
                >
                  <Input maxLength={4} />
                </Form.Item>
                <Form.Item
                  label="Age"
                  name="AGE "
                  rules={[{ required: true }]}
                >
                  <Input maxLength={4} />
                </Form.Item>
                
            </Form>
        </Drawer>
      </div>
    </div>
  );
};

export default VoucherPage;
