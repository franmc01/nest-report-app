import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { employmentLetterStyles } from './styles/employmentLetterStyles';
import { headerSection } from './sections/header-section';
import { DateFormatter } from '../helpers/date-formatter';

interface ReportValues {
  employerName: string;
  employerPosition: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: Date;
  employeeHours: number;
  employeeWorkSchedule: string;
  employerCompany: string;
}

export const employmentLetterTemplateById = (values: ReportValues) => {
  const {
    employerName,
    employerPosition,
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeHours,
    employeeWorkSchedule,
    employerCompany,
  } = values;

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
        text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormatter.getDDMMMMYYYY(employeeStartDate)}.`,
        style: 'paragraph',
      },
      {
        text: `Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.`,
        style: 'paragraph',
      },
      {
        text: `La jornada laboral del Sr./ Sra.  ${employeeName} es de ${employeeHours} horas semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa.`,
        style: 'paragraph',
      },
      {
        text: 'Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.',
        style: 'paragraph',
      },
      {
        text: `Atentamente,\n
          ${employerName}\n ${employerPosition}\n ${employerCompany}\n ${DateFormatter.getDDMMMMYYYY(new Date())}\n`,
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
