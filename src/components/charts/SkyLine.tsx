import { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Paper, Text, Breadcrumbs } from '@mantine/core';
import { BubbleChart } from './BubbleChart';

interface TooltipData {
  category: string;
  value: number;
}
interface CategoryGroup {
  name: string;
  items: string[];
}

interface ChartData {
  categories: string[] | CategoryGroup[];
}
interface Group {
  title: string;
  cols: number;
}
type SeriesData = {
  name: string;
  data: (number | null | undefined)[];
  type?: 'column' | 'scatter';
  color?: string;
};

type DataPoint = {
  category: string;
  value: number;
  series: number;
};

interface SkyLineProps {
  data: DataPoint[];
}
interface AxisResult {
  isGrouped: boolean;
  flatCategories: string[];
  groups: string[][];
}

function buildAxis(data: ChartData | undefined) {
  const cats = data?.categories || [];
  const isGrouped = Array.isArray(cats) && typeof cats[0] === 'object' && !!cats[0]?.items;
  const flatCategories = isGrouped
    ? (cats as CategoryGroup[]).flatMap((g) => g.items)
    : (cats as string[]);
  const groups = isGrouped
    ? (cats as CategoryGroup[]).map((g) => ({
        title: g.name,
        cols: g.items.length,
      }))
    : undefined;
  return { isGrouped, flatCategories, groups };
}

function buildGroupBoundaryAnnotations(flatCategories: string[], groups: Group[] | undefined) {
  if (!groups || !groups.length) return [];

  const annotations: {
    x: string;
    borderColor: string;
    strokeDashArray: number;
    opacity: number;
    label: { show: boolean };
  }[] = [];

  let cursor = 0;
  for (let i = 0; i < groups.length; i++) {
    const cols = groups[i].cols;
    if (i !== 0) {
      const leftCat = flatCategories[cursor] as string | undefined;
      if (leftCat) {
        annotations.push({
          x: leftCat,
          borderColor: '#B8C2CC',
          strokeDashArray: 0,
          opacity: 1,
          label: { show: false },
        });
      }
    }
    cursor += cols;
  }
  return annotations;
}

function computeYExtents(series: SeriesData[], catCount: number): { yMin: number; yMax: number } {
  const vals: number[] = [];

  series.forEach((s) => {
    if (!Array.isArray(s.data)) return;
    for (let i = 0; i < Math.min(catCount, s.data.length); i++) {
      const v = s.data[i];
      if (typeof v === 'number' && Number.isFinite(v)) {
        vals.push(v);
      }
    }
  });

  const hasData = vals.length > 0;
  const rawMin = hasData ? Math.min(...vals) : -1;
  const rawMax = hasData ? Math.max(...vals) : 1;
  const min0 = Math.min(rawMin, 0);
  const max0 = Math.max(rawMax, 0);
  const span = Math.max(1e-6, max0 - min0);
  const pad = span * 0.1;
  return { yMin: min0 - pad, yMax: max0 + pad };
}

function SkyLine({ data }: SkyLineProps) {
  const [tooltipData, setTooltipData] = useState<TooltipData>({
    category: '',
    value: 0,
  });
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [chartMode, setChartMode] = useState<'skyline' | 'bubble'>('skyline');
  const [bubbleCategory, setBubbleCategory] = useState<string | null>(null);
  const [tooltipLocked, setTooltipLocked] = useState(false);
  const { isGrouped, flatCategories, groups } = useMemo(() => buildAxis(data), [data]);
  const chartRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const groupBoundaryAnnotations = useMemo(
    () => buildGroupBoundaryAnnotations(flatCategories, groups),
    [flatCategories, groups],
  );
  const safeSeries = useMemo<SeriesData[]>(() => {
    const series: SeriesData[] = (data?.series ?? []) as SeriesData[];
    return series.map((s, idx) => {
      const type: 'column' | 'scatter' = idx === 0 ? 'column' : 'scatter';
      const arr: number[] = Array.isArray(s.data) ? s.data : [];
      const aligned =
        flatCategories.length && arr.length !== flatCategories.length
          ? arr.slice(0, flatCategories.length)
          : arr;
      return {
        ...s,
        type,
        data: aligned,
      };
    });
  }, [data?.series, flatCategories.length]);

  const { yMin, yMax } = useMemo(
    () => computeYExtents(safeSeries, flatCategories.length),
    [safeSeries, flatCategories.length],
  );
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        tooltipLocked &&
        chartRef.current &&
        !chartRef.current.contains(e.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setTooltipLocked(false);
        setTooltipData(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tooltipLocked]);

  const handleBarClick = useCallback((event: MouseEvent, category?: string) => {
    if (chartRef.current) {
      const chartRect = chartRef.current.getBoundingClientRect();
      const offsetX = event.clientX - chartRect.left;
      const offsetY = event.clientY - chartRect.top;
      // Always place tooltip slightly to the right of the click position
      setTooltipPos({
        x: offsetX, // 15px right offset
        y: offsetY, // vertical offset
      });

      // If category is passed, it means it's a bar click → switch to bubble chart
      // if (category) {
      setBubbleCategory(category);
      setChartMode('bubble');
      // }
    }
  }, []);
  const groupConfig = useMemo(
    () => (isGrouped ? { style: { fontSize: '13px', fontWeight: 700 }, groups } : { groups: [] }),
    [isGrouped, groups],
  );

  const strokeWidths = useMemo(() => safeSeries.map((_, i) => (i === 0 ? 0 : 0)), [safeSeries]);

  const options = useMemo(
    () => ({
      chart: {
        type: 'line',
        height: 520,
        events: {
          dataPointMouseEnter: function (event, _, { seriesIndex, dataPointIndex }) {
            if (tooltipLocked) return;
            const category = flatCategories[dataPointIndex];
            const value = safeSeries[seriesIndex]?.data[dataPointIndex];
            setTooltipData({ category, value });
            setTooltipPos({ x: event.clientX - 80, y: event.clientY - 250 });
          },
          dataPointMouseLeave: function () {
            if (!tooltipLocked) setTooltipData(null);
            setTooltipLocked(false);
          },
          dataPointSelection: function (event, _, { seriesIndex, dataPointIndex }) {
            const category = flatCategories[dataPointIndex];
            const value = safeSeries[seriesIndex]?.data[dataPointIndex];
            setTooltipData({ category, value });
            setTooltipPos({ x: event.clientX - 80, y: event.clientY - 250 });
            setTooltipLocked(true); // keep tooltip after click
            const e = config.event as MouseEvent;
            handleBarClick(e);
          },
        },
        stacked: false,
        toolbar: { show: true },
      },

      grid: {
        padding: { bottom: isGrouped ? 14 : 10, left: 12, right: 12 },
        yaxis: { lines: { show: false } },
        xaxis: { lines: { show: false } },
      },
      annotations: {
        xaxis: [
          {
            x: 0,
            borderColor: '#B8C2CC',
            strokeDashArray: 0,
            opacity: 1,
            label: { show: false },
          },
        ],
        yaxis: [
          { y: 0, borderColor: '#B8C2CC', strokeDashArray: 0, opacity: 1, label: { show: false } },
          {
            y: 15,
            borderColor: '#B8C2CC',
            strokeDashArray: 0,
            opacity: 1,
            label: { show: false },
          },
        ],
      },
      plotOptions: { bar: { columnWidth: '80%' } },
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
        active: {
          filter: {
            type: 'none',
          },
        },
      },
      dataLabels: { enabled: false },
      stroke: { width: strokeWidths },
      markers: {
        size: safeSeries.map((_, i) => (i === 0 ? 0 : 6)),
        shape: safeSeries.map((_, i) => {
          if (i === 1) return 'diamond';
          if (i === 2) return 'circle';
          if (i === 3) return 'triangle';
          if (i === 4) return 'square';
          return 'circle';
        }),
        hover: { size: 7 },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        floating: false,
        itemMargin: {
          horizontal: 15,
          vertical: 5,
        },
      },
      colors: ['#aacef9', '#007859', '#80a66d', '#f67a87', '#a41e2f'],
      xaxis: {
        categories: flatCategories,
        tickPlacement: 'between',
        axisTicks: { show: true },
        axisBorder: { show: true, /*color: '#B8C2CC',*/ height: 2 },
        labels: { rotate: -45, trim: false, style: { fontSize: '12px' } },
        group: groupConfig,
      },
      yaxis: [
        {
          min: -15,
          seriesName: 'Active Exposure ',
          max: 15,
          title: {
            text: 'Active Exposure %(Blue bars)',
            style: {
              fontWeight: 'normal',
              fontSize: '12px',
            },
          },
          labels: {
            labels: { formatter: (v) => `${v}` },
          },
        },
        {
          seriesName: 'Regimes Returns',
          opposite: true,
          min: -3,
          max: 3,
          title: {
            text: 'Average Monthly Excess Returns % (Regimes Returns)',
            style: {
              fontWeight: 'normal',
              fontSize: '12px',
            },
            rotate: 90,
          },
          labels: {
            labels: { formatter: (v) => `${v}` },
          },
          axisBorder: {
            show: true,
          },
        },
      ],
      tooltip: {
        enabled: false,
        shared: true,
        intersect: false,
        y: { formatter: (v) => v.toFixed(2) },
      },
    }),
    [
      isGrouped,
      flatCategories,
      groupBoundaryAnnotations,
      groupConfig,
      safeSeries,
      strokeWidths,
      yMin,
      yMax,
      tooltipLocked,
    ],
  );

  if (chartMode === 'bubble') {
    return (
      <div style={{ cursor: 'pointer' }}>
        <Breadcrumbs>
          <Text
            onClick={() => {
              setChartMode('skyline');
            }}
          >
            Asx Quality Growth
          </Text>
          <Text>
            {tooltipData.category} (Active Exposure - {tooltipData.value}%){' '}
          </Text>
        </Breadcrumbs>
        <BubbleChart category={bubbleCategory} />
      </div>
    );
  }
  return (
    <div style={{ position: 'relative' }} ref={chartRef}>
      <style>{`
        .apexcharts-legend-group-vertical {
    flex-direction: row !important;
}
      `}</style>
      <Chart
        key={isGrouped ? 'grouped' : 'flat'}
        options={options}
        series={safeSeries}
        type="line"
        height={520}
      />
      {tooltipData && tooltipPos && (
        <Paper
          ref={tooltipRef}
          shadow="md"
          p="sm"
          style={{
            position: 'absolute',
            left: tooltipPos.x,
            top: tooltipPos.y,
            background: '#fff',
            border: '1px solid #ccc',
            padding: '6px 8px',
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            zIndex: 10,
            pointerEvents: 'auto',
          }}
        >
          <Text
            weight={500}
            style={{ cursor: 'pointer', color: '#007BFF' }}
            onClick={() => {
              handleBarClick(tooltipData.category);
            }}
          >
            {tooltipData.category}
          </Text>
          <Text size="sm">{tooltipData.category}</Text>
          <Text size="sm">Value: {tooltipData.value}</Text>
        </Paper>
      )}
    </div>
  );
}

export { SkyLine };
