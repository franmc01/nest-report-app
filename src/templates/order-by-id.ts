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

export interface Order {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: number;
}

interface OrderValues {
  data: Order;
}

export const orderByIdReportTemplate = ({
  data,
}: OrderValues): TDocumentDefinitions => {
  //console.log(JSON.stringify(data, null, 2));

  const subtotal = data.order_details.reduce(
    (acc, detail) => acc + detail.quantity * detail.products.price,
    0,
  );

  const total = subtotal * 1.15;

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
              { text: `Recibo No#: ${data?.order_id}\n`, bold: true },
              `Fecha del recibo: ${DateFormatter.getDDMMMMYYYY(data?.order_date)}\n Pagar antes de: ${DateFormatter.getDDMMMMYYYY(new Date())}`,
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
        text: `Razón Social: Richter Supermarkt\n${data?.customers.customer_name}\nContact: ${data?.customers?.contact_name}`,
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
            ...data.order_details.map((detail) => [
              detail.order_detail_id.toString(),
              detail.products.product_name,
              detail.quantity.toString(),
              {
                text: CurrencyFormatter.formatCurrency(+detail.products.price),
                alignment: 'right',
              },
              {
                text: CurrencyFormatter.formatCurrency(
                  +detail.products.price * detail.quantity,
                ),
                alignment: 'right',
              },
            ]),
          ],
        },
      },

      // Saltos de lineas
      '\n\n',

      // Totales
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormatter.formatCurrency(subtotal),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(total),
                    alignment: 'right',
                    bold: true,
                    fontSize: 16,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
