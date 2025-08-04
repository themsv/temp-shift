import Chart from 'react-apexcharts';

import data from '../../mocks/graphData.json';

const seriesData = data.map((item) => ({
  x: item.category,
  y: item.activeExposure,
}));
const regimeSeries = ['Recovery', 'Expansion', 'Slowdown', 'Downturn'].map((regime) => ({
  name: regime,
  type: 'scatter',
  yAxisIndex: 1,
  data: data.map((d) => ({ x: d.category, y: d[regime] })),
}));

const prop = {
  group: {
    groups: [
      { title: 'Value', cols: 8 },
      { title: 'Growth', cols: 7 },
      { title: 'Quality', cols: 4 },
      { title: 'Lossmakers', cols: 4 },
    ],
  },
};
function SkyLine() {
  const state = {
    options: {
      chart: {
        height: 1024,
      },
      plotOptions: {},
      dataLabels: { enabled: false },
      xaxis: {
        type: 'category',
        labels: {
          rotate: -45,
        },
        ...prop,
      },
      yaxis: [
        {
          seriesName: 'ActiveExposure',
          title: {
            text: 'Active Exposure',
          },
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
          },
        },
        {
          seriesName: 'Regime',
          title: {
            text: 'Regimes Returns',
          },
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
          },
          opposite: true,
        },
      ],
      markers: {
        size: 5,
        shape: ['square', 'triangle', 'cross', 'plus', 'diamond'],
      },
    },
    series: [
      {
        name: 'ActiveExposure',
        data: seriesData,
        type: 'bar',
        color: '#80c7fd',
      },
      ...regimeSeries,
    ],
  };
  return <Chart type="bar" options={state.options} series={state.series} width={1024}></Chart>;
}

function HeatmapChart() {
  const categories = data.map((d) => d.category);

  const series = ['Recovery', 'Expansion', 'Slowdown', 'Downturn', 'Active Exposure'].map(
    (key) => ({
      name: key,
      data: data.map((d) => ({
        x: d.category,
        y: key === 'Active Exposure' ? d.activeExposure : d[key],
      })),
    }),
  );

  const options = {
    chart: {
      type: 'heatmap',
      height: 600,
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 1,
        useFillColorAsStroke: false,
        radius: 0,
        colorScale: {
          min: -10,
          max: 10,
          colorStops: [
            {
              from: -10,
              to: 0,
              color: '#f00', // Red for -10
            },

            {
              from: 0,
              to: 10,
              color: '#0fo', // Green for 10
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories,
      // labels: {
      //   rotate: -45,
      // },
    },
    legend: {
      show: true,
      position: 'bottom',
    },
    tooltip: {
      y: {
        formatter: (val: number) => val.toFixed(2),
      },
    },
  };

  return <Chart options={options} series={series} type="heatmap" height={420} />;
}

function BubbleChart() {
  const options = {
    chart: {
      type: 'bubble',
      height: 320,
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      title: { text: 'Style Exposure' },
      min: 0,
      max: 100,
      labels: {
        formatter: (val) => `${val}%`,
      },
    },
    yaxis: {
      title: { text: 'Active Weight' },
      min: -10,
      max: 10,
    },
    fill: {
      type: 'solid',
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val.toFixed(2)}%`,
      },
    },
    colors: undefined, // we'll use custom color logic below
    markers: {
      size: 0,
    },
    plotOptions: {
      bubble: {
        minBubbleRadius: 10,
        maxBubbleRadius: 60,
      },
    },
  };

  const series = [
    {
      name: 'Exposure',
      data: [
        {
          x: 10,
          y: 2,
          z: 20,
          fillColor: 'red',
        },
        {
          x: 30,
          y: 1,
          z: 40,
          fillColor: 'green',
        },
        {
          x: 50,
          y: 2,
          z: 50,
          fillColor: 'green',
        },
        {
          x: 70,
          y: -2,
          z: 60,
          fillColor: 'green',
        },
        {
          x: 90,
          y: -5,
          z: 80,
          fillColor: 'red',
        },
      ],
    },
  ];

  return <Chart options={options} series={series} type="bubble" />;
}

// Utility function to interpolate red-to-green based on value (-10 to 10)
function getColorForValue(value) {
  const percent = (value + 10) / 20; // normalize -10 to 10 into 0 to 1
  const red = Math.round(255 * (1 - percent));
  const green = Math.round(150 + 105 * percent); // green starts from 150
  return `rgb(${red}, ${green}, 100)`;
}

export { BubbleChart, SkyLine, HeatmapChart };
