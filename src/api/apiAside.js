// import axios from 'axios'

const getRutas = () => {
  return [
    {
      nombre: 'Procesos',
      ruta: '/dashboard/procesos',
      icon: 'BookFilled',
    },
    {
      nombre: 'Vacantes',
      ruta: '/dashboard/vacantes',
      icon: 'DiffFilled',
    },
    {
      nombre: 'Carreras',
      ruta: '/dashboard/carreras',
      icon: 'SnippetsFilled',
    },
    {
      nombre: 'Voucher',
      ruta: '/dashboard/vouchers',
      icon: 'SnippetsFilled',
    },
    {
      nombre: 'Estudiantes',
      ruta: '/dashboard/estudiantes',
      icon: 'SnippetsFilled',
    },
    {
      nombre: 'Inscritos',
      ruta: '/dashboard/inscritos',
      icon: 'SnippetsFilled',
    },
    {
      nombre: 'Resultados',
      ruta: '/dashboard/resultados',
      icon: 'SnippetsFilled',
    },
    {
      nombre: 'Aulas',
      ruta: '/dashboard/aulas',
      icon: 'SnippetsFilled',
    },
    {
      nombre: 'Cordinadores',
      ruta: '/dashboard/cordinadores',
      icon: 'SnippetsFilled',
    },
    {
      nombre: 'Constancias',
      ruta: '/dashboard/constancias',
      icon: 'SnippetsFilled',
    },
  ];
};

export { getRutas };
