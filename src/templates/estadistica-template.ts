import { TDocumentDefinitions } from 'pdfmake/interfaces';
import {
  ConversionOptions,
  convertToChartEntries,
  generateChart,
} from './charts/donut.chart';
import { headerSection } from './sections/header-section';
import {
  CHART_COLORS,
  NAMED_COLORS,
  transparentize,
} from '../helpers/chart-utils';
import { footerSection } from './sections/footer-section';

interface TopCountry {
  country: string;
  customers: number;
}

interface ReportOptions {
  title?: string;
  subtitle?: string;
  topCountries: TopCountry[];
}

export const estadisticaTemplate = async (options: ReportOptions) => {
  const topCountryConversionOptions: ConversionOptions<TopCountry> = {
    getLabel: (item) => item.country,
    getValue: (item) => item.customers,
  };

  const entries = convertToChartEntries(
    options?.topCountries,
    topCountryConversionOptions,
  );

  const donutChart = await generateChart({
    type: 'doughnut',
    entries,
    position: 'left',
  });

  const lineChart = await generateChart({
    type: 'line',
    entries,
    pointStyle: 'circle',
    pointRadius: 10,
    pointHoverRadius: 15,
    borderColor: NAMED_COLORS.red,
    backgroundColor: transparentize(NAMED_COLORS.red, 0.5),
  });

  const barChart = await generateChart({
    type: 'bar',
    entries,
    borderColor: NAMED_COLORS.orange,
    backgroundColor: transparentize(NAMED_COLORS.orange, 0.5),
  });

  const barChart1 = await generateChart({
    type: 'radar',
    entries,
    borderColor: NAMED_COLORS.purple,
    backgroundColor: transparentize(NAMED_COLORS.purple, 0.5),
  });

  const docDocumentation: TDocumentDefinitions = {
    header: headerSection({
      showDate: true,
      showLogo: true,
      title: 'Estadisticas de clientes',
      subtitle: 'Nest Course',
    }),
    footer: footerSection,
    pageMargins: [40, 100, 40, 60],
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: '10 mejores paises del mundo',
                alignment: 'center',
                bold: true,
                marginBottom: 10,
              },
              {
                image: donutChart,
                width: 300,
              },
            ],
          },
          {
            width: 'auto',
            alignment: 'justify',
            layout: 'lightHorizontalLines',
            table: {
              headerRows: 1,
              widths: [100, 'auto'],
              body: [
                ['Paises', 'Clientes'],
                ...entries.map((e) => [e.label, e.value]),
              ],
            },
          },
        ],
      },
      {
        image: lineChart,
        width: 450,
        alignment: 'center',
        marginTop: 20,
      },
      {
        marginTop: 20,
        columnGap: 10,
        columns: [
          {
            image: barChart,
            width: 250,
          },
          {
            image: barChart1,
            width: 250,
          },
        ],
      },
    ],
  };

  return docDocumentation;
};
