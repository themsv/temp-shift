import { createFileRoute } from '@tanstack/react-router';
import { Group, Stack, Tabs } from '@mantine/core';
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';
import { InvalidHoldings, ValidHoldings } from '@app/components/portfolio/HoldingsTable';
import { CustomButtonLink } from '@app/ui-core/custom';

export const Route = createFileRoute('/(app)/create-portfolio/$portfolioId/corrections')({
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
  const { portfolioId } = Route.useParams();
  return (
    <Stack h="80vh" justify="space-between">
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
      <Group style={{ alignSelf: 'flex-end' }}>
        <CustomButtonLink
          to="/create-portfolio/$portfolioId/submit"
          params={{ portfolioId: portfolioId }}
          variant="outline"
        >
          Previous
        </CustomButtonLink>
        <CustomButtonLink
          to="/create-portfolio/$portfolioId/preview"
          params={{ portfolioId: portfolioId }}
        >
          Next
        </CustomButtonLink>
      </Group>
    </Stack>
  );
}
