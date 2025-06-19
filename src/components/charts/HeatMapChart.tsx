import { Group, Text, Stack } from '@mantine/core';
import ActiveFlavourHeatmap from './ActiveFlavourHeatMap';
import RegimeReturnsHeatMap from './RegimeReturnsHeatMap';

const HeatMapChart = () => {
  return (
    <Group>
      <Text c="dimmed" size="sm" style={{ writingMode: 'sideways-lr' }}>
        Regime Return (%)
      </Text>
      <Stack w="90%" gap={0} mt={30}>
        <ActiveFlavourHeatmap />
        <RegimeReturnsHeatMap />
      </Stack>
    </Group>
  );
};

export default HeatMapChart;
