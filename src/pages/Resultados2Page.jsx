import { Button, Table } from 'antd'
import React, { useEffect } from 'react'
import { obtenerDatosResultadosEstudinateTable } from '../api/apiInpputs'
import { Link } from 'react-router-dom'
const rutaImagen ='https://scontent.flim14-1.fna.fbcdn.net/v/t39.30808-6/418468119_903253191801283_273534695499144450_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=llWNvKyn8q8AX972tvi&_nc_oc=AQlZsBc2DAeRQ3XI30fHbjLvhCAcpq7upBDbB1ScchEpctENriSgMyyk6Q24kExTWFY&_nc_ht=scontent.flim14-1.fna&oh=00_AfBokvqFVUwzqJD5WWFw1OoRD-A19lHBJYS69JQMNpgPRA&oe=65D713C0'
const rutaImagen2 = 'https://undac.edu.pe/wp-content/uploads/elementor/thumbs/cropped-undac-otxjxjp3hh6yj3evud6f4g667rmvghjh2tp91gonu8.png'



const Resultados2Page = () => {
    return (
        <div className='tablaResultados' style={{ fontSize: '10px !important' }}>
            <h1 style={{ textAlign: 'center' }}>Resultados</h1>
            <div className="containerResultadoButton" style={{ display: 'flex', gap: '10px', flexDirection: 'column', padding: '40px' }}>
                <Link to="/res-PRIMER"><Button type="primary">PRIMER Y SEGUNDO PUESTO</Button></Link>
                <Link to="/res-TITULOS"><Button type="primary">TITULOS Y GRADUADOS</Button></Link>
                <Link to="/res-TRASLADOSEXTERNOS"><Button type="primary">TRASLADOS EXTERNOS</Button></Link>
                <Link to="/res-TRASLADOSINTERNOS"><Button type="primary">TRASLADOS INTERNOS</Button></Link>
                <Link to="/res-VICTIMAS"><Button type="primary">VICTIMAS DE TERRORISMO Y FAMILIARES</Button></Link>
                <Link to="/res-PERSONAS"><Button type="primary">PERSONAS CON DISCAPACIDAD</Button></Link>
                <Link to="/res-DEPORTISTAS"><Button type="primary">DEPORTISTAS CALIFICADOS</Button></Link>
                <Link to="/res-PUEBLOS"><Button type="primary">PUEBLOS ORIGINARIOS</Button></Link>
            </div>

        </div>
    )
}

const columns =  [
    {
      title: 'DNI',
      dataIndex: 'DNI',
      key: 'DNI',
    },
    {
        title: 'Nombres Completos',
        dataIndex: 'NOMBRE_COMPLETO',
        key: 'NOMBRE_COMPLETO',
      },
      {
        title: 'Carrera',
        dataIndex: 'ESCUELA_COMPLETA',
        key: 'ESCUELA_COMPLETA',
      },
      {
        title: 'Puntaje',
        dataIndex: 'PUNTAJE_TOTAL',
        key: 'PUNTAJE_TOTAL',
      },
      {
        title: 'ESTADO',
        dataIndex: 'ESTADO',
        key: 'ESTADO',
        render: (data, data2) => {
            
            if(data2.ESTADO === 'INGRESO') {
                return <b>INGRESO</b>
            }
            return "NO INGRESO"
            
        }
      },
      {
        title: 'ASISTENCIA',
        dataIndex: 'ASISTENCIA',
        key: 'ASISTENCIA',
      },
      
]

const ResultadoPrimerSegundoPuestoPage = () => {
    
    const [dataTable, setDataTable] = React.useState([])
    const getDataTable = async() => {
        const resp = await obtenerDatosResultadosEstudinateTable(1)
        setDataTable(resp.data)
    }
    useEffect(() => {
        getDataTable()
    },[])
    return (
        <div className='tablaResultados' style={{ fontSize: '10px' }}>
        <div className="containerHeader" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img src={rutaImagen} width={'130px'} height={'100px'}/>
            <h1 style={{ textAlign: 'center' }}>RESULTADOS PRIMER Y SEGUNDO PUESTO</h1>
            <img src={rutaImagen2} width={'110px'} height={'100px'}/>
        </div>
            <Table columns={columns} dataSource={dataTable} pagination={false} pageSize={1000} showSizeChanger={false} ></Table>
        </div>
    )
}

export { ResultadoPrimerSegundoPuestoPage }
const ResultadoTITULOSYGRADUADOSPage = () => {
    
    const [dataTable, setDataTable] = React.useState([])
    const getDataTable = async() => {
        const resp = await obtenerDatosResultadosEstudinateTable(2)
        setDataTable(resp.data)
    }
    useEffect(() => {
        getDataTable()
    },[])
    return (
        <div className='tablaResultados' style={{ fontSize: '10px' }}>
        <div className="containerHeader" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img src={rutaImagen} width={'130px'} height={'100px'}/>
            <h1 style={{ textAlign: 'center' }}>RESULTADOS TITULOS Y GRADUADOS</h1>
            <img src={rutaImagen2} width={'110px'} height={'100px'}/>
        </div>
            <Table columns={columns} dataSource={dataTable} pagination={false} pageSize={1000} showSizeChanger={false} ></Table>
        </div>
    )
}

export { ResultadoTITULOSYGRADUADOSPage }

const ResultadoTRASLADOSEXTERNOSPage = () => {
    
    const [dataTable, setDataTable] = React.useState([])
    const getDataTable = async() => {
        const resp = await obtenerDatosResultadosEstudinateTable(3)
        setDataTable(resp.data)
    }
    useEffect(() => {
        getDataTable()
    },[])
    return (
        <div className='tablaResultados' style={{ fontSize: '10px' }}>
        <div className="containerHeader" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img src={rutaImagen} width={'130px'} height={'100px'}/>
            <h1 style={{ textAlign: 'center' }}>RESULTADOS TRASLADOS EXTERNOS</h1>
            <img src={rutaImagen2} width={'110px'} height={'100px'}/>
        </div>
            <Table columns={columns} dataSource={dataTable} pagination={false} pageSize={1000} showSizeChanger={false} ></Table>
        </div>
    )
}

export { ResultadoTRASLADOSEXTERNOSPage }
const ResultadoTRASLADOSINTERNOSPage = () => {
    
    const [dataTable, setDataTable] = React.useState([])
    const getDataTable = async() => {
        const resp = await obtenerDatosResultadosEstudinateTable(4)
        setDataTable(resp.data)
    }
    useEffect(() => {
        getDataTable()
    },[])
    return (
        <div className='tablaResultados' style={{ fontSize: '10px' }}>
        <div className="containerHeader" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img src={rutaImagen} width={'130px'} height={'100px'}/>
            <h1 style={{ textAlign: 'center' }}>RESULTADOS TRASLADOS INTERNOS</h1>
            <img src={rutaImagen2} width={'110px'} height={'100px'}/>
        </div>
            <Table columns={columns} dataSource={dataTable} pagination={false} pageSize={1000} showSizeChanger={false} ></Table>
        </div>
    )
}

export { ResultadoTRASLADOSINTERNOSPage }
const ResultadoVICTIMASDETERRORISMOYFAMILIARESPage = () => {
    
    const [dataTable, setDataTable] = React.useState([])
    const getDataTable = async() => {
        const resp = await obtenerDatosResultadosEstudinateTable(5)
        setDataTable(resp.data)
    }
    useEffect(() => {
        getDataTable()
    },[])
    return (
        <div className='tablaResultados' style={{ fontSize: '10px' }}>
        <div className="containerHeader" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img src={rutaImagen} width={'130px'} height={'100px'}/>
            <h1 style={{ textAlign: 'center' }}>RESULTADOS VICTIMAS DE TERRORISMO Y FAMILIARES</h1>
            <img src={rutaImagen2} width={'110px'} height={'100px'}/>
        </div>
            <Table columns={columns} dataSource={dataTable} pagination={false} pageSize={1000} showSizeChanger={false} ></Table>
        </div>
    )
}

export { ResultadoVICTIMASDETERRORISMOYFAMILIARESPage }

const ResultadoPERSONASCONDISCAPACIDADPage = () => {
    
    const [dataTable, setDataTable] = React.useState([])
    const getDataTable = async() => {
        const resp = await obtenerDatosResultadosEstudinateTable(6)
        setDataTable(resp.data)
    }
    useEffect(() => {
        getDataTable()
    },[])
    return (
        <div className='tablaResultados' style={{ fontSize: '10px' }}>
        <div className="containerHeader" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img src={rutaImagen} width={'130px'} height={'100px'}/>
            <h1 style={{ textAlign: 'center' }}>RESULTADOS PERSONAS CON DISCAPACIDAD</h1>
            <img src={rutaImagen2} width={'110px'} height={'100px'}/>
        </div>
            <Table columns={columns} dataSource={dataTable} pagination={false} pageSize={1000} showSizeChanger={false} ></Table>
        </div>
    )
}

export { ResultadoPERSONASCONDISCAPACIDADPage }

const ResultadoDEPORTISTASCALIFICADOSPage = () => {
    
    const [dataTable, setDataTable] = React.useState([])
    const getDataTable = async() => {
        const resp = await obtenerDatosResultadosEstudinateTable(7)
        setDataTable(resp.data)
    }
    useEffect(() => {
        getDataTable()
    },[])
    return (
        <div className='tablaResultados' style={{ fontSize: '10px' }}>
        <div className="containerHeader" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img src={rutaImagen} width={'130px'} height={'100px'}/>
            <h1 style={{ textAlign: 'center' }}>RESULTADOS DEPORTISTAS CALIFICADOS</h1>
            <img src={rutaImagen2} width={'110px'} height={'100px'}/>
        </div>
            <Table columns={columns} dataSource={dataTable} pagination={false} pageSize={1000} showSizeChanger={false} ></Table>
        </div>
    )
}

export { ResultadoDEPORTISTASCALIFICADOSPage }

const ResultadoPUEBLOSORIGINARIOSPage = () => {
    
    const [dataTable, setDataTable] = React.useState([])
    const getDataTable = async() => {
        const resp = await obtenerDatosResultadosEstudinateTable(8)
        setDataTable(resp.data)
    }
    useEffect(() => {
        getDataTable()
    },[])
    return (
        <div className='tablaResultados' style={{ fontSize: '10px' }}>
            <div className="containerHeader" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src={rutaImagen} width={'130px'} height={'100px'}/>
                <h1 style={{ display: 'inline-block',textAlign: 'center' }}>RESULTADOS PUEBLOS ORIGINARIOS</h1>
                <img src={rutaImagen2} width={'110px'} height={'100px'}/>
            </div>
            <Table columns={columns} dataSource={dataTable} pagination={false} pageSize={1000} showSizeChanger={false} ></Table>
        </div>
    )
}

export { ResultadoPUEBLOSORIGINARIOSPage }

export default Resultados2Page