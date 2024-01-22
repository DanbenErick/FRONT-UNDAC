import React, { useEffect, useState } from 'react';
import SpinnerComponent from '../../components/Spinner';
import { Breadcrumb, Button, DatePicker, Space, Table } from 'antd';
import { Card } from 'antd';
import { Form } from 'antd';
import { Input } from 'antd';
import {formatOnlyYear} from '../../util/Util'
import { EditFilled, SaveFilled, SearchOutlined } from '@ant-design/icons';
import {
  buscarInscritoService,
  guardarInscripcionService,
  modificarInscritoService,
  obtenerInscritosService,
} from '../../api/inscritosService';
import {
  buscarAulaPorTurnoForm,
  obtenerCarrerasCodigoForm,
  obtenerCarrerasForm,
  obtenerModalidadesForm, 
  obtenerProcesosForm,
  obtenerTodosLosProcesosActivosForm,
} from '../../api/apiInpputs';
import { Select } from 'antd';
import { message } from 'antd';
import moment from 'moment';
import { Popconfirm } from 'antd';
import { Drawer } from 'antd';

const InscritoPage = () => {
  
  const [loading, setLoading] = useState();
  const [dataTable, setDataTable] = useState();
  const [formInscritos] = Form.useForm();
  const [selectCarreras, setSelectCarreras] = useState();
  const [selectCarrerasCodigo, setSelectCarrerasCodigo] = useState();
  const [selectProcesos, setSelectProcesos] = useState();
  const [selectProcesosActivos, setSelectProcesosActivos] = useState([]); //
  const [panelEditarInscritos, setPanelEditarInscritos] = useState(false);
  const [panelInscribir, setPanelInscribir] = useState(false)

  const [statusOrdinario, setStatusOrdinario] = useState(false)
  const [statusModalidades, setStatusModalidades] = useState(false)
  const [statusCepre, setStatusCepre] = useState(false)
  const [statusPrimeraSeleccion, setStatusPrimeraSeleccion] = useState(false)
  
  const [selectModalidades, setSelectModalidades] = useState([])
  const [selectAulas, setSelectAulas] = useState([])
  const [formModificarInscritos] = Form.useForm();
  const [formInscribirEstudiante] = Form.useForm();

  const columnsTable = [
    {
      title: 'Proceso',
      dataIndex: 'NOMBRE_PROCESO',
      key: '1',
    },
    {
      title: 'DNI',
      dataIndex: 'DNI',
      key: '2',
    },
    {
      title: 'Carrera',
      dataIndex: 'ESCUELA_COMPLETA',
      key: '3',
    },
    {
      title: 'Sede',
      dataIndex: 'SEDE_EXAM',
      key: '4',
    },
    {
      title: 'Prepa',
      dataIndex: 'PREPARATORIA',
      key: '5',
      render: (data, column) => {
        return data === 1 ? 'Si' : 'No';
      },
    },
    {
      title: 'Año term',
      dataIndex: 'YEAR_CONCLU',
      key: '6',
    },
    {
      title: 'Fecha Reg',
      dataIndex: 'FECHA_REGISTRO',
      key: '7',
      render: (data) => moment(data).format('YYYY/MM/DD'),
    },
    {
      title: 'Action',
      key: '8',
      render: (_, column) => {
        return (
          <Popconfirm
            title="Carerra"
            description="Quieres editar este carrera?"
            onConfirm={() => showPanelEditInscritos({ ID: column.ID })}
            onCancel={() => ''}
            okText="Si"
            cancelText="No"
          >
            <Button type="link" info icon={<EditFilled />}></Button>
          </Popconfirm>
        );
      },
    },
  ];
  const hiddenPanelEditInscritos = () => setPanelEditarInscritos(false);
  const showPanelEditInscritos = (params) => {
    const data = dataTable.find((inscrito) => inscrito.ID === params.ID);
    formModificarInscritos.setFieldsValue(data);
    setPanelEditarInscritos(true);
  };
  const getDataInputs = async () => {
    const resp_carreras = await obtenerCarrerasForm();
    const resp_procesos = await obtenerProcesosForm();
    const resp_carreras_codigo = await obtenerCarrerasCodigoForm();
    const resp_modalidades = await obtenerModalidadesForm()
    setSelectCarreras(resp_carreras.data);
    setSelectCarrerasCodigo(resp_carreras_codigo.data);
    setSelectProcesos(resp_procesos.data);
    setSelectModalidades(resp_modalidades.data);
  };
  const refreshTable = async () => {
    const resp = await obtenerInscritosService();
    setDataTable(resp.data);
  };
  const modificarInscrito = async (params) => {
    const resp = await modificarInscritoService(params);
    if (resp.data.ok) {
      message.success(resp.data.message);
      refreshTable();
      hiddenPanelEditInscritos();
      return;
    }
    message.error(resp.data.message);
  };
  const buscarInscrito = async () => {
    const params = formInscritos.getFieldValue();
    params.DNI = params.DNI || '';
    params.COD_CARRERA = params.COD_CARRERA || '';
    params.SEDE_EXAM = params.SEDE_EXAM || '';
    const resp = await buscarInscritoService(params);
    if (resp.status === 200) {
      message.success('Datos encontrados');
      setDataTable(resp.data);
      return;
    }
    message.error('Ocurrio un error');
  };
  const inscribirEstudiante = async() => {
    
  }
  const onClosePanelInscrito = async() => {
    setPanelInscribir(false);
  }
  const onShowPanelInscritos = async() => {
    setLoading(true)
    const respProcesosActivos = await obtenerTodosLosProcesosActivosForm()
    console.log(respProcesosActivos)
    setSelectProcesosActivos(respProcesosActivos.data)
    setPanelInscribir(true);
    setLoading(false)
  }
  const guardarInscripcion = async(params) => {
    setLoading(true)
    params.YEAR_CONCLU = formatOnlyYear(params.YEAR_CONCLU)
    const resp = await guardarInscripcionService(params)
    if(resp.status === 200 && resp.data && resp.data.ok)  {
      message.success(resp.data.message)
      refreshTable()
      setPanelInscribir(false)
      setLoading(false)
      return
    }else message.error(resp.data.message)
    console.log(resp)
    setLoading(false)
  }
  
  

  
  const changeProcesos = async(value) => {
    selectProcesosActivos.forEach(proceso => {
      
      if (proceso.value === value) {
        setStatusCepre(false)
        setStatusPrimeraSeleccion(false)
        setStatusOrdinario(false)
        setStatusModalidades(false)
        if(proceso.TIPO_PROCESO === 'C') {
          setStatusCepre(true)
          
        }
        if(proceso.TIPO_PROCESO === 'O'){
          setStatusOrdinario(true)
        } 
        if(proceso.TIPO_PROCESO === 'P'){
          setStatusPrimeraSeleccion(true)
        } 
        if(proceso.TIPO_PROCESO === 'M'){
          setStatusModalidades(true)
          

        } 
      }
    })
  }
  const changeTurno = async(value) => {
    const resp = await buscarAulaPorTurnoForm({TURNO: value})
    setSelectAulas(resp.data)
  }
  useEffect(() => {
    setLoading(true)
    refreshTable();
    getDataInputs();
    setLoading(false)
  }, []);
  return (
    <div>
      {loading ? <SpinnerComponent /> : ''}
      <div className="contentDashboard">
        <h1 className="titlePageDashboard">Inscritos</h1>
        <Breadcrumb className="bradcrumpPadding">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Inscritos</Breadcrumb.Item>
        </Breadcrumb>
        <Card type="inner" title="Crear estudiantes">
          <Form layout="vertical" form={formInscritos}>
            <div className="vacantesPageContainerFormCrearVacante">
              <Form.Item label="Proceso" name="PROCESO">
                <Select
                  showSearch
                  placeholder="Selecciona una proceso"
                  options={selectProcesos}
                />
              </Form.Item>
              <Form.Item label="Carrera" name="COD_CARRERA">
                <Select
                  showSearch
                  placeholder="Selecciona una carrera"
                  options={selectCarrerasCodigo}
                />
              </Form.Item>
              <Form.Item label="DNI" name="DNI">
                <Input maxLength={8} />
              </Form.Item>
              <Form.Item label="Sede" name="SEDE_EXAM">
                <Input maxLength={20} />
              </Form.Item>
            </div>
            <Form.Item className="filaBotones">
              <Button type="primary" icon={<SaveFilled />}>
                Guardar Cambios
              </Button>
              <Button icon={<SearchOutlined />} onClick={buscarInscrito}>Buscar</Button>
              <Button icon={<SaveFilled />} onClick={onShowPanelInscritos}>Inscribir</Button>
            </Form.Item>
          </Form>
        </Card>
        <Card type="inner" title="Lista de estudiantes">
          <Table dataSource={dataTable} columns={columnsTable} size="small" />
        </Card>

        <Drawer
          title="Modificar carrera"
          placement="right"
          onClose={hiddenPanelEditInscritos}
          open={panelEditarInscritos}
        >
          <Form
            layout="vertical"
            form={formModificarInscritos}
            onFinish={modificarInscrito}
          >
            <Form.Item label="Carrera" name="COD_CARRERA">
              <Select
                showSearch
                placeholder="Selecciona una carrera"
                options={selectCarrerasCodigo}
              />
            </Form.Item>
            <Form.Item label="Sede" name="SEDE_EXAM">
              <Input />
            </Form.Item>
            <Form.Item label="Preparatoria" name="PREPARATORIA">
              <Input />
            </Form.Item>
            <Form.Item label="Termino secundaria" name="YEAR_CONCLU">
              <Input placeholder="Ingresa el año" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Guardar</Button>
            </Form.Item>
            <Form.Item name="ID">
              <Input type="hidden" />
            </Form.Item>
          </Form>
        </Drawer>

        <Drawer
        title='Inscribir estudiante'
        placement="right"
        size={'large'}
        onClose={onClosePanelInscrito}
        open={panelInscribir}
        extra={
          <Space>
            <Button incon type="primary" onClick={formInscribirEstudiante.submit}>
              Inscribir
            </Button>
          </Space>
        }
      >
        <Form layout='vertical' form={formInscribirEstudiante} className="formProcesosDashAdmin" onFinish={guardarInscripcion}>
          <Form.Item label="Proceso" rules={[{ required: true }]} name="PROCESO">
            <Select
              showSearch
              placeholder="Selecciona una proceso"
              options={selectProcesosActivos}
              onChange={changeProcesos}
            />
          </Form.Item>
          <Form.Item label="DNI" name="DNI" rules={[{ required: true }]}>
            <Input maxLength={8} />
          </Form.Item>
          <Form.Item label="Carrera" name="COD_CARRERA">
            <Select
              showSearch
              placeholder="Selecciona una carrera"
              options={selectCarrerasCodigo}
            />
          </Form.Item>
          <Form.Item label="Sede Examen" rules={[{ required: true }]} name="SEDE_EXAM">
            <Select
              options={[
                {label: 'Pasco', value: 'Pasco'},
                {label: 'Tarma', value: 'Tarma'},
                {label: 'Huayllay', value: 'Huayllay'},
                {label: 'Oxapampa', value: 'Oxapampa'},
              ]}
            />
          </Form.Item>
          <Form.Item label="Preparatoria" rules={[{ required: true }]} name="PREPARATORIA">
            <Select
              options={[
                {label: 'Si', value: 1},
                {label: 'No', value: 0},
              ]}
            />
          </Form.Item>
          {
            statusCepre
            ?
            <>
              <Form.Item label="Turno" rules={[{ required: true }]} name="TURNO">
                <Select
                  options={[
                    {label: 'Mañana', value: 'M'},
                    {label: 'Tarde', value: 'T'},
                  ]}
                  onChange={changeTurno}
                />
              </Form.Item>
              <Form.Item label="Aula" rules={[{ required: true }]} name="ID_AULA">
                <Select
                  options={selectAulas}
                />
              </Form.Item>
              </>
            :
            ''
          }
          <Form.Item label="Año que termino secundaria?" rules={[{ required: true }]} name="YEAR_CONCLU">
            <DatePicker picker='year' style={{ width: '100%' }} />
          </Form.Item>
          {
            statusModalidades
            ?
              <Form.Item label="Modalidad" name="ID_TIPO_MODALIDAD">
                <Select
                  options={selectModalidades}
                />
              </Form.Item>
            :
            ''
          }
        </Form>
      </Drawer>
      </div>
    </div>
  );
};

export default InscritoPage;
