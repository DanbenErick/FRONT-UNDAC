import React, { useEffect, useRef, useState } from 'react';
import { SaveFilled, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  message,
  Alert,
} from 'antd';
import {
  subirFotoEstudianteService,
  subirDocumentacionEstudianteService,
  inscribirEstudianteService,
  verificarInscripcionEstudianteService,
  verificarDatosComplementariosEstudiante,
} from '../../../api/inscripcionDashEstudianteService';
import {
  buscarAulaPorTurnoForm,
  obtenerCarrerasCodigoForm,
  obtenerCarrerasPorModalidadesForm,
  obtenerDepartamentosForm,
  obtenerDiscapacidadesForm,
  obtenerDistritosForm,
  obtenerModalidadesForm,
  obtenerProcesoActivoForm,
  obtenerProvinciasForm,
  obtenerRazasEtnicasForm,
} from '../../../api/apiInpputs';
import moment from 'moment';
import 'remixicon/fonts/remixicon.css';
import SpinnerComponent from '../../../components/Spinner';

const InscripcionModalidadesPage = () => {
  const [formDatosComplementariosEstudiante] = Form.useForm();
  const [selectProcesos, setSelectProcesos] = useState([]);
  const [selectCarreras, setSelectCarreras] = useState([]);
  const [selectDiscapacidades, setSelectDiscapacidades] = useState([]);
  const [selectRazasEtnicas, setSelectRazasEtnicas] = useState([]);
  const [selectModalidades, setSelectModalidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [verificarRegistroEstudiante, setVerificarRegistroEstudiante] = useState(0);
  const [stateInscripcionEstudiante, setStateInscripcionEstudiante] = useState(false);
  const [stateDatComplEstudiante, setStateDatComplEstudiante] = useState(false);

  const [optionsDepartamento, setOptionsDepartamento] = useState();
  const [optionsProvincia, setOptionsProvincia] = useState();
  const [optionsDistrito, setOptionsDistrito] = useState();

  const fileInputDocRef = useRef(null);
  const fileInputImgRef = useRef(null);

  const verificarInscritoDatosComplEstudiante = async () => {
    const params = { DNI: localStorage.getItem('dni'), TIPO_PROCESO: 'M' };
    
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
    const resp_proceso_activo = await obtenerProcesoActivoForm({TIPO_PROCESO: 'M'});
    // const resp_carreras = await obtenerCarrerasCodigoForm();
    const resp_discapacidades = await obtenerDiscapacidadesForm();
    const resp_razas_etnicas = await obtenerRazasEtnicasForm();
    const resp_departamentos = await obtenerDepartamentosForm();
    const resp_modalidades = await obtenerModalidadesForm()
    // const resp_ubicaciones = await obtenerUbicacionesForm();

    // setOptionsUbicacion(resp_ubicaciones.data);
    setOptionsDepartamento(resp_departamentos.data);
    setSelectProcesos(resp_proceso_activo.data);
    // setSelectCarreras(resp_carreras.data);
    setSelectDiscapacidades(resp_discapacidades.data);
    setSelectRazasEtnicas(resp_razas_etnicas.data);
    setSelectModalidades(resp_modalidades.data);
    setLoading(false);
  };
  const guardarDatosComplementarios = async (params) => {
    params.DNI = localStorage.getItem('dni');
    params.RUTA_FOTO = params.DNI + '.jpg';
    params.LUGAR_NACIMIENTO = '010101';
    params.CELULAR = '999999999';
    params.FECHA_NACIMIENTO = moment(params.FECHA_NACIMIENTO).format(
      'YYYY-MM-DD',
    );
    params.YEAR_CONCLU = moment(params.YEAR_CONCLU).format('YYYY');

    const resp_inscripcion_estudiante = await inscribirEstudianteService(params);
    const resp_subir_foto = await subirFoto(params.DNI);
    const resp_subir_documento = await subirDocumentosEstudiante(params.DNI);
    if (
      resp_inscripcion_estudiante.data.ok &&
      resp_subir_foto &&
      resp_subir_documento
    ) {
      message.success('Registrado correctamente');
      setVerificarRegistroEstudiante(true )
      return;
    }
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
  const changeModalidad = async () => {
    const params = formDatosComplementariosEstudiante.getFieldsValue()
    params.ID_PROCESO = params.PROCESO
    const resp = await obtenerCarrerasPorModalidadesForm(params);
    
    setSelectCarreras(resp.data);
  }
  return verificarRegistroEstudiante ? (
    <Alert
      message="Registro exitoso"
      description="Usted ya realizo su test psicologico"
      type="success"
      showIcon
    />
  ) : (
    <>
      {loading ? <SpinnerComponent /> : ''}
      <h1>
        <i className="ri-draft-fill"></i>Datos Complementarios
      </h1>
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
              <div className="cardDashEstudiante">
                <div className="cardDashEstudianteHeader">
                  <p>
                    <i className="ri-group-2-fill"></i> Apoderado
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
              </div>
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
                  label="Proceso"
                  name="PROCESO"
                  rules={[{ required: true }]}
                  
                >
                  <Select
                    showSearch
                    placeholder="Selecciona un proceso"
                    options={selectProcesos}
                    filterOption={filterOption}
                  />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Modalidad"
                  name="ID_TIPO_MODALIDAD"
                  rules={[{ required: true }]}
                >
                  <Select
                    showSearch
                    placeholder="Selecciona un proceso"
                    options={selectModalidades}
                    filterOption={filterOption}
                    onChange={changeModalidad}
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
                    disabled={selectCarreras.length === 0}
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
                  label="Sede de Examen"
                  name="SEDE_EXAM"
                  rules={[{ required: true }]}
                >
                  <Select
                    options={[
                      {
                        value: 'Pasco',
                        label: 'Pasco',
                      },
                      {
                        value: 'Tarma',
                        label: 'Tarma',
                      },
                      {
                        value: 'Oxampampa',
                        label: 'Oxampampa',
                      },
                    ]}
                    filterOption={filterOption}
                  />
                </Form.Item>
                <Form.Item className="FormItem" label="Foto" name="RUTA_FOTO" rules={[{ required: true }]}>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    ref={fileInputImgRef}
                    onChange={handleFileImgChange}
                  />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Archivos DNI y Cert. estudios"
                  rules={[{ required: true }]}
                  
                >
                  <input
                    type="file"
                    accept=".pdf"
                    ref={fileInputDocRef}
                    onChange={handleFileDocChange}
                  />
                </Form.Item>
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
                        label="Fecha de Nacimiento"
                        name="FECHA_NACIMIENTO"
                        rules={[{ required: true }]}
                      >
                        <DatePicker style={{ width: '100%' }} />
                      </Form.Item>
                      <Form.Item
                        className="FormItem"
                        label="Departamento"
                        name="DEPARTAMENTO"
                        rules={[{ required: true }]}
                      >
                        <Select
                          options={optionsDepartamento}
                          onChange={buscarProvincia}
                          filterOption={filterOption}
                        />
                      </Form.Item>
                      <Form.Item
                        className="FormItem"
                        label="PROVINCIA"
                        name="PROVINCIA"
                        rules={[{ required: true }]}
                      >
                        <Select
                          onChange={buscarDistrito}
                          options={optionsProvincia}
                          filterOption={filterOption}
                        />
                      </Form.Item>
                      <Form.Item
                        className="FormItem"
                        label="DISTRITO"
                        name="DISTRITO"
                        rules={[{ required: true }]}
                      >
                        <Select options={optionsDistrito} filterOption={filterOption} />
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
                      <Form.Item
                        className="FormItem"
                        label="Telefono Fijo"
                        name="TELEFONO"
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              )
          }
        </div>
      </Form>
      <Button type="primary" block icon={<SaveFilled />} style={{ marginTop: '10px' }} onClick={formDatosComplementariosEstudiante.submit}>Guardar</Button>
    </>
  );
};

export default InscripcionModalidadesPage;
