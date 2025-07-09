import { createFileRoute } from '@tanstack/react-router';
import { Stack, Tabs } from '@mantine/core';
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';
import { InvalidHoldings, ValidHoldings } from '@app/components/portfolio/HoldingsTable';

export const Route = createFileRoute('/(app)/portfolio/create/$portfolioId/corrections')({
  component: HoldingCorrections,
});

const CORRECTION_TABS = [
  {
    label: 'Errors',
    value: 'invalid',
    icon: <IconCircleX color="red" />,
  },
  {
    label: 'Mapped',
    value: 'valid',
    icon: <IconCircleCheck color="green" />,
  },
];
function HoldingCorrections() {
  return (
    <Stack>
      <Tabs defaultValue="invalid">
        <Tabs.List>
          {CORRECTION_TABS.map((tab) => (
            <Tabs.Tab key={tab.value} value={tab.value} leftSection={tab.icon}>
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Tabs.Panel value="invalid" w="100%">
          <InvalidHoldings />
        </Tabs.Panel>
        <Tabs.Panel value="valid" w="100%">
          <ValidHoldings />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
