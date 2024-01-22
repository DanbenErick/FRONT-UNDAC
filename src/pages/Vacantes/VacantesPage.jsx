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

const onSearch = (value) => {
  console.log('search:', value);
};

const filterOption = (input, option) => {
  return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
};

const cancel = (e) => {
  message.error('Proceso cancelado');
};

const VacantesPage = () => {
  const [formVacante] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [inputProcesos, setInputProcesos] = useState([]);
  const [inputCarrera, setInputCarrera] = useState([]);
  const [botonDisabled, setBotonDisabled] = useState(true);
  const [dataTable, setDataTable] = useState([]);
  const [selectModalidades, setSelectModalidades] = useState([]);
  const initialValues = {
    ID_PROCESO: '',
    ID_CARRERA: '',
    CANTIDAD: '',
  };
  const refreshDataVacatesProcesoActivo = async () => {
    setLoading(true);
    try {
      const resp = await obtenerVacantesProcesoActivo();
      setDataTable(resp.data);
    } catch (error) {
      console.error('Error ', error);
    }
    setLoading(false);
  };
  const getProcesosInputs = async () => {
    try {
      const resp = await obtenerProcesosForm();

      setInputProcesos(resp.data);
    } catch (error) {
      console.error('Error ', error);
    }
  };

  const refreshCarrerasInput = async () => {
    try {
      const resp = await obtenerCarrerasPorProcesoInput();

      setInputCarrera(resp.data);
    } catch (error) {
      console.error('Error', error);
    }
  };
  const getModalidades = async()  => {
    try {
      const resp = await obtenerModalidadesForm()
      setSelectModalidades(resp.data);
    }catch(error) {
      console.error('Error', error);
    }
  }
  useEffect(() => {
    getProcesosInputs();
    refreshCarrerasInput();
    refreshDataVacatesProcesoActivo();
    getModalidades();
    // setTimeout(() => {
    //     setLoading(false)
    // }, 1000)
    setLoading(false);
  }, []);
  const columnsTable = [
    {
      title: 'Proceso',
      dataIndex: 'NOMBRE_PROCESO',
      key: 'NOMBRE_PROCESO',
    },
    {
      title: 'Escuela',
      dataIndex: 'NOMBRE_ESCUELA',
      key: 'NOMBRE_ESCUELA',
    },
    {
      title: 'Modalidad',
      dataIndex: 'NOMBRE_MODALIDAD',
      key: 'NOMBRE_MODALIDAD',
    },
    {
      title: 'Cantidad',
      dataIndex: 'CANTIDAD',
      key: 'CANTIDAD',
    },
  ];
  const verificarEstadoProceso = async (data) => {
    const resp = await verificarDisponibilidadProceso(data);

    if (!resp.data.ok) {
      messageModal('warning', resp.data.message);
      setBotonDisabled(true);
    } else {
      setBotonDisabled(false);
    }
  };
  const guardarDatos = async (values) => {
    setLoading(true);
    
    

    const resp = await crearVacante(values);

    await refreshDataVacatesProcesoActivo();
    await refreshCarrerasInput();
    // formVacante.resetFields();
    if (resp.data.ok) messageModal('success', resp.data.message);
    else messageModal('error', resp.data.message);
    setLoading(false);
    // const resp = await crear
  };
  const buscarVacantesPorProceso = async () => {
    setLoading(true);
    const ID_PROCESO = formVacante.getFieldValue('ID_PROCESO');
    const resp = await obtenerVacantesPorId(ID_PROCESO);
    setDataTable(resp.data);
    setLoading(false);
  };
  const messageModal = (type, content) => {
    messageApi.open({ type, content });
  };
  return (
    <div>
      {contextHolder}
      {loading ? <SpinnerComponent /> : ''}
      <div className="contentDashboard">
        <h1 className="titlePageDashboard">Vacantes</h1>
        <Breadcrumb className="bradcrumpPadding">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Vacantes</Breadcrumb.Item>
        </Breadcrumb>
        <Card type="inner" title="Crear vacantes">
          <Form
            layout="vertical"
            form={formVacante}
            initialValues={initialValues}
            onFinish={guardarDatos}
          >
            <div className="vacantesPageContainerFormCrearVacante">
              <Form.Item label="Proceso" name="ID_PROCESO">
                <Select
                  showSearch
                  placeholder="Selecciona un proceso"
                  options={inputProcesos}
                  onChange={verificarEstadoProceso}
                  onSearch={onSearch}
                  filterOption={filterOption}
                />
              </Form.Item>
              <Form.Item label="Modalidad" name="ID_MODALIDAD">
                <Select
                  showSearch
                  placeholder="Selecciona una carrera"
                  optionFilterProp="children"
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={selectModalidades}
                />
              </Form.Item>
              <Form.Item label="Carrera" name="ID_CARRERA">
                <Select
                  showSearch
                  placeholder="Selecciona una carrera"
                  optionFilterProp="children"
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={inputCarrera}
                />
              </Form.Item>
              <Form.Item label="Cantidad de vacantes" name="CANTIDAD">
                <InputNumber
                  min={1}
                  max={20}
                  style={{ width: '100%' }}
                  placeholder="Cuantas vacantes habra?"
                />
              </Form.Item>

              <Form.Item className="filaBotones">
                <Popconfirm
                  title="Proceso"
                  description="Estas seguro de guardar el proceso?"
                  onConfirm={() => formVacante.submit()}
                  onCancel={cancel}
                  okText="Si"
                  cancelText="No"
                >
                  <Button
                    type="primary"
                    disabled={botonDisabled}
                    icon={<SaveFilled />}
                  >
                    Guardar Cambios
                  </Button>
                </Popconfirm>
                <Button
                  icon={<SearchOutlined />}
                  onClick={buscarVacantesPorProceso}
                >
                  Buscar
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Card>
        <Card type="inner" title="Lista de vacantes">
          <Table dataSource={dataTable} columns={columnsTable} size="small" />
        </Card>
      </div>
    </div>
  );
};

export default VacantesPage;
