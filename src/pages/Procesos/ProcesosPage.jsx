import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Drawer, Modal, Select, Table, Tabs, Tooltip } from 'antd';
import { Tag, Popconfirm, Card, Form, Input, Radio, DatePicker } from 'antd';
import * as XLSX from 'xlsx';
import SpinnerCompoent from '../../components/Spinner';
import {
  crearProceso,
  cerrarProceso,
  procesarPadronPorExcel,
  actualizarProcesoservice,
} from '../../api/apiProcesos';
import '../../assets/styles/DashboardAdmin.css';
import moment from 'moment';
import { abrirProcesoService, getInscritosPorProcesoAreasService, getInscritosPorProcesoCarrerasService, getInscritosPorProcesoModalidadesService, getInscritosPorProcesoSedeService, getInscritosPorProcesoService, getProcesosService, obtenerEstudiantesParaCSVService, obtenerReportePDFPadronService } from '../../services/ProcesosService';
import { message } from 'antd/es';
import { CloseCircleOutlined, EyeOutlined, FileExcelFilled, FormOutlined, SettingOutlined, SnippetsOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { obtenerProcesosForm, obtenerSedesForm } from '../../api/apiInpputs';
import { ignore } from 'antd/es/theme/useToken';

const convertirACsv = (data) => {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "DNI;APELLIDOS Y NOMBRES,\n";

  // Recorrer los datos de los estudiantes
  for (const estudiante of data) {
    csvContent += `${estudiante.DNI};${estudiante.NOMBRE_COMPLETO}\n`;
  }

  // Crear un enlace para descargar el archivo CSV
  const downloadLink = document.createElement("a");
  downloadLink.href = csvContent;
  downloadLink.download = "estudiantes.csv";
  downloadLink.textContent = "Descargar CSV";
  downloadLink.target = "_blank";

  // Descargar el archivo automáticamente
  downloadLink.click();

  document.body.appendChild(downloadLink);
}
let ID_MODALIDAD_LOCAL = 0
let procesoActualizar = null
export default function ProcesosPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState([]);
  const [statusModal, setStatusModal] = useState(false);
  const [dataInscritos, setDataInscritos] = useState([]);
  const [columnsInscritosTable, setColumnsInscritosTable] = useState([])

  const [selectProcesos, setSelectProcesos] = useState([])
  const [optionsSedes, setOptionsSedes] = useState([])

  const [statusPadronModal, setStatusPadronModal] = useState(false)
  const [formPadronEstudiantes] = Form.useForm()
  const [formPanelProceso] = Form.useForm()

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
  const generarCSVEstudiantes = async(params) => {
    const resp = await obtenerEstudiantesParaCSVService(params)
    console.log(resp)
    convertirACsv(resp.data)
    
  }
  const abrirProceso = async(params) => {
    setLoading(true)
    const resp = await abrirProcesoService(params)
    if(resp.data.ok) {
      message.success(resp.data.message)
      await refreshTableProcesos()
    }else {
      message.error(resp.data.message)
    }
    setLoading(false)
  }
  const obtenerInscritosPorProcesoSede = async (params) => {
    setStatusModal(true)
    const resp = await getInscritosPorProcesoSedeService(params)
    setColumnsInscritosTable(columnsInscritos)
    setDataInscritos(resp.data)
  }
  const obtenerInscritosPorProcesoArea = async (params) => {
    setStatusModal(true)
    const resp = await getInscritosPorProcesoAreasService(params)
    setColumnsInscritosTable(columnsInscritosArea)
    setDataInscritos(resp.data)
  }
  const obtenerInscritosPorProcesoCarrera = async (params) => {
    setStatusModal(true)
    const resp = await getInscritosPorProcesoCarrerasService(params)
    setColumnsInscritosTable(columnsInscritosCarrera)
    setDataInscritos(resp.data)
  }
  const obtenerInscritosPorProcesoModalidad = async (params) => {
    setStatusModal(true)
    const resp = await getInscritosPorProcesoModalidadesService(params)
    setColumnsInscritosTable(columnsInscritosModalidad)
    setDataInscritos(resp.data)
  }
  const abrirPanelProceso = async(params) => {
    
    procesoActualizar = params.ID_PROCESO
    const procesos = await getProcesosService()
    console.log("Params recibidos", params, procesos)
    const procesoSeleccionado = procesos.data.filter(proceso => proceso.ID === params.ID_PROCESO)
    formPanelProceso.setFieldsValue({
      NOMBRE: procesoSeleccionado[0].NOMBRE,
      FECHA_REGISTRO: procesoSeleccionado[0].FECHA_REGISTRO,
      TIPO_PROCESO: procesoSeleccionado[0].TIPO_PROCESO,
      IMAGEN_PROCESO: procesoSeleccionado[0].IMAGEN_PROCESO,
    })
    console.log("Proceso seleccionado", procesoSeleccionado)

    setPanelProceso(true)
  }
  
  const generarPadronEstudiantes = async() => {
    const params = formPadronEstudiantes.getFieldsValue()
    setLoading(true)
    try {
      const resp = await obtenerReportePDFPadronService(params)
      console.log(resp)
      if(resp && resp.ok) {
        message.success('Se genero correctamente el padron')
      }
      else {
        message.error('Ocurrio un error')
      }
      setLoading(false)
    }catch(error) {
      message.error('Ocurrio un error')
      console.info('Ocurrio un error', error)
      setLoading(false)
    }
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
  const columnsInscritosArea = [
    {
      title: 'AREA',
      dataIndex: 'AREA',
      key: 'AREA',
    },
    {
      title: 'Total de inscritos',
      dataIndex: 'CANTIDAD',
      key: 'CANTIDAD',
    },
  ]
  const columnsInscritosModalidad = [
    {
      title: 'MODALIDAD',
      dataIndex: 'NOMBRE_MODALIDAD',
      key: 'NOMBRE_MODALIDAD',
    },
    {
      title: 'Total de inscritos',
      dataIndex: 'CANTIDAD',
      key: 'CANTIDAD',
    },
  ]
  const columnsInscritosCarrera = [
    {
      title: 'NOMBRE CARRERA',
      dataIndex: 'NOMBRE_CARRERA',
      key: 'NOMBRE_CARRERA',
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
      title: 'Imagen',
      dataIndex: 'IMAGEN_PROCESO',
      key: 'IMAGEN_PROCESO',
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
            <Tooltip title="Editar proceso">
              <Button onClick={() => {abrirPanelProceso({ID_PROCESO: column.ID});  ID_MODALIDAD_LOCAL = column.ID}} type="link" success icon={<SettingOutlined />}></Button>
            </Tooltip>
            <Tooltip title="Generar CSV de estudiantes">
              <Button onClick={() => {generarCSVEstudiantes({ID_PROCESO: column.ID});  ID_MODALIDAD_LOCAL = column.ID}} type="link" icon={<SnippetsOutlined />} success ></Button>
            </Tooltip>
            <Tooltip title="Reporte">
              <Button onClick={() => {obtenerInscritosPorProcesoSede({ID_PROCESO: column.ID});  ID_MODALIDAD_LOCAL = column.ID}} type="link" success icon={<FormOutlined />}></Button>
            </Tooltip>
            <Popconfirm
              title="Proceso"
              description="Quieres cerrar este proceso?"
              onConfirm={() => handleCerrarProceso({ ID: column.ID })}
              onCancel={() => ''}
              okText="Si"
              cancelText="No"
            >
              <Button type="link" danger icon={<CloseCircleOutlined />}></Button>
            </Popconfirm>
            </>
          );
        }
        return (
          <>
            <Tooltip title="Editar proceso">
              <Button onClick={() => {abrirPanelProceso({ID_PROCESO: column.ID});  ID_MODALIDAD_LOCAL = column.ID}} type="link" success icon={<SettingOutlined />}></Button>
            </Tooltip>
            <Tooltip title="Reporte">
              <Button onClick={() => {obtenerInscritosPorProcesoSede({ID_PROCESO: column.ID});  ID_MODALIDAD_LOCAL = column.ID}} type="link" success icon={<FormOutlined />}></Button>
            </Tooltip>
            <Tooltip title="Abrir proceso">
              <Button style={{ color: 'green' }} onClick={() => {abrirProceso({ID_PROCESO: column.ID});  ID_MODALIDAD_LOCAL = column.ID}} type="link" success icon={<ThunderboltOutlined />}></Button>
            </Tooltip>
          </>
        )
        
      },
    },
  ];
  
  const onChangeTabs = async(params) => {
    setLoading(true)
    if(params === 'sedes')       await obtenerInscritosPorProcesoSede({ID_PROCESO: ID_MODALIDAD_LOCAL})
    if(params === 'modalidades') await obtenerInscritosPorProcesoModalidad({ID_PROCESO: ID_MODALIDAD_LOCAL})
    if(params === 'carreras')    await obtenerInscritosPorProcesoCarrera({ID_PROCESO: ID_MODALIDAD_LOCAL})
    if(params === 'areas')       await obtenerInscritosPorProcesoArea({ID_PROCESO: ID_MODALIDAD_LOCAL})
    
    setLoading(false)
  }
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
  const getInputs = async(params) => {
    const resp = await obtenerProcesosForm()
    const resp_2 = await obtenerSedesForm({ TIPO_PROCESO: 'O' })
    setSelectProcesos(resp.data)
    setOptionsSedes(resp_2.data)

  }
  const [jsonData, setJsonData] = useState([]);
  const [panelProceso, setPanelProceso] = useState(false);
  const [fileExcel, setFileExcel] = useState(null)
  const procesarExcel = async() => {

    if (!fileExcel) {
      alert("Por favor selecciona un archivo Excel primero.");
      return;
    }


    // const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log(jsonData)
      // Convertir los datos a tu formato JSON deseado
      const formattedData = []
      for(let i = 1; i < jsonData.length; i++) {
        if(jsonData[i][0] != undefined) {
          formattedData.push(
            {
              area: jsonData[i][0],
              aula: jsonData[i][1],
              inicio: jsonData[i][2],
              cantidad: jsonData[i][3],
              id_proceso: jsonData[i][4],
              sede: jsonData[i][5]
            }
          )
        }
      }
      const jsonDatas = JSON.stringify(formattedData)
      console.log("datos", jsonDatas)
      setJsonData(jsonDatas)
      const resp = await procesarPadronPorExcel(jsonDatas)
      if(resp && resp.ok) {
        message.success('Generado correctamente')
      }
    };

    reader.readAsArrayBuffer(fileExcel);
  }
  const handleFileChangeExcel = (event) => {
    setFileExcel(event.target.files[0])
  };
  const showModalPadron = (params) => {
    //TODO: Show modal padron
    setStatusPadronModal(true)
    getInputs()
  }
  const guardarCambiosPanel = async(params) => {
    console.log(params)
    params.FECHA_REGISTRO = moment(params.FECHA_REGISTRO).format('YYYY-MM-DD',)
    const resp = await actualizarProcesoservice({ ...params, ID_PROCESO: procesoActualizar })
    if(resp.data.ok) {
      message.success('Proceso actualizado correctamente')
      await refreshTableProcesos()
      setPanelProceso(false)
    }else {
      message.error('No se actualizo el proceso correctamente')

    }
  }
  const itemsTabs = [
    {
      key: 'sedes',
      label: 'Sedes',
      children: <Table dataSource={dataInscritos} columns={columnsInscritosTable} size='large' />,
    },
    {
      key: 'modalidades',
      label: 'Modalidad',
      children: <Table dataSource={dataInscritos} columns={columnsInscritosTable} size='large' />,
    },
    {
      key: 'carreras',
      label: 'Carrera',
      children: <Table dataSource={dataInscritos} columns={columnsInscritosTable} size='large' />,
    },
    {
      key: 'areas',
      label: 'Areas',
      children: <Table dataSource={dataInscritos} columns={columnsInscritosTable} size='large' />,
    },
  ];
  const hiddenPanelProceso = async() => {
    setPanelProceso(false)
  }
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
                    {label: 'PRIMERA SELECCION', value: 'P'},
                    {label: 'POSGRADO', value: 'V'},
                  ]}
                />
                  
              </Form.Item>
              <Form.Item
                label="Imagen del proceso"
                name="IMAGEN_PROCESO"
                rules={[{ required: true, message: 'El imagen es requerido' }]}
              >
                <Input
                  placeholder='imagen-proceso.jpeg'
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
                <Button onClick={showModalPadron} type="link" icon={<SnippetsOutlined />} success >Generar padron</Button>
              </Form.Item>
            </div>
          </Form>
        </Card>
        <Card type="inner" title="Lista de procesos">
          <Table dataSource={dataTable} columns={columns} size="small" />
        </Card>
      </div>
      
      <Modal title="Padron de Estudiantes" open={statusPadronModal} onOk={() => {formPadronEstudiantes.submit()}} onCancel={() => setStatusPadronModal(false)}>
      <input type="file" onChange={handleFileChangeExcel} accept=".xlsx, .xls" />
        <Button type='primary' onClick={procesarExcel}>Procesar con excel</Button>
        <Form layout='vertical' form={formPadronEstudiantes} onFinish={generarPadronEstudiantes}>
          <Form.Item label="Proceso" name="ID_PROCESO">
            <Select
              options={selectProcesos}
            />
          </Form.Item>
          <div className="container-inicio-fin" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <Form.Item label="Inicio" name="INICIO">
              <Input  />
            </Form.Item>
            <Form.Item label="Fin" name="FIN">
              <Input  />
            </Form.Item>
          </div>
          <div className="container-inicio-fin" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <Form.Item label="Area" name="AREA">
              <Select
                options={[
                  {label: '1', value:'1'},
                  {label: '2', value:'2'},
                  {label: '3', value:'3'},
                  {label: '4', value:'4'},
                  {label: '5', value:'5'},
                  {label: '6', value:'6'},
                ]}
              />
            </Form.Item>
            <Form.Item label="Aula" name="AULA">
              <Input  />
            </Form.Item>
          </div>
          <div className="container-inicio-fin" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <Form.Item label="Fecha" name="FECHA">
              <Input  />
            </Form.Item>
            <Form.Item label="Sede" name="SEDE">
              <Select
                options={optionsSedes}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
      <Modal title="Informcion del Proceso" open={statusModal} onOk={() => setStatusModal(false)} onCancel={() => setStatusModal(false)}>
        <Tooltip placement="left" title='Exportar excel'>
          <Button type="success" style={{ background: '#006400', color: 'white' }}><i class="ri-file-excel-2-fill"></i></Button>
        </Tooltip>
        <Tabs
          defaultActiveKey="1"
          items={itemsTabs}
          onChange={onChangeTabs}
          indicator={{
            size: (origin) => origin - 20,
            align: 'center',
          }}
        />
        {/* <Table dataSource={dataInscritos} columns={columnsInscritosTable} size='large' /> */}
      </Modal>
      <Drawer
        title="Modificar proceso"
        placement='right'
        onClose={hiddenPanelProceso}
        open={panelProceso}
      >
        <Form
          layout='vertical'
          form={formPanelProceso}
          onFinish={guardarCambiosPanel}
        >
          <Form.Item label="Nombre proceso" name="NOMBRE" rules={[{ required: true, message: 'El estado es requerido' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Fecha de Inicio" name="FECHA_REGISTRO" rules={[{ required: true, message: 'El estado es requerido' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Tipo de proceso" name="TIPO_PROCESO" rules={[{ required: true, message: 'El estado es requerido' }]}>
            <Select
              options={[
                {label: 'CEPRE', value: 'C'},
                {label: 'ORDINARIO', value: 'O'},
                {label: 'MODALIDADES', value: 'M'},
                {label: 'PRIMERA SELECCION', value: 'P'},
                {label: 'POSGRADO', value: 'V'},
              ]}
            />
          </Form.Item>
          <Form.Item label="Imagen de proceso" name="IMAGEN_PROCESO" rules={[{ required: true, message: 'El estado es requerido' }]}>
            <Input />
          </Form.Item>
          <Form.Item >
            <Button type="primary" block htmlType='submit'>Guardar cambios</Button>
          </Form.Item>
        </Form>
        
      </Drawer>
    </div>
  );
}
