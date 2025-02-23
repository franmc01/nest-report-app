import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { employmentLetterStyles } from './styles/employmentLetterStyles';
import { headerSection } from './sections/header-section';

export const employmentLetterTemplateNormal = () => {
  const docDocumentation: TDocumentDefinitions = {
    pageMargins: 60,
    header: headerSection({
      showDate: true,
      showLogo: true,
    }),
    content: [
      {
        text: 'Constancia de empleo',
        style: 'header',
      },
      {
        text: 'Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa], por medio de la presente certifico que [Nombre del Empleado] ha sido empleado en nuestra empresa desde el [Fecha de Inicio del Empleado].',
        style: 'paragraph',
      },
      {
        text: 'Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.',
        style: 'paragraph',
      },
      {
        text: 'La jornada laboral del Sr./ Sra. [Nombre del Empleado] es de [Número de Horas] horas semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y procedimientos establecidos por la empresa.',
        style: 'paragraph',
      },
      {
        text: 'Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.',
        style: 'paragraph',
      },
      {
        text: `Atentamente,\n
          [Nombre del Empleador]\n [Cargo del Empleador]\n [Nombre de la Empresa]\n [Fecha de Emisión]\n`,
        style: 'signature',
      },
    ],
    footer: {
      text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
      style: 'footer',
    },
    styles: employmentLetterStyles,
  };

  return docDocumentation;
};
