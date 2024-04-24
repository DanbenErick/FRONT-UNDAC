import React, { useEffect, useRef, useState } from 'react';
import SpinnerComponent from '../../components/Spinner';
import { AutoComplete, Breadcrumb, Button, DatePicker, Divider, Image, Modal, Select, Space, Table, Tooltip } from 'antd';
import { Card } from 'antd';
import { Form } from 'antd';
import { Input } from 'antd';
import { CreditCardOutlined, EditFilled, SaveFilled, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import {
  buscarEstudianteService,
  editarArchivoEstudianteService,
  editarFotoEstudianteService,
  modificarDatosComplementariosEstudianteService,
  modificarEstudianteService,
  obtenerDatosComplementariosEstudianteService,
  obtenerEstudiantesService,
  registrarEInscribirEstudianteService,
  resetearPasswordService,
} from '../../api/estudiantesAdmService';
import { Popconfirm } from 'antd';
import { Drawer } from 'antd';
import { message } from 'antd';
import moment from 'moment';
import { buscarAulaPorTurnoForm, obtenerCarrerasCodigoForm, obtenerCarrerasForm, obtenerDepartamentosForm, obtenerDiscapacidadesForm, obtenerDistritoUbigeoAutocompleteForm, obtenerDistritosForm, obtenerModalidadesForm, obtenerProcesoActivoForm, obtenerProcesosForm, obtenerProvinciasForm, obtenerRazasEtnicasForm, obtenerTodosLosProcesosActivosForm } from '../../api/apiInpputs';
import { formatDateUtil, formatOnlyYear } from '../../util/Util';
import { Option } from 'antd/es/mentions';



const EstudiantesPage = () => {
  const [keyFoto, setKeyFoto] = useState(0)
  const [loading, setLoading] = useState();
  const [stateDNI, setStateDNI] = useState()
  const [formEstudiantes] = Form.useForm();
  const [formModificarPassword] = Form.useForm()
  const [formModificarDatosComplementarios] = Form.useForm()
  const [dataTable, setDataTable] = useState();
  const [formModificarEstudiante] = Form.useForm();
  const [panelEditarEstudiante, setPanelEditarEstudiante] = useState(false);
  const [stateDNIResetPassword, setStateDNIResetPassword] = useState('')
  // Selects
  const [selectCarreras, setSelectCarreras] = useState([]);
  const [selectAulas, setSelectAulas] = useState([]);
  const [selectProcesos, setSelectProcesos] = useState([]);
  const [selectDiscapacidades, setSelectDiscapacidades] = useState([]);
  const [selectEtnias, setSelectEtnias] = useState([])
  const [selectDepartamento, setSelectDepartamento] = useState([])
  const [selectProvincia, setSelectProvincia] = useState([])
  const [selectDistrito, setSelectDistrito] = useState([])
  const [selectModalidades, setSelectModalidades] = useState([])
  
  const [modalFotosyArchivo, setModalFotosyArchivo] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [refreshFoto, setRefreshFoto] = useState(false)

  const [optionsDistritos, setOptionsDistritos] = useState([])

  const [stateDraweResetearPassword, setStateDraweResetearPassword] = useState(false)
  const [stateDrawerResetearDatosComplementarios, setStateDrawerResetearDatosComplementarios] = useState(false)

  const [stateDiscapacidad, setStateDiscapacidad] = useState(false);
  const [stateAulas, setStateAulas] = useState(false)

  const [statusCepre,setStatusCepre] = useState(false)
  const [statusPrimeraSeleccion,setStatusPrimeraSeleccion] = useState(false)
  const [statusOrdinario,setStatusOrdinario] = useState(false)
  const [statusModalidades,setStatusModalidades] = useState(false)

  const [formRegistrarEInscribir] = Form.useForm()

  const fileFoto = useRef(null)
  const fileArchivo = useRef(null)

  // const handleFileFoto = (event) => {
  //   setFileFoto(event.target.files[0]);
  // }
  // const handleFileArchivo = (event) => {
  //   setFileArchivo(event.target.files[0]);
  // }
  const showDrawerResetearContraseña = (params) => {
    setStateDNIResetPassword(params.DNI)
    setStateDraweResetearPassword(true)
  }
  const showDrawerDatosComplementarios = async(params) => {
    setLoading(true)
    setStateDNIResetPassword(params.DNI)
    const resp = await obtenerDatosComplementariosEstudianteService(params)
    resp.data[0].FECHA_NACIMIENTO = formatDateUtil(resp.data[0].FECHA_NACIMIENTO)
    formModificarDatosComplementarios.setFieldsValue(resp.data[0])
    console.log(resp.data[0])
    // formModificarDatosComplementarios
    setStateDrawerResetearDatosComplementarios(true)
    setLoading(false)
  }

  

  const closeDrawerResetearContraseña = () => setStateDraweResetearPassword(false)
  const closeDrawerDatosComplementarios = () => setStateDrawerResetearDatosComplementarios(false)

  
  const onSearchUbicacion = async(value) => {
    const resp = await obtenerDistritoUbigeoAutocompleteForm({DISTRITO: value})
    setOptionsDistritos(resp.data)
    console.log(resp)
  }


  const handleCancelFoto = () => setModalFotosyArchivo(false)
  const handleShowFoto = ({ID, DNI}) => {
    setStateDNI(DNI)
    setModalFotosyArchivo(true)
  }

  // const changeProcesos = async(value) => {
  //   selectProcesosActivos.forEach(proceso => {
      
  //     if (proceso.value === value) {
  //       setStatusCepre(false)
  //       setStatusPrimeraSeleccion(false)
  //       setStatusOrdinario(false)
  //       setStatusModalidades(false)
  //       if(proceso.TIPO_PROCESO === 'C') {
  //         setStatusCepre(true)
  //       }
  //       if(proceso.TIPO_PROCESO === 'O'){
  //         setStatusOrdinario(true)
  //       } 
  //       if(proceso.TIPO_PROCESO === 'P'){
  //         setStatusPrimeraSeleccion(true)
  //       } 
  //       if(proceso.TIPO_PROCESO === 'M'){
  //         setStatusModalidades(true)
  //       } 
  //     }
  //   })
  // }

  const columnsTable = [
    {
      title: 'DNI',
      dataIndex: 'DNI',
      key: 'DNI',
    },
    {
      title: 'NOMBRE COMPLETO',
      dataIndex: 'NOMBRE_COMPLETO',
      key: 'NOMBRE_COMPLETO',
    },
    {
      title: 'Celular',
      dataIndex: 'CELULAR',
      key: 'CELULAR',
    },
    {
      title: 'Correo',
      dataIndex: 'CORREO',
      key: 'CORREO',
    },
    {
      title: 'Fecha',
      dataIndex: 'FECHA_REGISTRO',
      key: 'FECHA_REGISTRO',
      render: (data) => moment(data).format('YYYY/MM/DD'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, column) => {
        // if (column.ESTADO === 1) {
        return (
          <>
            <Popconfirm
              title="Estudiante"
              placement="left"
              description="Quieres editar este estudiante?"
              onConfirm={() => {
                showPanelEditEstudiante({ ID: column.ID, DNI: column.DNI });
              }}
              onCancel={() => ''}
              okText="Si"
              cancelText="No"
            >
              <Button type="link" info icon={<EditFilled />}></Button>
            </Popconfirm>
            <Popconfirm
              placement="left"
              title="Estudiante"
              description="Quieres editar foto?"
              onConfirm={() => {
                handleShowFoto({ ID: column.ID, DNI: column.DNI });
              }}
              onCancel={() => ''}
              okText="Si"
              cancelText="No"
            >
              <Button type="link" info icon={<UploadOutlined />}></Button>
            </Popconfirm>
            {/* <a href="/generar-pdf" target="_blank" onClick={() => localStorage.setItem('uuid', column.UUID)}>
              <Button type="link" info icon={<CreditCardOutlined />}></Button>
            </a> */}
          </>
        );
      },
    },
  ];
  const changeDepartamento = async (e) => {
    setLoading(true)
    const respSelectProvincia = await obtenerProvinciasForm({DEPARTAMENTO: e})
    setSelectProvincia(respSelectProvincia.data)
    setLoading(false)
  }
  const changeProvincia = async(e) => {
    setLoading(true)
    const respSelectDistrito = await obtenerDistritosForm({PROVINCIA: e})
    setSelectDistrito(respSelectDistrito.data)
    setLoading(false)
  }
  const getSelectsRegistrarEstudiante = async() => {
    const respSelectCarreras = await obtenerCarrerasCodigoForm()
    const respSelectProcesos = await obtenerTodosLosProcesosActivosForm()
    const respSelectDiscapacidades = await obtenerDiscapacidadesForm()
    const respSelectEtnias = await obtenerRazasEtnicasForm()
    const respSelectDepartamentos = await obtenerDepartamentosForm()
    
    setSelectCarreras(respSelectCarreras.data)
    setSelectProcesos(respSelectProcesos.data)
    setSelectDiscapacidades(respSelectDiscapacidades.data)
    setSelectEtnias(respSelectEtnias.data)
    setSelectDepartamento(respSelectDepartamentos.data)
  }
  
  const showPanelEditEstudiante = async (params) => {
    const data = dataTable.find((carrera) => carrera.ID === params.ID);
    formModificarEstudiante.setFieldsValue(data);
    setPanelEditarEstudiante(true);
  };
  const initialValues = {
    DNI: '',
    NOMBRES: '',
    CELULAR: '',
  };
  const hiddenPanelEditEstudiante = () => {
    setPanelEditarEstudiante(false);
  };
  const modificarEstudiante = async (params) => {
    const resp = await modificarEstudianteService(params);
    if (resp.data.ok) {
      message.success(resp.data.message);
      await refreshTable();
      hiddenPanelEditEstudiante();
      return;
    }
    message.error(resp.data.message);
  };
  const handleCancel = () => { setIsModalOpen(false)}
  
  const handleProcesos = (value) => {

    selectProcesos.forEach(async(proceso) => {
      
      if (proceso.value === value) {
        setStatusCepre(false)
        setStatusPrimeraSeleccion(false)
        setStatusOrdinario(false)
        setStatusModalidades(false)
        if(proceso.TIPO_PROCESO === 'C') {
          setStateAulas(true)
        }
        if(proceso.TIPO_PROCESO === 'O'){
          setStatusOrdinario(true)
        } 
        if(proceso.TIPO_PROCESO === 'P'){
          setStatusPrimeraSeleccion(true)
        } 
        if(proceso.TIPO_PROCESO === 'M'){
          setStatusModalidades(true)
          const resp_modalidades = await obtenerModalidadesForm()
          setSelectModalidades(resp_modalidades.data);
        } 
      }
    })
  }


  const showModal = async () => {
    setLoading(true)
    await getSelectsRegistrarEstudiante()
    setIsModalOpen(true)
    setLoading(false)
  }
  const refreshTable = async () => {
    const resp = await obtenerEstudiantesService();
    setDataTable(resp.data);
  };
  const handleDiscapacidad = async(e) => {
    e === 1 ? setStateDiscapacidad(true): setStateDiscapacidad(false)
  }
  const buscarEstudiante = async () => {
    const params = formEstudiantes.getFieldValue();
    console.log(params)
    params.DNI = params.DNI || '';
    params.NOMBRES = params.NOMBRES || '';
    params.CELULAR = params.CELULAR || '';
    if (params.DNI === '' && params.NOMBRES === '' && params.CELULAR === '') {
      refreshTable();
      return;
    }
    
    const resp = await buscarEstudianteService(params);
    setDataTable(resp.data);
  };
  const cambiarFoto = async() => {
    let dni = stateDNI
    const formData = new FormData();
    const selectedFile = fileFoto.current.files[0];
    const typeFile = selectedFile.type;
    const fileExtension = typeFile.split('/')[1];
    const newFileName = `${stateDNI}.${fileExtension}`;
    
    formData.append('fotoEstudiante', selectedFile, newFileName);
    const resp = await editarFotoEstudianteService(formData);
    if(resp.status === 200 && resp.data.ok) {
      setRefreshFoto(!refreshFoto)
      message.success(resp.data.message);
      setKeyFoto(prevKey => prevKey + 1)
      // handleCancelFoto()
      // await refreshTable();
      return;
    }
    console.log(resp)
  }
  const modificarPasswordEvent = async(params) => {
    //TODO: Continuar el cambio de contraseña
    console.log(params)
    const resp = await resetearPasswordService({...params, DNI: stateDNIResetPassword})
    if(resp.data.ok) {
      message.success(resp.data.message)
      closeDrawerResetearContraseña()
    }else {
      message.error(resp.data.message)
    }
    
  }
  const cambiarDocumento = async () => {
    const formdata = new FormData()
    formdata.append('archivo', fileArchivo.current.files[0])
    const resp = await editarArchivoEstudianteService(formdata)
    console.log(resp)
  }
  const registrarEInscribirEstudiante = async (params) => {
    params.FECHA_NACIMIENTO = formatDateUtil(params.FECHA_NACIMIENTO)
    params.YEAR_CONCLU = formatOnlyYear(params.YEAR_CONCLU)
    const resp = await registrarEInscribirEstudianteService(params)
    if(resp.data.ok) {
      message.success(resp.data.message)
      // await refreshTable()
      // return
    }
  }
  const modificarDatosComplemtariosEvent = async(params) => {
    params.DNI = stateDNIResetPassword
    console.log(params)
    
    const resp = await modificarDatosComplementariosEstudianteService(params)
    console.log(resp)
  }
  const changeTurno = async(params) => {
    const resp = await buscarAulaPorTurnoForm({TURNO: params})
    setSelectAulas(resp.data)
  }
  useEffect(() => {
    setLoading(true)
    refreshTable();
    setLoading(false)
  }, []);

  return (
    <>
    <div>
      {loading ? <SpinnerComponent /> : ''}
      <div className="contentDashboard">
        <h1 className="titlePageDashboard">Estudiantes</h1>
        <Breadcrumb className="bradcrumpPadding">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Estudiantes</Breadcrumb.Item>
        </Breadcrumb>
        <Card
          type="inner"
          title="Crear estudiantes"
          initialValues={initialValues}
        >
          <Form layout="vertical" form={formEstudiantes}>
            <div className="vacantesPageContainerFormCrearVacante">
              <Form.Item label="DNI" name="DNI">
                <Input />
              </Form.Item>
              <Form.Item label="Nombres Completos" name="NOMBRES">
                <Input />
              </Form.Item>
              <Form.Item label="Celular" name="CELULAR">
                <Input />
              </Form.Item>
            </div>
            <Form.Item className="filaBotones">
              <Button type="primary" icon={<SaveFilled />}>
                Guardar Cambios
              </Button>

              <Button icon={<SearchOutlined />} onClick={buscarEstudiante}>
                Buscar
              </Button>
              <Button type="primary" onClick={showModal}>Registrar Estudiante</Button>
            </Form.Item>
          </Form>
        </Card>
        <Card type="inner" title="Lista de estudiantes">
          <Table dataSource={dataTable} columns={columnsTable} size="small" />
        </Card>

        <Drawer
          title="Modificar estudiante"
          placement="right"
          onClose={hiddenPanelEditEstudiante}
          open={panelEditarEstudiante}
        >
          <Tooltip placement="left" title={'Resetear contraseña'}>
            <Button type="primary" onClick={() => showDrawerResetearContraseña({DNI: formModificarEstudiante.getFieldValue('DNI')})} style={{ marginRight: '5px' }}> <i class="ri-lock-unlock-fill"></i></Button>
          </Tooltip>
          <Tooltip placement="left" title={'Datos complementarios'}>
            <Button type="primary" onClick={() => showDrawerDatosComplementarios({DNI: formModificarEstudiante.getFieldValue('DNI')})}><i class="ri-team-fill"></i></Button>
          </Tooltip>
          <Divider />
          
          
          <Drawer
            title="Resetear Contraseña"
            width={320}
            closable={false}
            onClose={closeDrawerResetearContraseña}
            open={stateDraweResetearPassword}
          >
            <Form layout="vertical"
            form={formModificarPassword}
            onFinish={modificarPasswordEvent}>
              <Form.Item label="Nueva contraseña" name="PASSWORD">
                <Input.Password />
              </Form.Item>
              <Button htmlType="submit" type="primary" block>Guardar contraseña</Button>
            </Form>
          </Drawer>

          <Drawer
            title="Editar Datos Complementarios"
            width={320}
            closable={false}
            onClose={closeDrawerDatosComplementarios}
            open={stateDrawerResetearDatosComplementarios}
          >
            <Form 
              layout="vertical"
              form={formModificarDatosComplementarios}
              onFinish={modificarDatosComplemtariosEvent}
            >
              <Form.Item label="SEXO" name="SEXO">
                <Select>
                  <Option value="M">Masculino</Option>
                  <Option value="F">Femenino</Option>
                </Select>
              </Form.Item>
              {/* <Form.Item label="FECHA DE NACIMIENTO" name="FECHA_NACIMIENTO">
                <DatePicker />
              </Form.Item> */}
              <Form.Item label="LUGAR DE RESIDENCIA" name="LUGAR_RESIDENCIA">
              <AutoComplete
                options={optionsDistritos}
                optionLabelProp="label"
                filterOption={(inputValue, option) => option.label.toLowerCase().includes(inputValue.toLowerCase())}
                sortOption={(option1, option2) => option1.label.localeCompare(option2.label)}
                onSearch={onSearchUbicacion}
                onSelect={(value) => {
                  console.log(value);
                }}
                placeholder="Escribe para buscar..."
              />
                
              </Form.Item>
              <Form.Item label="DIRECCION" name="DIRECCION">
                <Input />
              </Form.Item>
              <Form.Item label="DISCAPACIDAD" name="DISCAPACIDAD">
                <Select>
                  <Option value="0">No</Option>
                  <Option value="1">Si</Option>
                </Select>
              </Form.Item>
              <Form.Item label="CELULAR" name="TELEFONO">
                <Input maxLength={9} />
              </Form.Item>
              <Form.Item label="NOMBRE COLEGIO" name="NOMBRE_COLEGIO">
                <Input />
              </Form.Item>
              <Form.Item label="TIPO COLEGIO" name="TIPO_COLEGIO">
                <Select>
                  <Option value="E">ESTATAL</Option>
                  <Option value="P">PRIVADO</Option>
                </Select>
              </Form.Item>
              <Form.Item label="NOMBRES APODERADO" name="NOMBRE_COMPLETO_APO">
                <Input />
              </Form.Item>
              <Form.Item label="CELULAR APODERADO" name="CELULAR_APO">
                <Input maxLength={9}/>
              </Form.Item>
              <Form.Item label="DNI APODERADO" name="DNI_APO">
                <Input maxLength={8}/>
              </Form.Item>
              <Button htmlType="submit" type="primary" block>Guardar Cambios</Button>
            </Form>
          </Drawer>




          <Form
            layout="vertical"
            form={formModificarEstudiante}
            onFinish={modificarEstudiante}
          >
            <Form.Item label="DNI" name="DNI">
              <Input />
            </Form.Item>
            <Form.Item label="Apellido Paterno" name="AP_PATERNO">
              <Input />
            </Form.Item>
            <Form.Item label="Apellido Materno" name="AP_MATERNO">
              <Input />
            </Form.Item>
            <Form.Item label="Nombres" name="NOMBRES">
              <Input />
            </Form.Item>
            <Form.Item label="Celular" name="CELULAR">
              <Input />
            </Form.Item>
            <Form.Item label="Correo" name="CORREO">
              <Input />
            </Form.Item>
            <Button htmlType="submit">Guardar cambios</Button>
            <Form.Item name="ID">
              <Input type="hidden" />
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </div>

    <Drawer
        title={'Inscribir estudiante'}
        placement="right"
        size={'large'}
        onClose={handleCancel}
        open={isModalOpen}
        extra={
          <Space>
            <Button type="primary" onClick={formRegistrarEInscribir.submit}>
              Guardar
            </Button>
          </Space>
        }
      >
        <Form layout='vertical' className='formProcesosDashAdmin' form={formRegistrarEInscribir} onFinish={registrarEInscribirEstudiante}>
          <Form.Item label="Proceso" name="PROCESO" rules={[{ required: true }]}>
            <Select
              options={selectProcesos}
              onChange={handleProcesos}
            />
          </Form.Item>
          <Form.Item label="DNI" name="DNI" rules={[{ required: true }]}>
            <Input maxLength={8} />
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
          <Form.Item label="Apellido paterno" name="AP_PATERNO" rules={[{ required: true }]}>
            <Input maxLength={20} />
          </Form.Item>
          <Form.Item label="Apellido materno" name="AP_MATERNO" rules={[{ required: true }]}>
            <Input maxLength={20} />
          </Form.Item>
          <Form.Item label="Nombre" name="NOMBRES" rules={[{ required: true }]}>
            <Input maxLength={50} />
          </Form.Item>
          <Form.Item label="Celular" name="CELULAR_EST" rules={[{ required: true }]}>
            <Input maxLength={9} />
          </Form.Item>
          <Form.Item label="Correo" name="CORREO" rules={[{ required: true, type:"email" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Sexo" name="SEXO" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="M">MASCULINO</Select.Option>
              <Select.Option value="F">FEMENINO</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Fecha de Nacimiento" name="FECHA_NACIMIENTO" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Departamento" name="DEPARTAMENTO" rules={[{ required: true }]}>
            <Select
              options={selectDepartamento}
              onChange={changeDepartamento}
            />
          </Form.Item>
          <Form.Item label="Provincia" name="PROVINCIA" rules={[{ required: true }]}>
            <Select
              options={selectProvincia}
              onChange={changeProvincia}
            />
          </Form.Item>
          <Form.Item label="Distrito" name="DISTRITO" rules={[{ required: true }]}>
            <Select
              options={selectDistrito}
            />
          </Form.Item>
          <Form.Item label="Direccion" name="DIRECCION" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Tiene Discapacidad?" name="DISCAPACIDAD" rules={[{ required: true }]}>
            <Select
              options={[
                { label: 'Si', value: 1},
                { label: 'No', value: 0}
              ]}
              onChange={handleDiscapacidad}
            />
          </Form.Item>
          {
            stateDiscapacidad ?
              <Form.Item label="Cual?" name="TIPO_DISCAPACIDAD" rules={[{ required: true }]}>
                <Select
                  options={selectDiscapacidades}
                />
              </Form.Item>
            : ''
          }
          <Form.Item label="Raza etnica" name="ETNICA" rules={[{ required: true }]}>
            <Select
              options={selectEtnias}
            /> 
          </Form.Item>
          <Form.Item label="TELEFONO" name="TELEFONO" rules={[{ required: true }]}>
            <Input maxLength={9} />
          </Form.Item>
          <Form.Item label="Tipo de colegio" name="TIPO_COLEGIO" rules={[{ required: true }]}>
            <Select
              options={[
                {label: 'ESTATAL', value: 'E'},
                {label: 'PRIVADA', value: 'P'}
              ]}
            />
          </Form.Item>
          <Form.Item label="Nombre del colegio" name="NOMBRE_COLEGIO" rules={[{ required: true }]}>
            <Input maxLength={40} />
          </Form.Item>
          <Form.Item label="Nombres apoderado" name="NOMBRE_COMPLETO_APO" rules={[{ required: true }]}>
            <Input maxLength={40} />
          </Form.Item>
          <Form.Item label="Celular apoderado" name="CELULAR_APO" rules={[{ required: true }]}>
            <Input maxLength={9} />
          </Form.Item>
          <Form.Item label="DNI Apoderado" name="DNI_APO" rules={[{ required: true }]}>
            <Input maxLength={8} />
          </Form.Item>
          <Form.Item label="Carrera" name="COD_CARRERA" rules={[{ required: true }]}>
            <Select
              options={selectCarreras}
            />
          </Form.Item>
          <Form.Item label="Sede de examen" name="SEDE_EXAM" rules={[{ required: true }]}>
            <Select
              options={[
                {label: 'Pasco', value:'Pasco'},
                {label: 'Oxapampa', value:'Oxapampa'},
                {label: 'Tarma', value:'Tarma'}
              ]}
            />
          </Form.Item>
          <Form.Item label="Preparatoria?" name="PREPARATORIA" rules={[{ required: true }]}>
            <Select
              options={[
                {label: 'Si', value: 1},
                {label: 'No', value: 0}
              ]}
            />
          </Form.Item>
          {
            stateAulas
            ?
              <>
              <Form.Item label="Turno" name="TURNO" rules={[{ required: true }]}>
                <Select
                  options={[
                    {label: 'MAÑANA', value: 'M'},
                    {label: 'TARDE', value: 'T'},
                  ]}
                  onChange={changeTurno}
                />
              </Form.Item>
              <Form.Item label="Aula" name="ID_AULA" rules={[{ required: true }]}>
                <Select
                  options={selectAulas}
                />
              </Form.Item>
              </>
            :
            ''
          }
          <Form.Item label="Año secundario termino?" name="YEAR_CONCLU" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} picker="year" />
          </Form.Item>
          {/* <Button type="primary" htmlType='submit'>Comprobar</Button> */}
        </Form>
      </Drawer>
    

      <Drawer
        title='Estudiantes'
        placement="right"
        size={'small'}
        onClose={handleCancelFoto}
        open={modalFotosyArchivo}
      >
        <h1>Fotos {stateDNI} </h1>
        <p>Nombre estudiante</p>
        <div style={{ width: '100%', objectFit: 'cover', marginBottom: '10px' }}>
          <Image
            key={keyFoto}
            src={`${process.env.REACT_APP_API_URL}/${stateDNI}/${stateDNI}.jpeg?refresh=${refreshFoto}`}
          />
        </div>
        <Form layout='vertical'>
        
          <Form.Item className="FormItem" label="Foto" name="RUTA_FOTO">
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              ref={fileFoto}
            />
          </Form.Item>
        
          <Button type="primary" onClick={cambiarFoto} style={{ marginBottom: '20px' }}>Subir imagen</Button>
        <Form.Item
          className="FormItem"
          label="Archivos DNI y Cert. estudios"
        >
          <input
            type="file"
            accept=".pdf"
            ref={fileArchivo}
            
          />
        </Form.Item>
          <Button type="primary" onClick={cambiarDocumento}>Subir documento</Button>
        </Form>
        
      </Drawer>
</>
  );
};

export default EstudiantesPage;
