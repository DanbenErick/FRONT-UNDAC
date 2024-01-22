import React, { useEffect, useState } from 'react';
import SpinnerComponent from '../../components/Spinner';
import { Breadcrumb, Button, Table, message } from 'antd';
import { Card } from 'antd';
import { Form } from 'antd';
import { Popconfirm } from 'antd';
import { SaveFilled, SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { obtenerProcesosForm } from '../../api/apiInpputs';
import { Select } from 'antd';
import { DatePicker } from 'antd';
import {
  buscarEstudianteVoucherService,
  buscarVoucherService,
  comprobarComprobantePagoService,
  crearVoucherService,
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
  const columnsTable = [
    {
      title: 'Proceso',
      dataIndex: 'ID_PROCESO',
      key: 'ID_PROCESO',
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
      render: (data) => formatDateUtil(data) 
    },
    {
      title: 'Monto',
      dataIndex: 'MONTO',
      key: 'MONTO',
    },
  ];
  const obtenerInputs = async () => {
    const resp = await obtenerProcesosForm();
    setInputProcesos(resp.data);
  };
  const refreshTable = async () => {
    const resp = await obtenerVouchersService();
    setDataTable(resp.data);
  };
  const guardarCarrera = async (params) => {
    params.ESTADO = 1;
    delete params.age
    delete params.caj
    params.FECHA_PAGO = moment(params.FECHA_PAGO).format('YYYY/MM/DD');
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
      payment_date: formatDateUtil(params.FECHA_PAGO)
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
        <Card type="inner" title="Crear carrera">
          <Form layout="vertical" form={formVoucher} onFinish={guardarCarrera}>
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
                label="Fecha"
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
                label="Age"
                name="age"
                rules={[{ required: true }]}
              >
                <Input maxLength={4} />
              </Form.Item>
              <Form.Item
                label="Caja"
                name="caj"
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
                <Button type="primary" disabled={stateDisabledGuardar} icon={<SaveFilled />}>
                  Guardar Cambios
                </Button>
              </Popconfirm>
              <Button  icon={<SearchOutlined />} onClick={comprobarVoucher}>
                Comprobar
              </Button>
              <Button icon={<SearchOutlined />} onClick={buscarVoucher}>
                Buscar
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card type="inner" title="Lista de Vouchers">
          <Table dataSource={dataTable} columns={columnsTable} size="small" />
        </Card>

        {/* <Drawer title="Modificar carrera" placement="right" onClose={hiddenPanelEditCarrera} open={panelEditarCarrera}>
                    <Form layout='vertical' form={formModificarCarreras} onFinish={modificarCarrera}>
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
                            <Input rules={[{ required: true, message: 'El estado es requerido' }]}/>
                        </Form.Item>
                        
                        <Form.Item label="Codigo" name="CODIGO_ESCUELA">
                            <Input rules={[{ required: true, message: 'El estado es requerido' }]}/>
                        </Form.Item>
                        <Form.Item label="Area" name="AREA">
                            <Input rules={[{ required: true, message: 'El estado es requerido' }]}/>
                        </Form.Item>
                        <Form.Item label="Sede" name="SEDE_FACULTAD">
                            <Input rules={[{ required: true, message: 'El estado es requerido' }]}/>
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" block htmlType='submit'>Guardar cambios</Button>
                        </Form.Item>
                        <Form.Item name="ID">
                            <Input type='hidden'/>
                        </Form.Item>
                    </Form>
                </Drawer> */}
      </div>
    </div>
  );
};

export default VoucherPage;
