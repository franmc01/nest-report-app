import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { chartJsToImage } from '../helpers/chart-utils';

interface TopCountry {
  country: string;
  customers: number;
}

interface ReportOptions {
  title?: string;
  subtitle?: string;
  topCountries: TopCountry[];
}

const generateTopCountry = async (topCountries: TopCountry[]) => {
  const data = {
    labels: topCountries.map((c) => c.country),
    datasets: [
      {
        label: 'Dataset 1',
        data: topCountries.map((c) => c.customers),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      legend: {
        position: 'left',
      },
      plugins: {
        datalabels: {
          color: 'white',
          font: {
            weight: 'bold',
            size: 14,
          },
        },
      },
    },
  };

  return await chartJsToImage(config, {});
};

export const estadisticaTemplate = async (options: ReportOptions) => {
  const donutChart = await generateTopCountry(options.topCountries);

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
