import { useState } from 'react';
import { AgCharts } from 'ag-charts-react';
import type { AgChartOptions } from 'ag-charts-enterprise';
import heatMapData from '../../mocks/heatMapData.json';

const RegimeReturnsHeatMap = () => {
  const [options] = useState<AgChartOptions>({
    tooltip: {
      enabled: false,
    },
    data: heatMapData,
    series: [
      {
        type: 'heatmap',
        xKey: 'flavour',
        yKey: 'econCycle',
        colorKey: 'regimeReturn',
        colorRange: ['#d73027', '#fcbba1', '#ffffff', '#ccebc5', '#1a9850'],
        label: {
          enabled: true,
        },
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        label: {
          rotation: -90,
          autoRotate: false,
          fontSize: 9,
        },
      },
      {
        type: 'category',
        position: 'left',
        label: {
          fontSize: 9,
        },
      },
    ],
    gradientLegend: {
      enabled: false,
    },
  });

  return <AgCharts options={options} />;
};

export default RegimeReturnsHeatMap;
