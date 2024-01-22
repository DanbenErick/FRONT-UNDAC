import { SaveFilled } from '@ant-design/icons'
import { Alert, Button, Form, Radio, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { registrarTestpsicologicoService, verificarTestpsicologicoEstudianteService } from '../../../api/inscripcionDashEstudianteService'

const TestpsicologicoPage = () => {
  const [formTestpsicologico] = Form.useForm()
  const [registradoTest, setRegistradoTest] = useState(false)
  const guardarTestpsicologico = async (params) => {
    params.DNI = localStorage.getItem('dni')
    const resp = await registrarTestpsicologicoService(params)
    if(!resp.data.ok) {
      message.error(resp.data.message)
      return
    }
    message.success(resp.data.message)
    setRegistradoTest(true)
  }
  const verificarTestpsicologico = async() => {
    const resp = await verificarTestpsicologicoEstudianteService({DNI: localStorage.getItem('dni')})
    if(resp.data.ok) {
      setRegistradoTest(true)
    }
  }
  useEffect(() => {
    verificarTestpsicologico()
  })
  return (
    
      registradoTest
        ? 
        (<Alert
          message="Registro exitoso"
          description="Usted ya realizo su test psicologico"
          type="success"
          showIcon
        />)
        : (

          <Form form={formTestpsicologico} onFinish={guardarTestpsicologico}>
          <div className="cardDashEstudiante">
                  <div className="cardDashEstudianteHeader">
                    <p><i className="ri-group-2-fill"></i> Test Psicologico</p>
                  </div>
                  <div className="cardDashEstudianteBody">
                    <div className="gridFormTestPsicologico">
                      <div className="itemTestPsicologico">
                        <p>1. Soy optimista en la mayoría de las cosas que hago</p>
                        <Form.Item name="TEST_1_PREG_1" rules={[{ required: true }]}>
                          <Radio.Group defaultValue="a" buttonStyle="solid">
                            <Radio.Button value="1">NUNCA</Radio.Button>
                            <Radio.Button value="2">POCAS VECES</Radio.Button>
                            <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                            <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                            <Radio.Button value="5">SIEMPRE</Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </div>                
                      <div className="itemTestPsicologico">
                        <p>2. Me considero una persona con fuerza de voluntad o con ideas propias</p>
                        <Form.Item name="TEST_1_PREG_2" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>3. Mantengo buenas relaciones con los demás</p>
                        <Form.Item name="TEST_1_PREG_3" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>4. Me resulta fácil adaptarme a situaciones nuevas</p>
                        <Form.Item name="TEST_1_PREG_4" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>5. Me gusta participar en actividades sociales vinculadas con el servicio a los demás</p>
                        <Form.Item name="TEST_1_PREG_5" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>6. Puedo manejar situaciones de estrés, sin ponerme demasiado nervioso</p>
                        <Form.Item name="TEST_1_PREG_6" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>7. Me siento feliz con el tipo de persona que soy</p>
                        <Form.Item name="TEST_1_PREG_7" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>8. Disfruto del reto que implica enseñarle a otra persona, o a grupos de personas, algo que se hacer</p>
                        <Form.Item name="TEST_1_PREG_8" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>9. Me gusta estudiar los temas a profundidad para obtener el máximo provecho intelectual</p>
                        <Form.Item name="TEST_1_PREG_9" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>10. Considero que estudiar con sentido crítico (juzgando lo que leo o escucho, tratando de llegar a ideas o conclusiones personales), es básico para mi formación como persona</p>
                        <Form.Item name="TEST_1_PREG_10" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>11. Planifico mi tiempo de estudio y asuntos personales</p>
                        <Form.Item name="TEST_1_PREG_11" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>12. Utilizo esquemas, gráficos u organizadores de aprendizaje para comprender los temas</p>
                        <Form.Item name="TEST_1_PREG_12" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>13. Para recordar los temas me ayudo de esquemas o resúmenes</p>
                        <Form.Item name="TEST_1_PREG_13" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>14. Construyo organizadores visuales con mis propias ideas a fin de demostrar que he comprendido el tema</p>
                        <Form.Item name="TEST_1_PREG_14" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>15. Considero que es importante ampliar la información de las clases en otras fuentes</p>
                        <Form.Item name="TEST_1_PREG_15" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
      
                      <br /><br />
                      <b>Test 2</b>
      
                      <div className="itemTestPsicologico">
                        <p>1. Buscas definir y clarificar los conceptos con fuentes bibliográficas para analizar o resolver un problema</p>
                        <Form.Item name="TEST_2_PREG_1" rules={[{ required: true }]}>
                          <Radio.Group defaultValue="a" buttonStyle="solid">
                            <Radio.Button value="1">NUNCA</Radio.Button>
                            <Radio.Button value="2">POCAS VECES</Radio.Button>
                            <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                            <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                            <Radio.Button value="5">SIEMPRE</Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </div>                
                      <div className="itemTestPsicologico">
                        <p>2. Cuando un problema tiene varias soluciones eres capaz de analizarlos, especificando sus ventajas e inconvenientes</p>
                        <Form.Item name="TEST_2_PREG_2" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>3. Cuando lees un texto, identificas claramente la información central y relevante</p>
                        <Form.Item name="TEST_2_PREG_3" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>4. Comunicas o expresas tu punto de vista cuando no está de acuerdo con alguna posición diferente a la tuya</p>
                        <Form.Item name="TEST_2_PREG_4" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>5. Te gusta estudiar, formular y resolver problemas de cálculo y lógica</p>
                        <Form.Item name="TEST_2_PREG_5" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>6. Haces uso de nuevos medios tecnológicos para experimentar con relaciones matemáticas y otros problemas académicos</p>
                        <Form.Item name="TEST_2_PREG_6" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>7. Tienes capacidad de enseñar y transmitir conocimientos a niños y adolescentes</p>
                        <Form.Item name="TEST_2_PREG_7" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>8. Eres capaz de conducir actividades y dinámicas grupales</p>
                        <Form.Item name="TEST_2_PREG_8" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>9. Puedes acompañar, orientar y guiar el trabajo de los demás</p>
                        <Form.Item name="TEST_2_PREG_9" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>10. Planteas soluciones a los problemas del contexto sin dejarte llevar por lo establecido, la tradición o la autoridad</p>
                        <Form.Item name="TEST_2_PREG_10" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>11. Produces cambios en la manera de explicar y resolver los problemas con nuevas propuestas frente a lo establecido</p>
                        <Form.Item name="TEST_2_PREG_11" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>12. Reconoces y valoras las ideas y contribuciones de los demás, y les da el respectivo crédito</p>
                        <Form.Item name="TEST_2_PREG_12" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>13. Desarrollas habilidades y actividades físicas para mejorar tu calidad de vida</p>
                        <Form.Item name="TEST_2_PREG_13" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>14. Aprecias las manifestaciones artístico-culturales para comprender el aporte del arte a la cultura y a la sociedad</p>
                        <Form.Item name="TEST_2_PREG_14" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      </div>
                      <div className="itemTestPsicologico">
                        <p>15. Has creado proyectos artísticos utilizando los diversos lenguajes del arte para comunicar mis ideas a otros</p>
                        <Form.Item name="TEST_2_PREG_15" rules={[{ required: true }]}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="1">NUNCA</Radio.Button>
                          <Radio.Button value="2">POCAS VECES</Radio.Button>
                          <Radio.Button value="3">ALGUNAS VECES</Radio.Button>
                          <Radio.Button value="4">MUCHAS VECES</Radio.Button>
                          <Radio.Button value="5">SIEMPRE</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item>
                        <Button icon={<SaveFilled />} type="primary" htmlType='submit'>Guardar cambios</Button>
                      </Form.Item>
                      </div>
                      
                    </div>
                  </div>
                </div>
      
                </Form>
        )
    
  )
}

export default TestpsicologicoPage