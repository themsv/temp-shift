/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useRef } from 'react';
import { ActionIcon, Group, Select, Stack, Text } from '@mantine/core';
import { IconDownload, IconEye } from '@tabler/icons-react';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import BubbleData from '../../mocks/BuubleChartData.json';

interface BubbleDataTypes {
  name: string;
  exposure: number;
  weight: number;
  contribution: number;
  styleExp: number;
}
interface BubbleChartProps {
  handleBackClick?: () => void;
}

const BubbleChart = ({ handleBackClick }: BubbleChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const svgEl = svgRef.current;
    const container = containerRef.current;
    const data: BubbleDataTypes[] = BubbleData as BubbleDataTypes[];
    if (!svgEl || !container) return;

    const width = container.clientWidth || 1000;
    const height = 500;
    const margin = { top: 40, right: 40, bottom: 60, left: 80 };

    const svg = select(svgEl);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const tooltip = select(container)
      .append('div')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', 'white')
      .style('border', '1px solid #ccc')
      .style('padding', '6px 10px')
      .style('font-size', '14px')
      .style('border-radius', '4px')
      .style('box-shadow', '0 0 6px rgba(0,0,0,0.1)')
      .style('z-index', '1000');

    const x = scaleLinear()
      .domain([0, 100])
      .range([margin.left, width - margin.right]);
    const y = scaleLinear()
      .domain([-10, 10])
      .range([height - margin.bottom, margin.top]);
    const size = scaleLinear().domain([0, 100]).range([5, 60]);

    const colorScale = (exp: number, weight: number) => {
      if (weight < 0) {
        if (exp <= 20) return '#FFACB5';
        else if (exp <= 40) return '#EE485A';
        else if (exp <= 60) return '#EE485A';
        else if (exp <= 80) return '#A41E2F';
        else return '#A41E2F';
      } else {
        if (exp <= 20) return '#5EDFBE';
        else if (exp <= 40) return '#97EBD4';
        else if (exp <= 60) return '#19BB93';
        else if (exp <= 80) return '#049875';
        else return '#049875';
      }
    };

    const grid = svg.append('g').attr('class', 'grid');

    grid
      .selectAll('line.x')
      .data(x.ticks(6))
      .join('line')
      .attr('x1', (d) => x(d))
      .attr('x2', (d) => x(d))
      .attr('y1', margin.top)
      .attr('y2', height - margin.bottom)
      .attr('stroke', '#ccc')
      .attr('stroke-dasharray', '4');

    grid
      .selectAll('line.y')
      .data(y.ticks(10))
      .join('line')
      .attr('x1', margin.left)
      .attr('x2', width - margin.right)
      .attr('y1', (d) => y(d))
      .attr('y2', (d) => y(d))
      .attr('stroke', '#ccc')
      .attr('stroke-dasharray', '4');

    svg
      .append('line')
      .attr('x1', margin.left)
      .attr('x2', width - margin.right)
      .attr('y1', y(0))
      .attr('y2', y(0))
      .attr('stroke', 'black')
      .attr('stroke-width', 2);

    svg
      .append('g')
      .attr('transform', `translate(0,${y(0)})`)
      .call(
        axisBottom(x)
          .tickValues([20, 40, 60, 80, 100])
          .tickFormat((d) => `${d.valueOf()}%`),
      )
      .selectAll('text')
      .style('font-size', '14px')
      .style('fill', '#333')
      .attr('dy', '1.5em');

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(axisLeft(y).tickValues([-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]))
      .selectAll('text')
      .style('font-size', '14px')
      .style('fill', '#333');

    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height - 16)
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .text('Style Exposure');

    svg
      .append('text')
      .attr('transform', `rotate(-90)`)
      .attr('y', 24)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .text('Active Weight');

    svg
      .append('g')
      .attr('class', 'bubbles')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => x(d.exposure))
      .attr('cy', (d) => y(d.weight))
      .attr('r', (d) => size(d.exposure))
      .attr('fill', (d) => colorScale(d.exposure, d.weight))
      .on('mouseover', function (_event, d: BubbleDataTypes) {
        tooltip.style('visibility', 'visible').html(`
            <div style="font-weight: 200; font-size: 14px; margin-bottom: 6px;">${d.name}</div>
            <div style="padding: 6px 10px; font-size: 12px; border: 1px solid #ddd; border-radius: 6px; background: #fff;">
              <div style="display: flex; justify-content: space-between; min-width: 160px;">
                <span style="flex: 1;">% Contribution</span><span style="text-align: right;">${d.contribution}%</span>
              </div>
              <div style="display: flex; justify-content: space-between; min-width: 160px;">
                <span style="flex: 1;">Active Weight</span><span style="text-align: right;">${d.weight}%</span>
              </div>
              <div style="display: flex; justify-content: space-between; min-width: 160px;">
                <span style="flex: 1;">Style Flav. Exp.</span><span style="text-align: right;">${d.styleExp}%</span>
              </div>
            </div>
          `);
      })
      .on('mousemove', function (event: MouseEvent) {
        tooltip
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px')
          .style('display', 'block');
      })

      .on('mouseout', function () {
        tooltip.style('visibility', 'hidden');
      });

    return () => {
      tooltip.remove();
    };
  }, []);
  const handleDownload = () => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `chart-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Stack ref={containerRef} w="100%">
      <Group justify="space-between" wrap="wrap" align="center" gap="xs">
        <Group gap="xs" style={{ fontSize: 10, fontWeight: 400, cursor: 'pointer' }}>
          <Text onClick={handleBackClick}>ASX Quality Growth</Text>
          <Text>›</Text>
          <Text>High Risk Value (Active Exposure - 6.2%)</Text>
        </Group>
        <Group gap="xs">
          <ActionIcon variant="transparent" color="black" onClick={handleDownload}>
            <IconDownload />
          </ActionIcon>
          <ActionIcon variant="transparent" color="black">
            <IconEye />
          </ActionIcon>
          <Select data={[{ label: 'US Eco Cycle', value: '701' }]} defaultValue="701" maw={144} />
        </Group>
      </Group>
      <svg ref={svgRef} width={containerRef.current?.clientWidth} height={500} />
    </Stack>
  );
};

export default BubbleChart;
