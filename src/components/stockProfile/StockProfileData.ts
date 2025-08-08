export const data = [
  {
    value: 'Factor',
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinction',
  },
  {
    value: 'Models',
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinction',
  },
  {
    value: 'Observations',
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinction',
  },
];

function getRandomValue() {
  return (Math.random() * 118 - 20).toFixed(1) + '%'; // -20 to 98
}

export const tableGroups = [
  {
    group: 'Value',
    rows: [
      {
        factor: 'Deep Value',
        value1: getRandomValue(),
        value2: getRandomValue(),
        value3: getRandomValue(),
      },
      {
        factor: 'High Risk Value',
        value1: getRandomValue(),
        value2: getRandomValue(),
        value3: getRandomValue(),
      },
      {
        factor: 'Low Risk Value',
        value1: getRandomValue(),
        value2: getRandomValue(),
        value3: getRandomValue(),
      },
      {
        factor: 'High Yield',
        value1: getRandomValue(),
        value2: getRandomValue(),
        value3: getRandomValue(),
      },
      {
        factor: 'Sentiment Value',
        value1: getRandomValue(),
        value2: getRandomValue(),
        value3: getRandomValue(),
      },
    ],
  },
  {
    group: 'Growth',
    rows: [
      {
        factor: 'Deep Value',
        value1: getRandomValue(),
        value2: getRandomValue(),
        value3: getRandomValue(),
      },
      {
        factor: 'High Risk Value',
        value1: getRandomValue(),
        value2: getRandomValue(),
        value3: getRandomValue(),
      },
      {
        factor: 'Low Risk Value',
        value1: getRandomValue(),
        value2: getRandomValue(),
        value3: getRandomValue(),
      },
      {
        factor: 'High Yield',
        value1: getRandomValue(),
        value2: getRandomValue(),
        value3: getRandomValue(),
      },
    ],
  },
  {
    group: 'Quality',
    rows: [
      {
        factor: 'Deep Value',
        value1: getRandomValue(),
        value2: getRandomValue(),
        value3: getRandomValue(),
      },
      {
        factor: 'High Risk Value',
        value1: getRandomValue(),
        value2: getRandomValue(),
        value3: getRandomValue(),
      },
      {
        factor: 'Low Risk Value',
        value1: getRandomValue(),
        value2: getRandomValue(),
        value3: getRandomValue(),
      },
      {
        factor: 'High Yield',
        value1: getRandomValue(),
        value2: getRandomValue(),
        value3: getRandomValue(),
      },
    ],
  },
  {
    group: 'Loss-Makers',
    rows: [
      {
        factor: 'Deep Value',
        value1: getRandomValue(),
        value2: getRandomValue(),
        value3: getRandomValue(),
      },
      {
        factor: 'High Risk Value',
        value1: getRandomValue(),
        value2: getRandomValue(),
        value3: getRandomValue(),
      },
      {
        factor: 'Low Risk Value',
        value1: getRandomValue(),
        value2: getRandomValue(),
        value3: getRandomValue(),
      },
      {
        factor: 'High Yield',
        value1: getRandomValue(),
        value2: getRandomValue(),
        value3: getRandomValue(),
      },
    ],
  },
];

export const flavourExposures = [
  {
    label: 'Value',
    exposures: ['#4cc9b0', '#bce6e5', '#4cc9b0', '#ffeaea', '#4cc9b0', '#4cc9b0'],
  },
  {
    label: 'Quality Comp.',
    exposures: ['#ff6f69', '#ff6f69', '#ff495c'],
  },
  {
    label: 'Lossmakers',
    exposures: [null, null, '#ffeaea', '#ff495c'],
  },
  {
    label: 'Short Term Growth',
    exposures: ['#ffeaea', '#ff495c', '#ff6f69', '#ff6f69', '#ff495c', '#ff6f69'],
  },
];

export const elements = [
  { position: 'Low Risk Yield', mass: '12%', name: '1%' },
  { position: 'High Yield', mass: '49%', name: '5%' },
  { position: 'Deep value', mass: '62%', name: '77%' },
  { position: 'Sentiment Value', mass: '37%', name: '56%' },
  { position: 'Low risk yield', mass: '6%', name: '23%' },
];
