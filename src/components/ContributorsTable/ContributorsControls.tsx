import { Box, Flex, Group, SegmentedControl, Switch, Text } from '@mantine/core';

interface ContributorsControlsProps {
  checked: boolean;
  setChecked: (value: boolean) => void;
}

export function ContributorsControls({ checked, setChecked }: ContributorsControlsProps) {
  return (
    <Flex justify="space-between" align="center" mb={12}>
      <Group wrap="nowrap" mr={12}>
        <Text fw={500} size="sm">
          Largest Contributors to portfolio's Style Flavor Exposure
        </Text>
        <Box w="auto">
          {' '}
          <SegmentedControl
            fullWidth
            data={[
              { label: 'Positive Contributors', value: 'positive' },
              { label: 'Negative Contributors', value: 'negative' },
            ]}
            radius="md"
            transitionDuration={150}
            color="dark"
            styles={{
              root: {
                border: '1px solid #C0C0C0',
                padding: 2,
                backgroundColor: 'white',
              },
              label: {
                fontSize: 12,
                fontWeight: 400,
                padding: 10,
              },
              control: {
                '&[data-active]': {
                  backgroundColor: '#3d3d3d',
                  color: 'white',
                },
              },
            }}
          />
        </Box>
      </Group>

      <Group gap="xs">
        <Text size="sm">Only show stocks in flavour</Text>
        <Switch
          size="xs"
          withThumbIndicator={false}
          color="blue"
          checked={checked}
          onChange={() => {
            setChecked(!checked);
          }}
        />
      </Group>
    </Flex>
  );
}
