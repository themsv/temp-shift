import { Text } from '@mantine/core';
import { scaleDiverging, interpolateRdYlGn } from 'd3';

interface HeatmapData {
  id: number;
  flavour: string;
  value: number;
}

const data: HeatmapData[] = [
  { id: 1, flavour: 'High Risk Value', value: -2.5 },
  { id: 2, flavour: 'Value Traps', value: 9.0 },
  { id: 3, flavour: 'Sentiment Value', value: 4.6 },
  { id: 4, flavour: 'Low Risk Value', value: 2.0 },
  { id: 5, flavour: 'High Yield', value: -6.9 },
  { id: 6, flavour: 'Low Risk Yield', value: -6.9 },
  { id: 7, flavour: 'Short Term Growth', value: -8.8 },
  { id: 8, flavour: 'Expensive Growth', value: 7.3 },
  { id: 9, flavour: 'Sentiment Growth', value: 2.0 },
  { id: 10, flavour: 'High Risk Growth', value: 4.2 },
  { id: 11, flavour: 'Growth Traps', value: -9.6 },
  { id: 12, flavour: 'Secular Growth', value: -9.4 },
  { id: 13, flavour: 'Cheap Compounds', value: 6.6 },
  { id: 14, flavour: 'Growth Compounds', value: -5.8 },
  { id: 15, flavour: 'Quad Compounds', value: -6.4 },
  { id: 16, flavour: 'MKT & CFO Lossmakers', value: -6.3 },
  { id: 17, flavour: 'Winner Lossmakers', value: -3.9 },
  { id: 18, flavour: 'Losers Lossmakers', value: 0.5 },
];

const getColor = scaleDiverging(interpolateRdYlGn).domain([-10, 0, 10]);

const ActiveFlavourHeatmap = () => {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '40px',
        paddingRight: '20px',
        gap: '5px',
        width: '100%',
      }}
    >
      <Text size="xs" c="#333333" fz={9} ta="center" w={82} pt={10}>
        Active Flavour Exposure
      </Text>
      <div
        style={{
          maxWidth: '100%',
          width: '100%',
          display: 'flex',
        }}
      >
        {data.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: '1 1 40px',
              backgroundColor: getColor(item.value),
            }}
          >
            <Text size="sm" c="#333333">
              {item.value.toFixed(1)}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveFlavourHeatmap;
