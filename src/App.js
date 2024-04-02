import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/Login/LoginPage';
import DashboardPage from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';
import RegisterPage from './pages/Register/RegisterPage';
import ProcesosPage from './pages/Procesos/ProcesosPage';
import VacantesPage from './pages/Vacantes/VacantesPage';
import CarreraPage from './pages/Carreras/CarrerasPage';
import InscripcionEstudiantePage from './pages/InscripcionEstudiante/InscripcionEstudiantePage';
import DashboardEstudiantes from './pages/DashboardEstudiantes/DashboardEstudiantes';
import HomeDashEstudinte from './pages/DashboardEstudiantes/PagesDashboardEstudiantes/HomeDashEstudiantes';
import InscripcionDashboardEstudiante from './pages/DashboardEstudiantes/PagesDashboardEstudiantes/InscripcionDashEstudiantes';

import esES from 'antd/locale/es_ES';
import { ConfigProvider } from 'antd';
import './App.css';
import { AuthProvider } from './providers/AuthProvider';
import { Navigate } from 'react-router-dom';
import { EstudianteProvider } from './providers/EstudianteProvider';
import VoucherPage from './pages/Voucher/VoucherPage';
import EstudiantesPage from './pages/Estudiantes/EstudiantesPage';
import InscritoPage from './pages/Inscritos/InscritosPage';
import ResultadosAdmPage from './pages/ResultadosAdm/ResultadosAdm';
import AulasPage from './pages/Aulas/AulasPage';
import LoginEstudiantePage from './pages/LoginEstudiante/LoginEstudiante';
import TestpsicologicoPage from './pages/DashboardEstudiantes/PagesDashboardEstudiantes/TestpsicologicoPage';
import PagosEstudiantePage from './pages/DashboardEstudiantes/PagesDashboardEstudiantes/PagosPage';
import InscripcionEstraordinarioPage from './pages/DashboardEstudiantes/PagesDashboardEstudiantes/InscripcionExtraordinarioPage';
import InscripcionModalidadesPage from './pages/DashboardEstudiantes/PagesDashboardEstudiantes/InscripcionModalidadesPage';
import InscripcionOdinarioPage from './pages/DashboardEstudiantes/PagesDashboardEstudiantes/InscripcionOrdinarioPage';
import ResultadoPage from './pages/Resultados/ResultadosPage';
import CarreraResultadoPage from './pages/Resultados/CarrerasResultadoPage';
import TablaResultadosPage from './pages/Resultados/TablaResultadosPage';
import HojaEstudianteIngresoPage from './pages/HojaEstudianteIngresoPage';
import PadronEstudianteAulaPDF from './pages/PadronEstudianteAula';
import Resultados2Page, { ResultadoDEPORTISTASCALIFICADOSPage, ResultadoPERSONASCONDISCAPACIDADPage, ResultadoPUEBLOSORIGINARIOSPage, ResultadoPrimerSegundoPuestoPage, ResultadoTITULOSYGRADUADOSPage, ResultadoTRASLADOSEXTERNOSPage, ResultadoTRASLADOSINTERNOSPage, ResultadoVICTIMASDETERRORISMOYFAMILIARESPage } from './pages/Resultados2Page';
import CordinadoresPage from './pages/Cordinadores/CordinadoresPage';
import InscripcionPostgrado from './pages/DashboardEstudiantes/PagesDashboardEstudiantes/InscripcionPostgrado';
import ConstanciaPage from './pages/Constancias/ConstaciaPage';
import ConstanciaQRPage from './pages/ConstanciaQRPage/ConstanciaQRPage';

const App = () => {
  return (
    <AuthProvider>
      <ConfigProvider locale={esES}>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/login-estudiante" element={<ProtectedLoginRegister><LoginEstudiantePage /></ProtectedLoginRegister>} />
              <Route
                path="/login"
                element={
                  <ProtectedLoginRegister>
                    <LoginPage />
                  </ProtectedLoginRegister>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedLoginRegister>
                    <LoginPage />
                  </ProtectedLoginRegister>
                }
              />
              <Route
                path="/register"
                element={
                  <ProtectedLoginRegister>
                    <RegisterPage />
                  </ProtectedLoginRegister>
                }
              />
              <Route
                path="/inscripcion"
                element={
                  <EstudianteProvider>
                    {/* <h1>Inscripciones cerradas</h1> */}
                    <InscripcionEstudiantePage />
                  </EstudianteProvider>
                }
              />

              <Route
                path="/dashboard-estudiantes/*"
                element={
                  <PrivateRoute>
                    <DashboardEstudiantes />
                  </PrivateRoute>
                }>
                <Route path="" element={<HomeDashEstudinte />} />
                <Route path="home" element={<HomeDashEstudinte />} />
                <Route path="inscripcion-cepre" element={<InscripcionDashboardEstudiante />}/>
                <Route path="inscripcion-ordinario" element={<InscripcionOdinarioPage />}/>
                <Route path="inscripcion-modalidad" element={<InscripcionModalidadesPage />}/>
                <Route path="inscripcion-extraordinario" element={<InscripcionEstraordinarioPage />}/>
                <Route path="inscripcion-postgrado" element={<InscripcionPostgrado />}/>
                <Route path="test-psicologico" element={<TestpsicologicoPage />}/>
                <Route path="pagos" element={<PagosEstudiantePage />}/>
              </Route>
              <Route
                path="/dashboard/*"
                element={
                  <PrivateRoute>
                    <DashboardPage />{' '}
                  </PrivateRoute>
                }
              >
                <Route path="procesos" element={<ProcesosPage className="content" />}/>
                <Route path="vacantes" element={<VacantesPage />} />
                <Route path="carreras" element={<CarreraPage />} />
                <Route path="vouchers" element={<VoucherPage />} />
                <Route path="estudiantes" element={<EstudiantesPage />} />
                <Route path="inscritos" element={<InscritoPage />} />
                <Route path="resultados" element={<ResultadosAdmPage />} />
                <Route path="aulas" element={<AulasPage />} />
                <Route path="cordinadores" element={<CordinadoresPage />} />
                <Route path="constancias" element={<ConstanciaPage />} />
              </Route>
              <Route path="/resultados" element={<ResultadoPage />} />
              <Route path='/resultados-lis-carreras/:nombre/:id' element={<CarreraResultadoPage />} />
              <Route path='/tabla-resultado/:id/:nombre' element={<TablaResultadosPage />} />
              <Route path='/generar-pdf/:uuid?' Component={HojaEstudianteIngresoPage} />
              <Route path='/generar-padron-daras' Component={PadronEstudianteAulaPDF} />
              <Route path='/resultados2' Component={Resultados2Page} />

              <Route path='/res-PRIMER' Component={ResultadoPrimerSegundoPuestoPage} />
              <Route path='/res-TITULOS' Component={ResultadoTITULOSYGRADUADOSPage} />
              <Route path='/res-TRASLADOSEXTERNOS' Component={ResultadoTRASLADOSEXTERNOSPage} />
              <Route path='/res-TRASLADOSINTERNOS' Component={ResultadoTRASLADOSINTERNOSPage} />
              <Route path='/res-VICTIMAS' Component={ResultadoVICTIMASDETERRORISMOYFAMILIARESPage} />
              <Route path='/res-PERSONAS' Component={ResultadoPERSONASCONDISCAPACIDADPage} />
              <Route path='/res-DEPORTISTAS' Component={ResultadoDEPORTISTASCALIFICADOSPage} />
              <Route path='/res-PUEBLOS' Component={ResultadoPUEBLOSORIGINARIOSPage} />
              
              <Route path='/constacias-ingreso' Component={ConstanciaQRPage} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </ConfigProvider>
    </AuthProvider>
  );
};
const ProtectedLoginRegister = ({ children }) => {
  const user = localStorage.getItem('token');
  const rol = localStorage.getItem('rol')
  if( user !== null) {
    if(rol === 'ADMIN_DARAS'){
      return <Navigate to="/dashboard-estudiantes" />
    } 
    if(rol === 'ESTUDIANTE'){
      return <Navigate to="/dashboard-estudiantes" />
    }
  }
  return children
  
  // children
};
const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('token');

  return user != null ? <>{children}</> : <Navigate to="/login" />;
};

export default App;
