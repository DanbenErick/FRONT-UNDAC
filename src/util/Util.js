import * as XLSX from 'xlsx';
export const formatDateUtil = (date) => {
  date = new Date(date)
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};
export const formatOnlyYear = (date) => {
  date = new Date(date)
  const yyyy = date.getFullYear();
  return `${yyyy}`;
};

export const utilGenerarExcel = (datos, ancho_cols) => {
  
  const sheet = XLSX.utils.json_to_sheet(datos);
  sheet['!cols'] = []
  ancho_cols.forEach(e => {
    sheet['!cols'].push({ wch: e })
  })

  // sheet['!cols'] = [
  //   { wch: 30 },
  //   { wch: 20 },
  //   { wch: 25 },
  //   { wch: 25 },
  //   { wch: 25 },
  //   { wch: 25 },
  //   { wch: 40 },
  //   { wch: 90 }
  // ];

  // Crear un libro de trabajo y agregar la hoja
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, 'INFORMACION :)');

  

  // Crear un buffer para guardar el archivo Excel
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  // Crear un Blob a partir del buffer
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Crear un objeto URL a partir del Blob
  const url = URL.createObjectURL(blob);

  // Crear un enlace <a> para descargar el archivo automáticamente
  const link = document.createElement('a');
  link.href = url;
  link.download = `${Date.now().toString()}.xlsx`;

  // Simular clic en el enlace para iniciar la descarga
  link.click();

  // Liberar el objeto URL creado
  URL.revokeObjectURL(url);
}