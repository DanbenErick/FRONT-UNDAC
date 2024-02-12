import React from 'react'
import qrcode from 'qrcode';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image, Font } from '@react-pdf/renderer';
import { obtenerDatosEstudianteCarnetService } from '../api/inscripcionDashEstudianteService';


const contenido = 'https://gemini.google.com/'+ localStorage.getItem('uuid');
Font.register({ family: 'Roboto Condensed', src: 'https://fonts.gstatic.com/s/robotocondensed/v27/ieVo2ZhZI2eCN5jzbjEETS9weq8-_d6T_POl0fRJeyVVpcBO5Xw.woff2' });
// Estilos para el PDF
const styles = StyleSheet.create({
    page: {
    //   flexDirection: 'row',
    //   backgroundColor: '#E4E4E4',
      // fontFamily: 'Roboto Condensed'
    },
    section: {
      // margin: 10,
      // padding: 10,
      // flexGrow: 1,
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0
    },
    text: {
      fontSize: 20,
      textAlign: 'left',
      marginBottom: 10,
      fontFamily: 'Times-Bold'
    },
    pdfViewer: {
        width: '100vw', // Ancho completo de la ventana del navegador
        height: '100vh', // Alto completo de la ventana del navegador
        position: 'absolute', // Posición absoluta para llenar toda la ventana
        overflow: 'hidden',
        top: 0, // Alinear arriba
        left: 0, // Alinear a la izquierda
      },
    qrContainer: {
      // width: '100%',
      // height: '150px',
      // justifyContent: 'flex-end',
      // backgroundColor: 'yellow'
    },
    qrcode: {
      width: '150px', 
      height: '150px',
      position: 'fixed', 
      top: '680px', 
      left: '67%', 
    },
    imagenFondo: {
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%',
      
    },
    containerText: {
      position: 'fixed', 
      top: '37%', 
      left: '20%', 
      transform: 'translate(-50%, -50%)',
    },
    fotoPerfil: {
      position: 'fixed', 
      top: '28%', 
      left: '34%', 
      width: '200px',
      height: '200px'
    }
  });
  
  
  
  // Componente para renderizar el PDF
  const HojaEstudianteIngresoPage = () =>{
    const obtenerDatosEstudiante = async(params) => {
      
      const resp = await obtenerDatosEstudianteCarnetService(params)
      setDataStudent(resp.data[0])
      console.log("DATOS ESTUDIANTE", dataStudent)
      qrcode.toDataURL(contenido)
        .then(dataURL => setQrDataURL(dataURL))
        .catch(err => console.error(err));
      console.log(resp)
    }
    const [dataStudent, setDataStudent] = React.useState(null)
    const [qrDataURL, setQrDataURL] = React.useState('');
    React.useEffect(() => {
      obtenerDatosEstudiante({UUID: localStorage.getItem('uuid')})
      }, []);
      return (
        dataStudent != null ?
        <div style={styles.pdfViewer}>
      <PDFViewer width="100%" height="100%">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
            <Image src="encabezado-estudiante-carnet.jpg" style={styles.imagenFondo} />
            <Image src={`${process.env.REACT_APP_API_URL}/${dataStudent.DNI}/${dataStudent.DNI}.jpeg`}  style={styles.fotoPerfil} />
            
              <View style={styles.containerText}>
                <Text style={styles.text}>APELLIDO PATERNO: {dataStudent.AP_PATERNO}</Text>
                <Text style={styles.text}>APELLIDO MATERNO: {dataStudent.AP_MATERNO}</Text>
                <Text style={styles.text}>NOMBRES: {dataStudent.NOMBRES}</Text>
                <Text style={styles.text}>CARRERA: {dataStudent.ESCUELA_COMPLETA}</Text>
                <Text style={styles.text}>MODALIDAD: {dataStudent.MODALIDAD_ESTUDIANTE}</Text>
                <Text style={styles.text}>AREA: {dataStudent.AREA}</Text>
                <Text style={styles.text}>SEDE EXAMEN: {dataStudent.SEDE_EXAMEN}</Text>
                <Text style={styles.text}>CODIGO ESTUDIANTE: {dataStudent.DNI}</Text>
              </View>
            </View>
            <div style={styles.qrContainer}>
              {qrDataURL && <Image src={qrDataURL} style={styles.qrcode} />}
            </div>
          </Page>
        </Document>
      </PDFViewer>
    </div>
    :
    <></>
      );
  }
  


export default HojaEstudianteIngresoPage