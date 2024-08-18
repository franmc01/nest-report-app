import { chartJsToImage } from '../../helpers/chart-utils';

interface ChartEntry {
  label: string;
  value: number;
}

interface ChartOptions {
  entries: ChartEntry[];
  position?: 'left' | 'right' | 'top' | 'bottom';
  type: 'doughnut' | 'bar' | 'line';
}

export interface ConversionOptions<T> {
  getLabel: (item: T) => string;
  getValue: (item: T) => number;
}

export const convertToChartEntries = <T>(
  data: T[],
  options: ConversionOptions<T>,
): ChartEntry[] => {
  const { getLabel, getValue } = options;
  return data.map((item) => ({
    label: getLabel(item),
    value: getValue(item),
  }));
};
export const generateChart = async (options: ChartOptions) => {
  const { entries, position, type } = options;

  const data = {
    labels: entries.map((entry) => entry.label),
    datasets: [
      {
        label: 'Dataset 1',
        data: entries.map((entry) => entry.value),
      },
    ],
  };

  const config = {
    type,
    data,
    options: {
      responsive: true,
      legend: {
        position,
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
