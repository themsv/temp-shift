import Chart from 'react-apexcharts';

function BubbleChart() {
  const series = [
    {
      name: 'Bubbles',
      data: [
        { x: 10, y: 2, z: 120, fillColor: '#1ABC9C' },
        { x: 20, y: -2, z: 225, fillColor: '#F5B7B1' },
        { x: 40, y: 1, z: 140, fillColor: '#76D7C4' },
        { x: 50, y: -5, z: 150, fillColor: '#E74C3C' },
        { x: 60, y: 2, z: 160, fillColor: '#17A589' },
        { x: 70, y: -4, z: 155, fillColor: '#EC7063' },
        { x: 85, y: -3, z: 250, fillColor: '#922B21' },
        { x: 90, y: 2, z: 290, fillColor: '#138D75' },
      ],
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bubble',
      height: 350,
      toolbar: { show: false },
    },
    xaxis: {
      title: { text: 'Style Exposure' },
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        formatter: (val) => `${val}%`,
        rotate: 0, // horizontal alignment
        style: { fontSize: '12px' },
        show: false,
      },
    },
    yaxis: {
      title: { text: 'Active Weight', offsetX: 15 },
      min: -6,
      max: 3,
      tickAmount: 9,
      labels: {
        formatter: (val: number) => {
          if ([-6, -4, -2, 0, 1, 2, 3].includes(val)) return val.toString();
          return '';
        },
        style: { fontSize: '12px' },
      },
      axisBorder: { show: true, color: '#000' },
      axisTicks: { show: true, color: '#000' },
    },
    grid: {
      borderColor: '#ddd',
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
    stroke: {
      width: 1,
      colors: ['#000000'],
    },
    dataLabels: { enabled: false },
    plotOptions: {
      bubble: {
        minBubbleRadius: 5,
        maxBubbleRadius: 50,
      },
    },
    fill: {
      opacity: 0.8,
    },
    colors: series[0].data.map((d) => d.fillColor),

    annotations: {
      yaxis: [
        {
          y: 0,
          borderColor: '#000000',
          strokeDashArray: 0,
        },
      ],
      points: [
        {
          x: 20,
          y: 0,
          marker: { size: 0 },
          label: {
            text: '20%',
            offsetY: 30,
            style: { background: '#fff', color: '#000', fontSize: '12px' },
          },
        },
        {
          x: 40,
          y: 0,
          marker: { size: 0 },
          label: {
            text: '40%',
            offsetY: 30,
            style: { background: '#fff', color: '#000', fontSize: '12px' },
          },
        },
        {
          x: 60,
          y: 0,
          marker: { size: 0 },
          label: {
            text: '60%',
            offsetY: 30,
            style: { background: '#fff', color: '#000', fontSize: '12px' },
          },
        },
        {
          x: 80,
          y: 0,
          marker: { size: 0 },
          label: {
            text: '80%',
            offsetY: 30,
            style: { background: '#fff', color: '#000', fontSize: '12px' },
          },
        },
        {
          x: 100,
          y: 0,
          marker: { size: 0 },
          label: {
            text: '100%',
            offsetY: 30,
            offsetX: -30,
            style: { background: '#fff', color: '#000', fontSize: '12px' },
          },
        },
      ],
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="bubble" height={400} />
    </div>
  );
}

export { BubbleChart };
