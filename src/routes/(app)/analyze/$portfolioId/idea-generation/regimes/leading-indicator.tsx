import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Flex, Group, Select, Stack, Text, Title } from '@mantine/core';
import ApexChart from 'react-apexcharts';

export const Route = createFileRoute(
  '/(app)/analyze/$portfolioId/idea-generation/regimes/leading-indicator',
)({
  component: LeadingIndicator,
});

function LeadingIndicator() {
  const [region, setRegion] = useState('USA');

  const series = [
    {
      name: `OECD LI - ${region}`,
      data: [
        [new Date('2001-04-01').getTime(), 99],
        [new Date('2002-04-01').getTime(), 100],
        [new Date('2003-04-01').getTime(), 101],
        [new Date('2004-04-01').getTime(), 102],
        [new Date('2005-04-01').getTime(), 101],
        [new Date('2006-04-01').getTime(), 103],
        [new Date('2008-04-01').getTime(), 98],
        [new Date('2009-04-01').getTime(), 95],
        [new Date('2010-04-01').getTime(), 99],
        [new Date('2015-04-01').getTime(), 101],
        [new Date('2020-04-01').getTime(), 96],
        [new Date('2024-04-01').getTime(), 100],
      ],
    },
  ];

  const options = {
    chart: { type: 'area', toolbar: { show: false } },
    stroke: { curve: 'smooth', width: 3, colors: ['black'] },
    markers: { size: 0 },
    xaxis: {
      type: 'datetime',
      labels: { rotate: -90, rotateAlways: true },
      axisTicks: {
        show: true,
      },
    },
    yaxis: { min: 80, max: 120, title: { text: `OECD LI - ${region}` } },
    annotations: {
      xaxis: regimes.map((r) => ({
        x: new Date(r.start).getTime(),
        x2: new Date(r.end).getTime(),
        fillColor: r.color,
        opacity: 0.6,
      })),
    },
    grid: {
      padding: {
        bottom: 20,
      },
    },
  };

  return (
    <Stack>
      <Title order={4}>OECD Leading Indicator & Economic Regimes</Title>
      <Group>
        <Text>Select Region for OECD Leading Indicator</Text>
        <Select
          size="xs"
          value={region}
          data={[
            { label: 'World', value: 'World' },
            { label: 'Australia', value: 'Australia' },
            { label: 'USA*', value: 'USA' },
            { label: 'China', value: 'China' },
            { label: 'Japan', value: 'Japan' },
            { label: 'G20', value: 'G20' },
            { label: 'Asia Major 5*', value: 'AsiaMajor5' },
            { label: '4 Major Europe', value: '4MajorEurope' },
            { label: 'UK', value: 'UK' },
            { label: 'India', value: 'India' },
          ]}
          onChange={(value) => {
            setRegion(value ?? 'USA');
          }}
        />
      </Group>
      <Stack bg="gray.1" gap="xs">
        <ApexChart options={options} series={series} height={480} />
        <Group justify="center">
          {[
            { color: '#f9e79f', label: 'Recovery' },
            { color: '#aed6f1', label: 'Expansion' },
            { color: '#d5dbdb', label: 'Slowdown' },
            { color: '#f5b7b1', label: 'Downturn' },
          ].map((item) => (
            <Flex key={item.label} align="center" gap="sm">
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 12,
                  backgroundColor: item.color,
                }}
              />
              {item.label}
            </Flex>
          ))}
        </Group>
      </Stack>
    </Stack>
  );
}

const regimes = [
  { start: '2001-04-01', end: '2002-02-01', color: '#f9e79f', label: 'Recovery' },
  { start: '2002-02-01', end: '2002-09-01', color: '#aed6f1', label: 'Expansion' },
  { start: '2002-09-01', end: '2003-03-01', color: '#f5b7b1', label: 'Downturn' },
  { start: '2003-03-01', end: '2004-01-01', color: '#f9e79f', label: 'Recovery' },
  { start: '2004-01-01', end: '2004-09-01', color: '#aed6f1', label: 'Expansion' },
  { start: '2004-09-01', end: '2005-04-01', color: '#f5b7b1', label: 'Downturn' },
  { start: '2005-04-01', end: '2006-01-01', color: '#aed6f1', label: 'Expansion' },
  { start: '2006-01-01', end: '2006-06-01', color: '#f9e79f', label: 'Recovery' },
  { start: '2006-06-01', end: '2007-01-01', color: '#aed6f1', label: 'Expansion' },
  { start: '2007-01-01', end: '2009-06-01', color: '#d5dbdb', label: 'Slowdown' },
  { start: '2009-06-01', end: '2010-02-01', color: '#f9e79f', label: 'Recovery' },
  { start: '2010-02-01', end: '2011-01-01', color: '#aed6f1', label: 'Expansion' },
  { start: '2011-01-01', end: '2011-06-01', color: '#d5dbdb', label: 'Slowdown' },
  { start: '2011-06-01', end: '2012-03-01', color: '#f5b7b1', label: 'Downturn' },
  { start: '2012-03-01', end: '2013-01-01', color: '#f9e79f', label: 'Recovery' },
  { start: '2013-01-01', end: '2013-06-01', color: '#aed6f1', label: 'Expansion' },
  { start: '2013-06-01', end: '2014-01-01', color: '#f5b7b1', label: 'Downturn' },
  { start: '2014-01-01', end: '2014-09-01', color: '#f9e79f', label: 'Recovery' },
  { start: '2014-09-01', end: '2015-02-01', color: '#aed6f1', label: 'Expansion' },
  { start: '2015-02-01', end: '2016-01-01', color: '#d5dbdb', label: 'Slowdown' },
  { start: '2016-01-01', end: '2016-07-01', color: '#f9e79f', label: 'Recovery' },
  { start: '2016-07-01', end: '2017-03-01', color: '#aed6f1', label: 'Expansion' },
  { start: '2017-03-01', end: '2018-01-01', color: '#f5b7b1', label: 'Downturn' },
  { start: '2018-01-01', end: '2018-09-01', color: '#f9e79f', label: 'Recovery' },
  { start: '2018-09-01', end: '2019-06-01', color: '#aed6f1', label: 'Expansion' },
  { start: '2019-06-01', end: '2020-04-01', color: '#f5b7b1', label: 'Downturn' },
  { start: '2020-04-01', end: '2020-10-01', color: '#d5dbdb', label: 'Slowdown' },
  { start: '2020-10-01', end: '2021-07-01', color: '#f9e79f', label: 'Recovery' },
  { start: '2021-07-01', end: '2022-01-01', color: '#aed6f1', label: 'Expansion' },
  { start: '2022-01-01', end: '2023-01-01', color: '#f5b7b1', label: 'Downturn' },
  { start: '2023-01-01', end: '2023-09-01', color: '#f9e79f', label: 'Recovery' },
  { start: '2023-09-01', end: '2024-04-01', color: '#aed6f1', label: 'Expansion' },
];
