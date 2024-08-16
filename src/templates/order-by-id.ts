import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { DateFormatter } from '../helpers/date-formatter';
import { footerSection } from './sections/footer-section';
import { CurrencyFormatter } from '../helpers/currency-formatter';

const bannerLogo: Content = {
  image: 'src/templates/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [10, 20],
};
export const orderByIdReportTemplate = (): TDocumentDefinitions => {
  return {
    header: bannerLogo,
    footer: footerSection,
    pageMargins: 60,
    content: [
      // Headers
      {
        text: 'Tucan Code',
        style: {
          fontSize: 18,
          bold: true,
        },
      },

      // Invoice details
      {
        columns: [
          {
            text: `15 Montgomery Str, Suite 100\n Ottawa ON K2Y 9X1, CANADA\n BN: 12783671823\n https://devtalles.com\n`,
            alignment: 'left',
            bold: true,
          },
          {
            text: [
              { text: `Recibo No#: 10255\n`, bold: true },
              `Fecha del recibo: ${DateFormatter.getDDMMMMYYYY(new Date())}\n Pagar antes de: ${DateFormatter.getDDMMMMYYYY(new Date())}`,
            ],
            alignment: 'right',
          },
        ],
        margin: [0, 40, 0, 20],
      },

      // QR
      {
        qr: 'Hello baby',
        alignment: 'right',
        fit: 75,
      },

      // Address
      {
        text: 'Cobrar a:',
        bold: true,
        marginBottom: 16,
      },
      {
        text: `Razón Social: Richter Supermarkt\nMichael Holz\nGrenzacherweg 237`,
      },

      // Details
      {
        layout: 'headerLineOnly',
        marginTop: 20,
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['Id', 'Description', 'Quantity', 'Price', 'Total'],
            [
              10,
              'Producto 1',
              '20',
              {
                text: CurrencyFormatter.formatCurrency(1000),
                alignment: 'right',
              },
              'Total',
            ],
          ],
        },
      },

      // Saltos de lineas
      '\n\n',

      // Totales
    ],
  };
};
