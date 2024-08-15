import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header-section';
import { countries } from '@prisma/client';
import { footerSection } from './sections/footer-section';

interface ReportOptions {
  title?: string;
  subtitle?: string;
  countries: countries[];
}
export const getCountriesReportTemplate = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { title, subtitle, countries } = options;
  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ?? 'Countries report',
      subtitle: subtitle ?? 'List of countries',
    }),
    footer: footerSection,
    pageMargins: [40, 100, 40, 60],
    content: [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [50, 50, 50, '*', '*', '*'],

          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
            ...countries.map((country) => [
              country.id.toString(),
              country.iso2,
              country.iso3,
              { text: country.name, bold: true },
              country.continent,
              country.local_name,
            ]),
          ],
        },
      },
      {
        text: 'Totales',
        style: {
          fontSize: 18,
          bold: true,
          margin: [0, 40, 0, 0],
        },
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: [50, 50, 50, '*', '*', '*'],
          body: [
            [
              {
                text: 'Total del paises',
                bold: true,
                colSpan: 3,
              },
              {},
              {},
              {},
              {
                text: countries.length.toString(),
                bold: true,
              },
              {},
            ],
          ],
        },
      },
    ],
  };
};
