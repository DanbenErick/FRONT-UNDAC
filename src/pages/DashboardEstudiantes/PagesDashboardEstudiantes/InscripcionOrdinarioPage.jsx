import React, { useEffect, useRef, useState } from 'react';
import { SaveFilled, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, DatePicker, Radio, message, Alert, AutoComplete, Switch, Modal, Image } from 'antd';
import { subirFotoEstudianteService, subirDocumentacionEstudianteService, inscribirEstudianteService, verificarInscripcionEstudianteService, verificarDatosComplementariosEstudiante } from '../../../api/inscripcionDashEstudianteService';
import { buscarAulaPorTurnoForm, obtenerCarrerasCodigoForm, obtenerDepartamentosForm, obtenerDiscapacidadesForm, obtenerDistritosForm, obtenerProcesoActivoForm, obtenerProvinciasForm, obtenerRazasEtnicasForm, obtenerSedesForm } from '../../../api/apiInpputs';
import moment from 'moment';
import 'remixicon/fonts/remixicon.css';
import SpinnerComponent from '../../../components/Spinner';

const InscripcionOdinarioPage = () => {
  const [formDatosComplementariosEstudiante] = Form.useForm();
  const [selectProcesos, setSelectProcesos] = useState();
  const [selectCarreras, setSelectCarreras] = useState();
  const [disabledCarreraPorSede, setDisabledCarreraPorSede] = useState(false)
  const [selectAulas, setSelectAulas] = useState();
  const [selectDiscapacidades, setSelectDiscapacidades] = useState();
  const [selectRazasEtnicas, setSelectRazasEtnicas] = useState();
  const [loading, setLoading] = useState(false);
  const [verificarRegistroEstudiante, setVerificarRegistroEstudiante] = useState(0);
  const [stateInscripcionEstudiante, setStateInscripcionEstudiante] = useState(false);
  const [stateDatComplEstudiante, setStateDatComplEstudiante] = useState(false);
  const [selectSedesExamen, setSelectSedesExamen] = useState([])

  const [estudianteInscrito, setEstudianteInscrito] = useState(false);

  const [statusCardDatosApoderado, setStatusCardDatosApoderado] = useState(false)

  const [statusInputDiscapacidad, setStatusInputDiscapacidad] = useState(false)

  const [optionsDepartamento, setOptionsDepartamento] = useState();
  const [optionsProvincia, setOptionsProvincia] = useState();
  const [optionsDistrito, setOptionsDistrito] = useState();

  const [statusModalFoto, setStatusModalFoto] = useState(false)

  const fileInputDocRef = useRef(null);
  const fileInputImgRef = useRef(null);

  const verificarInscritoDatosComplEstudiante = async () => {
    const params = { DNI: localStorage.getItem('dni'), TIPO_PROCESO: 'O' };
    
    const resp_dat_compl = await verificarDatosComplementariosEstudiante(params);
    setStateDatComplEstudiante(resp_dat_compl.data.ok)
    const resp_insc = await verificarInscripcionEstudianteService(params);
    setStateInscripcionEstudiante(resp_insc.data.ok)
    if (resp_dat_compl.data.ok && resp_insc.data.ok) {
      setVerificarRegistroEstudiante(true);
      return true
    }
    return false
  };
  // const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  
  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const subirFoto = async (params) => {
    const formData = new FormData();
    const selectedFile = fileInputImgRef.current.files[0];
    const typeFile = selectedFile.type;
    const fileExtension = typeFile.split('/')[1];
    const newFileName = `${params}.${fileExtension}`;
    formData.append('foto', selectedFile, newFileName);
    if (!selectedFile) {
      message.error('Selecciona una imagen');
      return;
    }
    const resp_foto = await subirFotoEstudianteService(formData);
    if (resp_foto.data.ok) {
      message.success(resp_foto.data.message);
      return true;
    }
    message.error(resp_foto.data.message);
  };
  const subirDocumentosEstudiante = async (params) => {
    const formData = new FormData();
    const selectedFile = fileInputDocRef.current.files[0];
    const typeFile = selectedFile.type;
    const fileExtension = typeFile.split('/')[1];
    const newFileName = `${params}.${fileExtension}`;
    formData.append('documento', selectedFile, newFileName);
    if (!selectedFile) {
      message.error('Selecciona un documento');
      return;
    }
    const resp_doc = await subirDocumentacionEstudianteService(formData);
    if (resp_doc.data.ok) {
      message.success(resp_doc.data.message);
      return true;
    }
    message.error(resp_doc.data.message);
  };

  const getInputs = async () => {
    setLoading(true);
    const resp_proceso_activo = await obtenerProcesoActivoForm({TIPO_PROCESO: 'O'});
    const resp_sedes_examen = await obtenerSedesForm({TIPO_PROCESO: 'O'});
    const resp_carreras = await obtenerCarrerasCodigoForm();
    const resp_discapacidades = await obtenerDiscapacidadesForm();
    const resp_razas_etnicas = await obtenerRazasEtnicasForm();
    const resp_departamentos = await obtenerDepartamentosForm();
    
    // const resp_ubicaciones = await obtenerUbicacionesForm();
    
    // setOptionsUbicacion(resp_ubicaciones.data);
    setSelectSedesExamen(resp_sedes_examen.data)
    setOptionsDepartamento(resp_departamentos.data);
    setSelectProcesos(resp_proceso_activo.data);
    setSelectCarreras(resp_carreras.data);
    setSelectDiscapacidades(resp_discapacidades.data);
    setSelectRazasEtnicas(resp_razas_etnicas.data);
    setLoading(false);
  };
  const guardarDatosComplementarios = async (params) => {
    setLoading(true);
    params.DNI = localStorage.getItem('dni');
    params.RUTA_FOTO = params.DNI + '.jpg';
    // params.LUGAR_NACIMIENTO = '010101';
    // params.CELULAR = '999999999';
    // params.FECHA_NACIMIENTO = moment(params.FECHA_NACIMIENTO).format(
    //   'YYYY-MM-DD',
    // );
    
    params.YEAR_CONCLU = new Date(params.YEAR_CONCLU)
    params.YEAR_CONCLU = params.YEAR_CONCLU.getFullYear();
    

    const resp_inscripcion_estudiante = await inscribirEstudianteService(params);
    const resp_subir_foto = await subirFoto(params.DNI);
    // const resp_subir_documento = await subirDocumentosEstudiante(params.DNI);
    if (
      resp_inscripcion_estudiante.data.ok &&
      resp_subir_foto
    ) {
      message.success('Registrado correctamente');
      setVerificarRegistroEstudiante(true )
      return;
    }
    setLoading(false)
  };
  const buscarDistrito = async (params) => {
    const resp = await obtenerDistritosForm({ PROVINCIA: params });
    setOptionsDistrito(resp.data);
  };

  const buscarProvincia = async (params) => {
    const resp = await obtenerProvinciasForm({ DEPARTAMENTO: params });
    setOptionsProvincia(resp.data);
  };

  useEffect(() => {
    const exe = async() => {
      const resp = await verificarInscritoDatosComplEstudiante();
      if(!resp) getInputs();
    }
    exe()
  }, []);
  const changeEventDiscapacidad = (event) => {
    event === 1 ? setStatusInputDiscapacidad(true) : setStatusInputDiscapacidad(false) 
    
  }
  const handleFileDocChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      // Aquí puedes manejar el archivo PDF

      // Puedes realizar más acciones, como enviar el archivo al servidor
    } else {
      // Mostrar un mensaje de error si el archivo no es un PDF
      console.error('Por favor, selecciona un archivo PDF.');
      // Limpiar el campo de entrada para permitir seleccionar el mismo archivo nuevamente
      fileInputDocRef.current.value = '';
    }
  };
  const handleFileImgChange = (e) => {
    const file = e.target.files[0];
    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      // Aquí puedes manejar el archivo PDF

      // Puedes realizar más acciones, como enviar el archivo al servidor
    } else {
      // Mostrar un mensaje de error si el archivo no es un PDF
      console.error('Por favor, selecciona un archivo PDF.');
      // Limpiar el campo de entrada para permitir seleccionar el mismo archivo nuevamente
      fileInputImgRef.current.value = '';
    }
  };
  const onChangeSwitchMayorEdad = async(params) => {
    params ? setStatusCardDatosApoderado(true): setStatusCardDatosApoderado(false)
  }
  const buscarAulaPorTurno = async(e) => {
    const resp = await buscarAulaPorTurnoForm({TURNO: e})
    setSelectAulas(resp.data)
  }
  const changeSedeCarrera = async(e) => {
    const selectCarreraChange = selectCarreras.filter(carrera => carrera.value === e)
    setDisabledCarreraPorSede(false)
    const validValuesPasco = ['133001', '117001', '134001', '118001', '132001', '138001', '135001'];
    if(validValuesPasco.includes(selectCarreraChange[0].value)) {
      formDatosComplementariosEstudiante.setFieldValue('SEDE_EXAM', 'CERRO DE PASCO')
      setDisabledCarreraPorSede(true)
    }
    if(selectCarreraChange[0].value == '120001') {
      formDatosComplementariosEstudiante.setFieldValue('SEDE_EXAM', 'TARMA')
      setDisabledCarreraPorSede(true)
    }
    // console.log(selectCarreraChange)
    
  }
  return verificarRegistroEstudiante ? (
    <Alert
      message="Registro exitoso"
      description="Usted ya esta inscrito para el examen ordinario"
      type="success"
      showIcon
    />
  ) : (
    <>
      {loading ? <SpinnerComponent /> : ''}
      
      <h1>
        <i className="ri-draft-fill"></i>INSCRIPCION
      </h1>
      <p><i style={{fontWeight: 'bold', textDecoration: 'underline'}}> Completa los datos para llevar a cabo tu correcta inscripcion a un proceso</i></p>
      <Switch checkedChildren="+18" unCheckedChildren="-18" onChange={onChangeSwitchMayorEdad} />
      <b>   Soy mayor de edad</b>
      <Form
        layout="vertical"
        form={formDatosComplementariosEstudiante}
        onFinish={guardarDatosComplementarios}
        
      >
        <div className="gridInscripcionEstudianteDashboard">
          {
          stateDatComplEstudiante === true 
            ? ''
            : (
                !statusCardDatosApoderado ? (
                <div className="cardDashEstudiante">
                  <div className="cardDashEstudianteHeader">
                    <p>
                      <i className="ri-group-2-fill"></i> Apoderado del Postulante
                    </p>
                  </div>
                  <div className="cardDashEstudianteBody">
                    <div className="gridFormFormularioApoderado">
                      <Form.Item
                        className="FormItem"
                        label="Apellido y nombres"
                        name="NOMBRE_COMPLETO_APO"
                        rules={[{ required: true }]}
                      >
                        <Input maxLength={30} />
                      </Form.Item>
                      <Form.Item
                        className="FormItem"
                        label="Numero de celular "
                        name="CELULAR_APO"
                        rules={[{ required: true }]}
                      >
                        <Input maxLength={9} />
                      </Form.Item>
                      <Form.Item
                        className="FormItem"
                        label="Numero de DNI"
                        name="DNI_APO"
                        rules={[{ required: true }]}
                      >
                        <Input maxLength={8} />
                      </Form.Item>
                    </div>
                  </div>
                </div>)
              :
                <></>
            )
          }
          <div className="cardDashEstudiante">
            <div className="cardDashEstudianteHeader">
              <p>
                <i className="ri-file-3-fill"></i> Formulario de inscripcion
              </p>
            </div>
            <div className="cardDashEstudianteBody">
              <div className="gridFormFormularioInscripcion">
                <Form.Item
                  className="FormItem"
                  label="Tipo de Proceso"
                  name="PROCESO"
                  rules={[{ required: true }]}
                >
                  <Select
                    showSearch
                    placeholder="Selecciona un proceso"
                    options={selectProcesos}
                    filterOption={filterOption}
                    // defaultValue={34}
                  />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Programa de Estudio"
                  name="COD_CARRERA"
                  rules={[{ required: true }]}
                >
                  <Select
                    showSearch
                    placeholder="Selecciona un proceso"
                    options={selectCarreras}
                    filterOption={filterOption}
                    onChange={changeSedeCarrera}
                  />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Año termino secundaria"
                  name="YEAR_CONCLU"
                  rules={[{ required: true }]}
                >
                  <DatePicker picker="year" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Tipo de Colegio"
                  name="TIPO_COLEGIO"
                  rules={[{ required: true }]}
                >
                  <Radio.Group defaultValue="a" buttonStyle="solid">
                    <Radio.Button value="E">Estatal</Radio.Button>
                    <Radio.Button value="P">Privada</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Nombre de Colegio"
                  name="NOMBRE_COLEGIO"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Sede - Filial de Examen"
                  name="SEDE_EXAM"
                  rules={[{ required: true }]}
                >
                  <Select
                    options={selectSedesExamen}
                    filterOption={filterOption}
                    disabled={disabledCarreraPorSede}
                  />
                </Form.Item>
                
                
                <Form.Item className="FormItem" label="Fotografia del Postulante(Actualizado)" name="RUTA_FOTO" rules={[{ required: true }]}>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    ref={fileInputImgRef}
                    onChange={handleFileImgChange}
                  />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="DNI y Cert. estudios (PDF)"
                  name="RUTA_DOCUMENTO"
                  rules={[{ required: true }]}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    ref={fileInputDocRef}
                    onChange={handleFileDocChange}
                  />
                </Form.Item>
                <Button onClick={() => setStatusModalFoto(true)}>Ver Fotografia de Ejemplo</Button>
              </div>
            </div>
          </div>
          {
            stateDatComplEstudiante === true
              ? ''
              : (
                <div className="cardDashEstudiante">
                  <div className="cardDashEstudianteHeader">
                    <p>
                      <i className="ri-file-3-fill"></i> Datos Complementarios
                    </p>
                  </div>
                  <div className="cardDashEstudianteBody">
                    <div className="gridFormDatosComplementarios">
                      <Form.Item
                        className="FormItem"
                        label="Genero"
                        name="SEXO"
                        rules={[{ required: true }]}
                      >
                        <Select
                          options={[
                            {
                              value: 'M',
                              label: 'Masculino',
                            },
                            {
                              value: 'F',
                              label: 'Femenino',
                            },
                          ]}
                          filterOption={filterOption}
                        />
                      </Form.Item>
                      <Form.Item
                        className="FormItem"
                        label="Fecha de Nacimiento Ejem. 31-12-2006"
                        name="FECHA_NACIMIENTO"
                        rules={[{ required: true }]}
                      >
                        <DatePicker style={{ width: '100%' }} format={'DD-MM-YYYY'} />
                      </Form.Item>
                      <Form.Item
                        className="FormItem"
                        label="Departamento"
                        name="DEPARTAMENTO"
                        rules={[{ required: true }]}
                      >
                        <Select
                          showSearch
                          filterOption={filterOption}
                          options={optionsDepartamento}
                          onChange={buscarProvincia}
                        />
                      </Form.Item>
                      <Form.Item
                        className="FormItem"
                        label="Provincia"
                        name="PROVINCIA"
                        rules={[{ required: true }]}
                      >
                        <Select
                          showSearch
                          onChange={buscarDistrito}
                          options={optionsProvincia}
                          filterOption={filterOption}
                        />
                      </Form.Item>
                      <Form.Item
                        className="FormItem"
                        label="Distrito"
                        name="DISTRITO"
                        rules={[{ required: true }]}
                      >
                        <Select showSearch options={optionsDistrito} filterOption={filterOption} />
                      </Form.Item>
                      <Form.Item
                        className="FormItem"
                        label="Direccion Actual"
                        name="DIRECCION"
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        className="FormItem"
                        label="¿Tiene discapacidad?"
                        name="TIPO_DISCAPACIDAD"
                        rules={[{ required: true }]}
                      >
                        <Select
                          showSearch
                          placeholder="Si o No"
                          // defaultValue={0}
                          onChange={changeEventDiscapacidad}
                          options={[
                            {
                              label: 'Si',
                              value: 1,
                            },
                            {
                              label: 'No',
                              value: 0,
                            },
                          ]}
                          filterOption={filterOption}
                        />
                      </Form.Item>
                      {
                      statusInputDiscapacidad
                        ?
                        <Form.Item
                          className="FormItem"
                          label="Tipo de Discapacidad"
                          name="DISCAPACIDAD"
                          rules={[{ required: true }]}
                        >
                          <Select
                            showSearch
                            placeholder="Selecciona un proceso"
                            options={selectDiscapacidades}
                            filterOption={filterOption}
                          />
                        </Form.Item>
                        :
                        ''
                      }
                      <Form.Item
                        className="FormItem"
                        label="Identidad Etnica"
                        name="ETNICA"
                        rules={[{ required: true }]}
                      >
                        <Select
                          showSearch
                          placeholder="Selecciona un proceso"
                          options={selectRazasEtnicas}
                          filterOption={filterOption}
                        />
                      </Form.Item>
                      {/* <Form.Item
                        className="FormItem"
                        label="Telefono Fijo"
                        name="TELEFONO"
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item> */}
                    </div>
                  </div>
                </div>
              )
          }
        </div>
      </Form>
      <Button type="primary" block icon={<SaveFilled />} style={{ marginTop: '10px' }} onClick={formDatosComplementariosEstudiante.submit}>Inscribir Postulante</Button>


      <Modal title="Modelo de Fotografia (Actualizada)"  open={statusModalFoto} onOk={() => setStatusModalFoto(false)} onCancel={() => setStatusModalFoto(false)}>
        <Image src={process.env.PUBLIC_URL + '/fotografia_modelo_postulante.jpg'}  />
      </Modal>

    </>
  );
};

export default InscripcionOdinarioPage;
