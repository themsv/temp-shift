import { createFileRoute } from '@tanstack/react-router';
import { Flex, Group, Select, Stack, Text, Title } from '@mantine/core';
import ApexChart from 'react-apexcharts';

export const Route = createFileRoute(
  '/(app)/analyze/$portfolioId/idea-generation/regimes/economic-surprise',
)({
  component: EconomicSurprise,
});

function EconomicSurprise() {
  const series = [
    {
      name: 'Economic Surprise',
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
    chart: {
      type: 'line',
      height: 400,
      toolbar: { show: false },
    },
    stroke: {
      width: 2,
      colors: ['#000'], // black line
    },
    xaxis: {
      type: 'datetime',
      labels: { rotate: -90, rotateAlways: true },
      axisTicks: {
        show: true,
      },
    },
    yaxis: {
      title: {
        text: 'Lorem Ipsum',
      },
    },
    legend: {
      position: 'bottom',
      markers: {
        fillColors: ['#f4d35e', '#90caf9', '#e57373', '#000'],
      },
      customLegendItems: ['Negative', 'Neutral', 'Positive', 'Economic Surprise'],
    },
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
        bottom: 50,
      },
    },
  };
  return (
    <Stack>
      <Title order={4}>Economic Surprise</Title>
      <Group>
        <Text>Select currency/region of Economic Surprise</Text>
        <Select
          size="xs"
          defaultValue="USD"
          data={[
            { label: 'AUD', value: 'AUD' },
            { label: 'G10', value: 'G10' },
            { label: 'APAC', value: 'APAC' },
            { label: 'JPY', value: 'JPY' },
            { label: 'USD', value: 'USD' },
            { label: 'EM', value: 'EM' },
            { label: 'Europe', value: 'Europe' },
            { label: 'China', value: 'China' },
            { label: 'GBP', value: 'GBP' },
          ]}
        />
      </Group>
      <Stack bg="gray.1" gap="xs">
        <ApexChart options={options} series={series} height={480} />
        <Group justify="center">
          {[
            { color: '#f5b7b1', label: 'Negative' },
            { color: '#aed6f1', label: 'Neutral' },
            { color: '#f9e79f', label: 'Positive' },
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
