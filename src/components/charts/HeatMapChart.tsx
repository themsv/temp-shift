import { useMemo } from 'react';
import Chart, { ApexOptions } from 'react-apexcharts';

interface HeatmapData {
  categories: (string | { items: string[] })[];
  series: { name: string; data: number[] }[];
}

interface HeatmapChartProps {
  data?: HeatmapData;
}

function HeatmapChart({ data }: HeatmapChartProps) {
  if (!data?.categories) {
    return <p>No data available for this tab.</p>;
  }

  const categories =
    typeof data.categories[0] === 'object'
      ? (data.categories as { items: string[] }[]).flatMap((c) => c.items)
      : (data.categories as string[]);

  const rowOrder = ['Active Flavour Exposure', 'Recovery', 'Expansion', 'Slowdown', 'Downturn'];

  const orderedSeries = rowOrder
    .map((name) => {
      const seriesItem = data.series.find((s) => s.name === name);
      return seriesItem
        ? {
            name,
            data: seriesItem.data.map((val, idx) => ({
              x: categories[idx],
              y: val,
            })),
          }
        : null;
    })
    .filter(Boolean);

  const allValues = orderedSeries.flatMap((s) => s.data.map((d) => Number(d.y) || 0));
  const hardMax = Math.ceil(Math.max(10, ...allValues.map((n) => Math.abs(n))));

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'heatmap',
        height: 560,
        toolbar: { show: true },
        animations: { enabled: false },
      },
      grid: {
        padding: { left: 16, right: 16, top: 0, bottom: 0 },
        borderColor: '#f0f0f0',
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          radius: 2,
          enableShades: true,
          colorScale: {
            min: -hardMax,
            max: hardMax,
            ranges: [
              { from: -hardMax, to: -5, color: '#460416' },

              { from: -5, to: -2, color: '#D6535E' },
              { from: -2, to: 0, color: '#F7C6C8' },
              { from: 0, to: 2, color: '#E7F4F3' },
              { from: 2, to: 5, color: '#97EAD6' },
              { from: 6, to: 10, color: '#005442' },
              { from: 10, to: hardMax, color: '#007F73' },
            ],
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number | { value: number } | null): string => {
          if (val == null) return '';
          return typeof val === 'number' ? val.toFixed(1) : '';
        },
        style: {
          colors: ['#202020'],
          fontSize: '12px',
          fontWeight: 500,
        },
      },
      xaxis: {
        categories,
        labels: {
          rotate: -90,
          style: { fontSize: '12px', fontWeight: 500 },
        },
        axisTicks: { show: false },
        axisBorder: { show: false },
      },
      yaxis: {
        reversed: true,
        title: {
          text: 'Regime Return (%)',
          offsetX: 12,
          style: { fontSize: '14px', fontWeight: 600 },
        },
        categories: rowOrder.map((row) =>
          row === 'Active Flavour Exposure' ? 'Active Flavour\nExposure' : row,
        ),
        labels: {
          style: {
            fontSize: '14px',
            fontWeight: 400,
            whiteSpace: 'pre-line',
            lineHeight: '18px', // control height between lines
          },
          offsetY: 0,
          formatter: (val: string | number): string => String(val),
        },
      },
      legend: { show: false },
      tooltip: {
        y: {
          formatter: (val?: number): string => (val != null ? val.toFixed(1) : ''),
        },
      },
      stroke: { show: true, width: 2, colors: ['#ffffff'] },
    }),
    [categories, hardMax, rowOrder],
  );

  return (
    <>
      <style>
        {`
          .apexcharts-yaxis-label {
            transition: transform 0.2s ease;
          }
          .apexcharts-yaxis-label:has(text:contains("Recovery")) {
            transform: translateY(10px) !important;
          }
        `}
      </style>
      <Chart
        options={options}
        series={orderedSeries as ApexAxisChartSeries}
        type="heatmap"
        height={460}
      />
    </>
  );
}
export { HeatmapChart };
