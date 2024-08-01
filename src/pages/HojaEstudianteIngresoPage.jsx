import React, { useState } from 'react'
import qrcode from 'qrcode';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image, Font } from '@react-pdf/renderer';
import { obtenerDatosEstudianteCarnetService } from '../api/inscripcionDashEstudianteService';
import LatoRegular from  '../assets/fuentes/Lato/Lato-Regular.ttf'
import LatoBold from  '../assets/fuentes/Lato/Lato-Bold.ttf'
import LatoLigth from  '../assets/fuentes/Lato/Lato-Light.ttf'
import { useLocation } from 'react-router-dom';
import { obtenerProcesosForm } from '../api/apiInpputs';



Font.register({ family: 'Roboto Condensed', src: 'https://fonts.gstatic.com/s/robotocondensed/v27/ieVo2ZhZI2eCN5jzbjEETS9weq8-_d6T_POl0fRJeyVVpcBO5Xw.woff2' });
Font.register({ family: 'Lato', src: LatoRegular });
Font.register({ family: 'Lato-Bold', src: LatoBold });
Font.register({ family: 'Lato-Ligth', src: LatoLigth });
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
      fontFamily: 'Lato',
      
      width: '450px'
    },
    textBold: {
      fontFamily: 'Lato-Bold',
      fontWeight: 'bold',
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
    const [dataStudent, setDataStudent] = React.useState(null)
    const location = useLocation();
    const [imagenProceso, setImagenProceso] = useState('')
    const queryParams = new URLSearchParams(location.search);
    const obtenerDatosEstudiante = async(params) => {
      
      
      const respProcesos = await obtenerProcesosForm();
      const procesoSeleccionado = respProcesos.data.filter(proceso => proceso.value == queryParams.get('proceso'));
      setImagenProceso(procesoSeleccionado[0].IMAGEN_PROCESO)
      console.log("Proceso seleccionado", procesoSeleccionado)
      // alert("Proceso" + queryParams.get('proceso'))
      const resp = await obtenerDatosEstudianteCarnetService({...params, PROCESO: procesoSeleccionado[0].value})
      
      console.log(resp.data[0])
      setDataStudent(resp.data[0])
      const contenido = `https://front-undac.vercel.app/consultar-estudiante-resumen?ap_pat=${resp.data[0].AP_PATERNO}&ap_mat=${resp.data[0].AP_MATERNO}&nombre=${resp.data[0].NOMBRES}&programa=${resp.data[0].ESCUELA_COMPLETA}&area=${resp.data[0].AREA}&sede_examen=${resp.data[0].SEDE_EXAMEN}&codigo_estudiante=${resp.data[0].DNI}` 
      qrcode.toDataURL(contenido)
        .then(dataURL => setQrDataURL(dataURL))
        .catch(err => console.error(err));
    }
    
    const [qrDataURL, setQrDataURL] = React.useState('');
    React.useEffect(() => {
      obtenerDatosEstudiante({UUID: localStorage.getItem('uuid')})
      console.log('Imgaen', imagenProceso)
      console.log("dataStudent ",dataStudent)
    }, []);
      return (
        dataStudent != null ?
        <div style={styles.pdfViewer}>
      <PDFViewer width="100%" height="100%">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              {parseInt(queryParams.get('f')) === 0 ? '' : <Image src={imagenProceso} style={styles.imagenFondo} />}
            <Image src={`${process.env.REACT_APP_API_URL}/${dataStudent.DNI}/${dataStudent.DNI}.jpeg`}  style={styles.fotoPerfil} />
            
              <View style={styles.containerText}>
                <Text style={styles.text}><Text style={styles.textBold}>APELLIDO PATERNO:</Text> {dataStudent.AP_PATERNO}</Text>
                <Text style={styles.text}><Text style={styles.textBold}>APELLIDO MATERNO:</Text> {dataStudent.AP_MATERNO}</Text>
                <Text style={styles.text}><Text style={styles.textBold}>NOMBRES:</Text> {dataStudent.NOMBRES}</Text>
                <Text style={styles.text}><Text style={styles.textBold}>PROGRAMA:</Text> {dataStudent.ESCUELA_COMPLETA}</Text>
                {/* <Text style={styles.text}>MODALIDAD: {dataStudent .MODALIDAD_ESTUDIANTE}</Text> */}
                <Text style={styles.text}><Text style={styles.textBold}>AREA:</Text> {dataStudent.AREA}</Text>
                <Text style={styles.text}><Text style={styles.textBold}>SEDE EXAMEN:</Text> {dataStudent.SEDE_EXAMEN}</Text>
                <Text style={styles.text}><Text style={styles.textBold}>CODIGO ESTUDIANTE:</Text> {dataStudent.DNI}</Text>
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