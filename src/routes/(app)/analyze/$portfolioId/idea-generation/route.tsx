import { useState } from 'react';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import {
  Box,
  Button,
  Checkbox,
  CloseButton,
  Group,
  Paper,
  Popover,
  ScrollArea,
  Tabs,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCaretDownFilled } from '@tabler/icons-react';
import { useIntl } from 'react-intl';

import { useAnalyze } from 'src/context/useAnalyze';
import appLayoutConfig, { innerLayout } from '@app/consts/app-layout';
import PortfolioAnalyzePanel from '@app/components/PortfolioAnalyzeSidePanel/PortfolioAnalyzePanel';
import data from '../../../../../mocks/Dropdowns.json';

export const Route = createFileRoute('/(app)/analyze/$portfolioId/idea-generation')({
  component: IdeaGeneration,
});

const tabs = [
  { label: 'Top Stocks by Flavour/Factor', value: 'top-stocks' },
  { label: 'Stock Screening', value: 'screening' },
  { label: 'Economic Regimes', value: 'regimes' },
  { label: 'Visualize(Scatter Plot)', value: 'scatter', disabled: true },
];

function IdeaGeneration() {
  const { portfolioId } = Route.useParams();
  const { spacing } = useMantineTheme();

  const { formatMessage } = useIntl();
  const [panelWidth, setPanelWidth] = useState('0');
  const { ideaGenTab, setIdeaGenTab } = useAnalyze();

  function panelWidthHandler(closed: boolean) {
    if (closed) {
      setPanelWidth('0');
    } else {
      setPanelWidth(innerLayout.buttonSetWidth);
    }
  }

  const navigate = useNavigate();
  return (
    <Paper
      p="md"
      mt="xs"
      h={`calc(100vh - ${appLayoutConfig.header.height} - ${innerLayout.buttonSetHeight} - ${spacing.xl} - ${spacing.xl})`}
      style={{ overflow: 'auto' }}
    >
      <Group align="flex-start" justify="space-between" wrap="nowrap" w="100%">
        <Tabs w="96%" defaultValue={ideaGenTab} mb="md">
          <Tabs.List>
            <Title order={5} style={{ alignSelf: 'center' }}>
              {formatMessage({ id: 'IDEA_GENERATION' })}
            </Title>

            {tabs.map((tab) => (
              <Tabs.Tab
                key={tab.value}
                value={tab.value}
                disabled={tab.disabled}
                onClick={() => {
                  (setIdeaGenTab(tab.value),
                    void navigate({
                      // TODO: Make this type-safe
                      to: `/analyze/$portfolioId/idea-generation/${tab.value}`,
                      params: { portfolioId },
                    }));
                }}
              >
                {tab.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Outlet />
        </Tabs>
        <CloseButton
          onClick={() => {
            window.history.back();
          }}
        />
        <Box
          w={355}
          h="80vh"
          style={{
            justifyContent: 'flex-end',
            position: 'absolute',
            right: 0,
            zIndex: 1,
          }}
        >
          <PortfolioAnalyzePanel
            panelWidthHandler={panelWidthHandler}
            tabList={['Stock Profile']}
            screen="idea-generation"
          />
        </Box>
      </Group>
    </Paper>
  );
}

export default function FlavourFactorDropdown() {
  const [opened, { toggle }] = useDisclosure(false);
  const [selected, setSelected] = useState<string[]>([]);

  const handleCheck = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const renderList = (label: string, items: string[]) => (
    <Box>
      <Text
        size="xs"
        fw={400}
        px={4}
        py={4}
        style={{
          borderBottom: '1px solid #ccc',
          borderTop: '1px solid #fff',
          borderLeft: '1px solid #ddd',
        }}
      >
        {label}
      </Text>
      {items.map((item) => (
        <Box
          key={item}
          px="xs"
          py={6}
          style={{
            borderBottom: '1px solid #ccc',
            borderLeft: '1px solid #ddd',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <Checkbox
            label={item}
            size={'11'}
            radius="2"
            checked={selected.includes(item)}
            onChange={() => {
              handleCheck(item);
            }}
          />
        </Box>
      ))}
    </Box>
  );

  return (
    <Popover width={350} opened={opened} onChange={toggle} position="bottom-start">
      <Popover.Target>
        <Button
          onClick={toggle}
          variant="outline"
          size="xs"
          c="darkgray"
          rightSection={<IconCaretDownFilled size={16} color="gray" />}
          style={{ borderColor: 'gray', fontWeight: 400 }}
        >
          {selected.length > 0 ? `${selected.length.toString()} selected` : 'Flavour/Factor (None)'}
        </Button>
      </Popover.Target>

      <Popover.Dropdown p={0}>
        <Group align="flex-start" wrap="nowrap" gap={0}>
          <ScrollArea h={360} scrollbarSize={0} style={{ width: 300 }}>
            <Box>
              <Box
                px="xs"
                py={4}
                style={{
                  backgroundColor: '#eaf3fc',
                  borderBottom: '1px solid #ccc',
                }}
              >
                <Text fw={400} size="xs">
                  Stock 2.0 Flavours
                </Text>
              </Box>
              {renderList('Value', data.valueOptions)}
              {renderList('Growth', data.growthOptions)}
            </Box>
          </ScrollArea>

          <ScrollArea h={360} scrollbarSize={0} style={{ width: 300 }}>
            <Box>
              <Box
                px="xs"
                py={4}
                style={{
                  backgroundColor: '#eaf3fc',
                  borderBottom: '1px solid #ccc',
                }}
              >
                <Text fw={400} size="xs">
                  Factors
                </Text>
              </Box>
              {renderList('Risk & Liquidity', data.riskOptions)}
              {renderList('Debt', data.debtOptions)}
              {renderList('Sensitivities', data.sensitivityOptions)}
            </Box>
          </ScrollArea>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}
