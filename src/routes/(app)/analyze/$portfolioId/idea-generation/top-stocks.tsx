import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Group, Tabs } from '@mantine/core';
import Selectable from '@app/components/SingleSelectCombobox/Select';
import TopStocks from '@app/components/FlavoursTable/flavours';
import FlavourFactorDropdown from './route';

export const Route = createFileRoute('/(app)/analyze/$portfolioId/idea-generation/top-stocks')({
  component: RouteComponent,
});
const options = ['All universe', 'Universe 1', 'Universe 3'];

function RouteComponent() {
  const [value, setValue] = useState<string>('');
  const selectedLabel = value || 'Universe (None)';
  return (
    <Tabs.Panel value="top-stocks" pt="md">
      <Group mb={20}>
        <FlavourFactorDropdown />
        <Selectable
          data={options}
          setValue={setValue}
          selectedLabel={selectedLabel}
          value={value}
        />
      </Group>

      <TopStocks />
    </Tabs.Panel>
  );
}
