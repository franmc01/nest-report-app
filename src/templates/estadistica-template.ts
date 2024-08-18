import { TDocumentDefinitions } from 'pdfmake/interfaces';
import {
  ConversionOptions,
  convertToChartEntries,
  generateChart,
} from './charts/donut.chart';

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

  const docDocumentation: TDocumentDefinitions = {
    content: [
      {
        image: donutChart,
        width: 300,
      },
    ],
  };

  return docDocumentation;
};
