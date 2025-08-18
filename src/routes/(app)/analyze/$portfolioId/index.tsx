import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Group, ScrollArea, Stack, Tabs, useMantineTheme } from '@mantine/core';
import { IconChartBar, IconLayoutBoard } from '@tabler/icons-react';

import ContributorsTable from '@app/components/ContributorsTable/ContributorsTable';
import { ContributorsControls } from '@app/components/ContributorsTable/ContributorsControls';
import PortfolioAnalyzePanel from '@app/components/PortfolioAnalyzeSidePanel/PortfolioAnalyzePanel';
import { SkyLine } from '@app/components/charts/SkyLine';
import { HeatmapChart } from '@app/components/charts/HeatMapChart';
import { innerLayout } from '@app/consts/app-layout';
import styleChart from '../../../../mocks/styleChart.json';
import factorChart from '../../../../mocks/factorChart.json';
import industryChart from '../../../../mocks/industryChart.json';

const tabs = [
  { key: 'style', label: 'Style Flavours', data: styleChart },
  { key: 'factors', label: 'Factors', data: factorChart },
  { key: 'industry', label: 'Industry Groups', data: industryChart },
  { key: 'macro', label: 'Macro Betas', data: styleChart },
];

export const Route = createFileRoute('/(app)/analyze/$portfolioId/')({
  component: PortfolioDetails,
});

function PortfolioDetails() {
  //TODO: prefetch or API call to get portfolio passing portfolioId

  const { spacing } = useMantineTheme();
  const [checked, setChecked] = useState(true);
  const [panelWidth, setPanelWidth] = useState(innerLayout.buttonSetWidth);

  function panelWidthHandler(closed: boolean) {
    if (closed) {
      setPanelWidth('0');
    } else {
      setPanelWidth(innerLayout.buttonSetWidth);
    }
  }

  return (
    <Group gap={0} h="80vh" justify="space-between" pos="relative">
      <Stack
        w={
          panelWidth === '0' ? '98%' : `calc(100% - ${innerLayout.buttonSetWidth} - ${spacing.md})`
        }
        px="md"
        gap={0}
      >
        <Tabs defaultValue="style">
          <Tabs.List>
            {tabs.map((t) => (
              <Tabs.Tab value={t.key} key={t.key}>
                {t.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {tabs.map((t) => (
            // NOTE: The hardcoded height is a ugly workaround for now which needs to be calculated
            // dynamically from 100vh - headerHeight - elementsHeight etc  -Saivenkat
            <Tabs.Panel value={t.key} key={t.key} p="md" component={ScrollArea} h="76vh">
              <Tabs variant="pills" defaultValue="bar-chart">
                <Tabs.List>
                  <Tabs.Tab value="bar-chart">
                    <IconChartBar size={24} />
                  </Tabs.Tab>
                  <Tabs.Tab value="heatmap">
                    <IconLayoutBoard size={24} />
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="bar-chart">
                  <SkyLine data={t.data} />
                  <ContributorsControls checked={checked} setChecked={setChecked} />
                  <ContributorsTable />
                </Tabs.Panel>

                <Tabs.Panel value="heatmap">
                  <HeatmapChart data={t.data} />
                  <ContributorsControls checked={checked} setChecked={setChecked} />
                  <ContributorsTable />
                </Tabs.Panel>
              </Tabs>
            </Tabs.Panel>
          ))}
        </Tabs>
      </Stack>
      <div
        style={{
          width: panelWidth,
          height: '80vh',
        }}
      >
        <PortfolioAnalyzePanel panelWidthHandler={panelWidthHandler} />
      </div>
    </Group>
  );
}
