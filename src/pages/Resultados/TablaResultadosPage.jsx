import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerResultadosPorCarreraYProcesoService } from '../../api/resultadosGeneralesService';
const columns = [
  {
    title: 'CODIGO',
    dataIndex: 'CODIGO',
    key: '1',
  },
  {
    title: 'NOMBRE COMPLETO',
    dataIndex: 'NOMBRE_COMPLETO',
    key: '2',
  },
  {
    title: 'CARRERA',
    dataIndex: 'ESCUELA_COMPLETA',
    key: '3',
  },
  {
    title: 'PUNTAJE',
    dataIndex: 'PUNT_T',
    key: '4',
  },
  {
    title: 'OBSERVACION',
    dataIndex: 'EST_1OPCION',
    key: '5',
  },
]
const TablaResultadosPage = () => {
  const { id, nombre } = useParams()
  const [data, setData] = useState() 
  const obtenerResultado = async () => {
    const resp = await obtenerResultadosPorCarreraYProcesoService(id)
    if(resp.status === 200 && resp.data) {
  
      setData(resp.data)
    }
  }
  useEffect(() => {
    obtenerResultado()
  },[])
  return (
    <>
    <div className="tablaResultadosPage">
      <div className="containerResultadosTabla">
        <h1>TABLA DE RESULTADOS: <b>{nombre}</b></h1>
        <div className="containerTable"></div>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 30 }} scroll={{ x: 800  }} />
      </div>
    </div>
    </>
  )
}

export default TablaResultadosPage