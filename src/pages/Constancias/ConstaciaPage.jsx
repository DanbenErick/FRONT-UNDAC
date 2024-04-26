import React, { useEffect, useRef, useState } from 'react';
import SpinnerComponent from '../../components/Spinner';
import { message, Popconfirm, Form, Breadcrumb, Button, Card, Table, Input, Select, Tooltip, Radio, Modal } from 'antd';
import { CheckOutlined, FileExcelOutlined, FilePdfOutlined, SaveFilled, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { generarConstanciaEstudiante, generarConstanciasBloqueService, obtenerIngresanteParaConstanciaPorDNIService, obtenerIngresantesService, procesarCodigosMatriculaService } from '../../api/cordinadoresService';
import { obtenerProcesosForm } from '../../api/apiInpputs';
import * as XLSX from 'xlsx';
import '../../assets/styles/VacantesPage.css';


const cancel = (e) => {
  message.error('Proceso cancelado');
};

const ConstanciaPage = () => {
  const [formModalFileExcel] = Form.useForm()
  const fileExcelCodigoMatricula = useRef()
  const [messageFileExcel, setMessageFileExcel] = useState('Ningun archivo seleccionado')
  const [modalConstancia, setModalConstancia] = useState(false)
  const [formCordinador] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState([]);
  const [inputProcesos, setInputProcesos] = useState([]);
  const [cantidadCodigosMatricula, setCantidadCodigosMatricula] = useState('')
  const [erroresDNICodigoMatricula, setErroresDNICodigoMatricula] = useState([])

  const obtenerDataTable = async() => {
    setLoading(true)
    const resp = await obtenerIngresantesService()
    setDataTable(resp.data)
    setLoading(false)
  }
  useEffect(() => {
    setLoading(true)
    obtenerDataTable()
    getProcesosInputs()
    setLoading(false);
  }, []);
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
      render(data, col) {
        return (
            <Tooltip title={col.NOMBRE_COMPLETO}>
                <span>{data}</span>
            </Tooltip>
        )
      }
    },
    {
      title: 'Puntaje',
      dataIndex: 'PUNT_T',
      key: 'PUNT_T',
      render(data, col) {
        return parseFloat(data).toFixed(2)
      }
    },
    {
      title: 'Cod. Matri',
      dataIndex: 'CODIGO_MATRICULA',
      key: 'CODIGO_MATRICULA',
    },
    {
      title: 'Carrera',
      dataIndex: 'CARRERA',
      key: 'CARRERA',
    },
    {
      title: 'Accion',
      align: 'center',
      dataIndex: 'ACCION',
      key: 'ACCION',
      render: (data, col) => (
        
        <>
          <Button style={{ color: 'red  ' }} onClick={() => { obtenerConstancia({dni: col.DNI, proceso: col.PROCESO, tipo_documento: formCordinador.getFieldValue('TIPO_DOCUMENTO')}) }} type="link" icon={<FilePdfOutlined />}></Button>
        </>
      )
    }
  ];
  const obtenerConstancia = async(params) => {
    await generarConstanciaEstudiante(params)
  }

  

  
  
  
  const getProcesosInputs = async () => {
    try {
      const resp = await obtenerProcesosForm();

      setInputProcesos(resp.data);
    } catch (error) {
      console.error('Error ', error);
    }
  };
  const buttonClickSelectFileExcel  = async() => {
    fileExcelCodigoMatricula.current.click()
  }
  const handleFileExcel = async(event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileNameParts = selectedFile.name.split('.');
      const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
      if (fileExtension !== 'xlsx') {
        message.info('Formato no soportado. Por favor, seleccione un archivo de tipo Excel (xlsx).')
        // Limpiar el input de tipo archivo
        event.target.value = null;
      } else {
        console.log('Archivo seleccionado:', selectedFile);
        console.log(event.target.files[0].name)
        const nombreArchivo = event.target.files[0].name
        if(nombreArchivo.length > 25) {
          setMessageFileExcel(nombreArchivo.substring(0, 20) + '...')
        }else {
          setMessageFileExcel(nombreArchivo)
        }
        // Aquí puedes realizar cualquier acción adicional con el archivo seleccionado
      }
    }
  }
  const procesarExcelConstancia = async() => {
    setLoading(true)
    const selectedFile = fileExcelCodigoMatricula.current.files[0];
    if (!selectedFile) {
      message.info('Por favor, seleccione un archivo antes de procesarlo.')
      return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setCantidadCodigosMatricula(jsonData.length)
      setDataTableExcel(jsonData)
      const dataForm = formModalFileExcel.getFieldsValue()
      const resp = await procesarCodigosMatriculaService({dataExcel: [...jsonData], proceso: dataForm.ID_PROCESO})
      if(resp && resp.status === 200 && resp.data.ok) {
        message.success('Se establecio los codigo de los alumnos')
        setCantidadCodigosMatricula(`${resp.data.correctas} / ${jsonData.length}`)
        setErroresDNICodigoMatricula(resp.data.errores)
      }
      setLoading(false)
    };
    reader.readAsArrayBuffer(selectedFile);
  }
  const columnsTableExcel = [
    {title: 'DNI', dataIndex: 'DNI', key: 'DNI'},
    {title: 'COD MATRI', dataIndex: 'CODIGO_MATRICULA', key: 'CODIGO_MATRICULA'},
  ]
  const [dataTableExcel, setDataTableExcel] = useState([])
  const buscarEstudiante = async() => {
    const form = formCordinador.getFieldsValue()
    const resp = await obtenerIngresanteParaConstanciaPorDNIService({dni: form.DNI, proceso: form.ID_PROCESO})
    setDataTable(resp.data)
  }
  const generarConstanciasBloque = async({ ID_PROCESO, TIPO_DOCUMENTO }) => {
    setLoading(true)
    const resp = await generarConstanciasBloqueService({ proceso: ID_PROCESO, tipo_documento: TIPO_DOCUMENTO })
    if(resp.ok) {
      message.success('Se genero correctamente las constancias')
    }
    setLoading(false)
    
  }
  const openModalConstancia = () => {
    setModalConstancia(true)
  }
  const closeModalConstancia = () => {
    setModalConstancia(false)
  }
  return (
    <div>
      
      {loading ? <SpinnerComponent /> : ''}
      <div className="contentDashboard">
        <h1 className="titlePageDashboard">Constancias</h1>
        <Breadcrumb className="bradcrumpPadding">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Constancias</Breadcrumb.Item>
        </Breadcrumb>
        <Card type="inner" title="Crear constancias">
          <Form
            layout="vertical"
            form={formCordinador}
            onFinish={generarConstanciasBloque}
          >
            <div className="vacantesPageContainerFormCrearVacante">
              
              
              <Form.Item label="Proceso" name="ID_PROCESO">
                <Select
                  showSearch
                  placeholder="Selecciona un proceso"
                  options={inputProcesos}
                />
              </Form.Item>
              <Form.Item label="DNI" name="DNI">
                <Input maxLength={8} />
              </Form.Item>
              <Form.Item label="Codigo de Matricula" name="TIPO_DOCUMENTO">
              <Radio.Group defaultValue="ORIGINAL" buttonStyle="solid">
                <Radio.Button value="ORIGINAL">Original</Radio.Button>
                <Radio.Button value="CARGO">Cargo</Radio.Button>
              </Radio.Group>
              </Form.Item>
            </div>
                <Popconfirm
                  title="Constancia"
                  description="Quieres generar un bloque de constancias?"
                  onConfirm={() => formCordinador.submit()}
                  onCancel={cancel}
                  okText="Si"
                  cancelText="No"
                >
                  <Button type="primary" style={{ marginRight: '5px' }} icon={<SaveFilled />}>Generar constancias</Button>
                </Popconfirm>
                <Button style={{ background: '#305496', marginRight: '5px' }} type="primary" icon={<FileExcelOutlined />} onClick={() => openModalConstancia()}> Codigo de Matricula</Button>
                <Button style={{ border: 'solid 1px #305496' }} icon={<SearchOutlined />} onClick={buscarEstudiante}> Buscar</Button>
          </Form>
        </Card>
        <Card type="inner" title="Lista de constancias">
          <Table dataSource={dataTable} columns={columnsTable} size="small" />
        </Card>
      </div>

      <Modal
      centered
      width={520}
      onCancel={closeModalConstancia}
      type='info'
        open={modalConstancia}
        okButtonProps={{
          style: { display: 'none'}
        }}
        cancelButtonProps={{
          style: { display: 'none'}
        }}
      >
        <h2>Codigo de Matricula</h2>
        <h3>Archivo</h3>
        <a href="/formatos/FORMATO_CODIGO_MATRICULA_DARASOFT_2025.xlsx" download="FORMATO_CODIGO_MATRICULA_DARASOFT_2025.xlsx">
          <Button block type="primary" style={{ background: '#217346', marginBottom: '10px' }} icon={<FileExcelOutlined />}>Descargar formato</Button>
        </a>
        <input type="file" ref={fileExcelCodigoMatricula} accept='.xlsx' onChange={handleFileExcel} className='inputFileHidden' />

        <h3>Procesar Excel</h3>
        <Form layout='vertical' form={formModalFileExcel} onFinish={procesarExcelConstancia}>
          <Form.Item name="ID_PROCESO" label="Proceso" rules={[{ required: true }]}>
          <Select
            showSearch
            placeholder="Selecciona un proceso"
            options={inputProcesos}
          />
          </Form.Item>
        </Form>
        <div className='inputFileCustom' onClick={buttonClickSelectFileExcel}>
          <p>{messageFileExcel}</p>
          <Button>Seleccionar archivo</Button>
        </div>

        {
          cantidadCodigosMatricula !== ''
          ?
          (
            <>
              <p>Cantidad de registros es: <b>{cantidadCodigosMatricula}</b></p>
              <p>Ocurrio un error con estos DNI: <b>{JSON.stringify(erroresDNICodigoMatricula)}</b></p>
              <Table columns={columnsTableExcel} dataSource={dataTableExcel} pagination={{pageSize: 2}} />
            </>
          )
          : ''
        }
        

        <Button style={{ background: '#217346' }} type="primary" block icon={<SettingOutlined />}  onClick={() => formModalFileExcel.submit()} >Procesar Excel</Button>
        


      </Modal>
    </div>
  );
};

export default ConstanciaPage;
