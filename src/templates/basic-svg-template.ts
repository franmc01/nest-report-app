import { TDocumentDefinitions } from 'pdfmake/interfaces';
import fs from 'fs';
import { chartJsToImage } from '../helpers/chart-utils';

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

  return await chartJsToImage(chartConfig);
};

export const basicSvgTemplate = async (): Promise<TDocumentDefinitions> => {
  const chart = await generateChartImage();
  return {
    content: [
      {
        svg,
      },
      {
        image: chart,
        width: 200,
      },
    ],
  };
};
