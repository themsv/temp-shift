import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Group, SegmentedControl, Tabs } from '@mantine/core';
import { IconBookmark, IconColumns3 } from '@tabler/icons-react';
import Selectable from '@app/components/SingleSelectCombobox/Select';
import StockScreening from '@app/components/StockScreening/stock-screening';

export const Route = createFileRoute('/(app)/analyze/$portfolioId/idea-generation/screening')({
  component: RouteComponent,
});

const options = ['All universe', 'Universe 1', 'Universe 3'];

function RouteComponent() {
  const [value, setValue] = useState<string>('');
  const selectedLabel = value || 'Universe (None)';
  return (
    <Tabs.Panel value="screening" pt="md">
      <Group mb={10}>
        <Selectable
          data={options}
          setValue={setValue}
          selectedLabel={selectedLabel}
          value={value}
          radius={10}
        />

        <SegmentedControl
          fullWidth
          data={[
            { label: 'Binary Flav.', value: 'positive' },
            { label: 'Flavor Exp.', value: 'negative' },
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
        <Group style={{ marginLeft: 'auto' }} gap="sm">
          <IconBookmark size={24} />
          <IconColumns3 size={24} />
        </Group>
      </Group>

      <StockScreening />
    </Tabs.Panel>
  );
}
