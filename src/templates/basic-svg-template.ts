import { TDocumentDefinitions } from 'pdfmake/interfaces';
import fs from 'fs';
import { CHART_COLORS, chartJsToImage, numbers } from '../helpers/chart-utils';

const svg = fs.readFileSync('src/templates/assets/ford.svg', 'utf-8');

const generateChartImage = async () => {
  const chartConfig = {
    type: 'bar', // Show a bar chart
    data: {
      labels: [2012, 2013, 2014, 2015, 2016], // Set X-axis labels
      datasets: [
        {
          label: 'Users', // Create the 'Users' dataset
          data: [120, 60, 50, 180, 120], // Add data to the chart
        },
      ],
    },
  };

  return await chartJsToImage(chartConfig, {
    f: 'png',
    height: 500,
    width: 500,
  });
};

const generateDoughnutImage = async () => {
  const DATA_COUNT = 5;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        data: numbers(NUMBER_CFG),
        backgroundColor: Object.values(CHART_COLORS),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart',
      },
    },
  };

  return await chartJsToImage(config, {});
};

export const basicSvgTemplate = async (): Promise<TDocumentDefinitions> => {
  const [chart, doughnut] = await Promise.all([
    generateChartImage(),
    generateDoughnutImage(),
  ]);

  return {
    content: [
      {
        svg,
      },
      {
        image: chart,
        width: 200,
      },
      {
        image: doughnut,
        width: 200,
      },
    ],
  };
};
