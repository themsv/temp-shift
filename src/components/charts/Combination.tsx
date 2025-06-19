/* eslint-disable @typescript-eslint/restrict-plus-operands */

/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { useRef, useEffect } from 'react';
import { ActionIcon, Group, Select, Stack } from '@mantine/core';
import { IconDownload, IconEye } from '@tabler/icons-react';
import * as d3 from 'd3';

import mockData from '../../mocks/graphData.json';

interface Contributor {
  symbol: string;
  name: string;
}

interface TooltipDatum {
  name: string;
  value: number;
  activeExposure: string;
  topContributors: Contributor[];
  bottomContributors: Contributor[];
}

type RegimeKey = 'Recovery' | 'Expansion' | 'Slowdown' | 'Downturn';

interface DataPoint {
  category: string;
  activeExposure: number;
  regimes: Record<RegimeKey, number>;
}

const shapeColors: Record<RegimeKey, string> = {
  Recovery: '#007859',
  Expansion: '#80a66d',
  Slowdown: '#f67a87',
  Downturn: '#a41e2f',
};

const shapeTypes: Record<RegimeKey, string> = {
  Recovery: 'diamond',
  Expansion: 'circle',
  Slowdown: 'triangle',
  Downturn: 'square',
};

const tooltipData: TooltipDatum[] = [
  {
    name: 'High Risk Value',
    value: -6,
    activeExposure: '6%',
    topContributors: [
      { symbol: 'ABC AU', name: 'ABC Inc...' },
      { symbol: 'IAG AU', name: 'Insurance Aus...' },
      { symbol: 'AMG AU', name: 'Amcor Plc' },
    ],
    bottomContributors: [
      { symbol: 'ABC AU', name: 'ABC Inc...' },
      { symbol: 'IAG AU', name: 'Insurance Aus...' },
      { symbol: 'AMG AU', name: 'Amcor Plc' },
    ],
  },
  {
    name: 'Value Traps',
    value: -3,
    activeExposure: '3%',
    topContributors: [],
    bottomContributors: [],
  },
  {
    name: 'Growth Traps',
    value: 4,
    activeExposure: '4%',
    topContributors: [],
    bottomContributors: [],
  },
  {
    name: 'Quality Compounders',
    value: 2,
    activeExposure: '2%',
    topContributors: [],
    bottomContributors: [],
  },
];

const GroupedScatterBarChart = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = containerRef.current?.clientWidth ?? 1000;

    const height = 520;

    svg.attr('viewBox', `0 0 ${width} ${height}`);
    const margin = { top: 30, right: 60, bottom: 120, left: 60 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const categories = mockData.map((d) => d.category);
    const regimeKeys = Object.keys(shapeTypes);

    const yLeft = d3.scaleLinear().domain([-15, 15]).range([innerHeight, 0]);
    const yRight = d3.scaleLinear().domain([-3, 3]).range([innerHeight, 0]);
    const x = d3.scaleBand().domain(categories).range([0, innerWidth]).padding(0.3);

    g.append('g').call(d3.axisLeft(yLeft).ticks(6));
    g.append('g')
      .attr('transform', `translate(${innerWidth}, 0)`)
      .call(d3.axisRight(yRight).ticks(5));
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 50)
      .attr('x', -innerHeight / 2)
      .attr('dy', '-1.5em')
      .style('text-anchor', 'middle')
      .style('font-size', '10px')
      .text('Active Exposure % (Blue bars)');
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', innerWidth + margin.right - 40)
      .attr('x', -innerHeight / 2)
      .attr('dy', '1.5em')
      .style('text-anchor', 'middle')
      .style('font-size', '10px')
      .text('Average Monthly Excess Returns % (Regime Value)');
    g.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(x).tickFormat((d) => d.split(' ').join('\n')))
      .selectAll('text')
      .attr('transform', 'rotate(270)')
      .style('text-anchor', 'end')
      .attr('dy', '0')
      .attr('font-size', '10px')
      .attr('y', 0)
      .attr('dx', '-10px');

    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('background', 'white')
      .style('border', '1px solid #ccc')
      .style('padding', '10px')
      .style('display', 'none')
      .style('font-size', '12px');

    g.selectAll('.bar')
      .data(mockData)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.category) ?? 0)
      .attr('y', (d) => yLeft(Math.max(0, d.activeExposure)))
      .attr('height', (d) => Math.abs(yLeft(d.activeExposure) - yLeft(0)))
      .attr('width', x.bandwidth())
      .attr('fill', '#aacef9')
      .attr('opacity', 0.8)
      .on('mouseover', (event: MouseEvent, d: DataPoint) => {
        const details = tooltipData.find((t) => t.name === d.category);
        if (!details) return;

        let html = `<strong>${details.name}</strong><br/>Active Exposure: ${details.activeExposure}`;
        if (details.topContributors.length > 0) {
          html +=
            '<br/><br/><u>Top Contributors</u><ul>' +
            details.topContributors.map((c) => `<li>${c.symbol} - ${c.name}</li>`).join('') +
            '</ul>';
        }
        if (details.bottomContributors.length > 0) {
          html +=
            '<u>Bottom Contributors</u><ul>' +
            details.bottomContributors.map((c) => `<li>${c.symbol} - ${c.name}</li>`).join('') +
            '</ul>';
        }

        tooltip
          .html(html)
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px')
          .style('display', 'block');
      })
      .on('mouseout', () => {
        tooltip.style('display', 'none');
      });
    g.selectAll('.bar-line')
      .data(mockData)
      .enter()
      .append('line')
      .attr('x1', (d) => (x(d.category) ?? 0) + x.bandwidth())
      .attr('x2', (d) => (x(d.category) ?? 0) + x.bandwidth())
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1);

    mockData.forEach((d) => {
      const cx = (x(d.category) ?? 0) + x.bandwidth() / 2;

      regimeKeys.forEach((key) => {
        const regimeKey = key as RegimeKey;
        const value = d.regimes[regimeKey];
        const cy = yRight(value);

        const shape = shapeTypes[regimeKey];
        const color = shapeColors[regimeKey];

        let path: string | null | undefined;

        if (shape === 'circle') {
          g.append('circle').attr('cx', cx).attr('cy', cy).attr('r', 5).attr('fill', color);
        } else if (shape === 'diamond') {
          path = d3.symbol().type(d3.symbolDiamond).size(80)();
        } else if (shape === 'square') {
          g.append('rect')
            .attr('x', cx - 5)
            .attr('y', cy - 5)
            .attr('width', 10)
            .attr('height', 10)
            .attr('fill', color);
        } else if (shape === 'triangle') {
          path = d3.symbol().type(d3.symbolTriangle).size(80)();
        }

        if (typeof path === 'string') {
          g.append('path')
            .attr('d', path)
            .attr('transform', `translate(${cx},${cy})`)
            .attr('fill', color);
        }
      });
    });
    const legend = svg
      .append('g')
      .attr('transform', `translate(${width / 2 - 250},  ${margin.top - 30})`);

    regimeKeys.forEach((key, i) => {
      const regimeKey = key as RegimeKey;
      const xOffset = i * 100;
      legend
        .append('text')
        .attr('x', xOffset + 20)
        .attr('y', 10)
        .text(key)
        .style('alignment-baseline', 'middle');

      const shape = shapeTypes[regimeKey];
      const color = shapeColors[regimeKey];

      let path: string | undefined | null;

      if (shape === 'circle') {
        legend
          .append('circle')
          .attr('cx', xOffset + 10)
          .attr('cy', 10)
          .attr('r', 5)
          .attr('fill', color);
      } else if (shape === 'diamond') {
        path = d3.symbol().type(d3.symbolDiamond).size(80)();
      } else if (shape === 'square') {
        legend
          .append('rect')
          .attr('x', xOffset + 5)
          .attr('y', 5)
          .attr('width', 10)
          .attr('height', 10)
          .attr('fill', color);
      } else if (shape === 'triangle') {
        path = d3.symbol().type(d3.symbolTriangle).size(80)();
      }

      if (typeof path === 'string') {
        legend
          .append('path')
          .attr('d', path)
          .attr('transform', `translate(${xOffset + 10}, 10)`)
          .attr('fill', color);
      }
    });
  }, [containerRef]);

  const handleDownload = () => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    const canvas = document.createElement('canvas');
    canvas.width = svg.clientWidth;
    canvas.height = svg.clientHeight;

    const ctx = canvas.getContext('2d');
    const img = new Image();

    const svgBlob = new Blob([`<?xml version="1.0" encoding="UTF-8"?>\n` + svgString], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Draw white background
        ctx.drawImage(img, 0, 0); // Draw the SVG over it
        URL.revokeObjectURL(url);

        const pngFile = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `my-chart-${Date.now()}.png`;
        link.href = pngFile;
        link.click();
      }
    };

    img.onerror = (err) => {
      console.error('Image load error', err);
    };

    img.src = url;
  };

  return (
    <Stack ref={containerRef}>
      <Group justify="flex-end">
        <ActionIcon variant="transparent" color="black" onClick={handleDownload}>
          <IconDownload />
        </ActionIcon>
        <IconEye />
        <Select data={[{ label: 'US Eco Cycle', value: '701' }]} defaultValue="701" maw="144" />
      </Group>
      <svg ref={svgRef} width={containerRef.current?.clientWidth} height={520}></svg>
    </Stack>
  );
};

export default GroupedScatterBarChart;
