import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Box,
  Button,
  Checkbox,
  CloseButton,
  Group,
  Paper,
  Popover,
  ScrollArea,
  SegmentedControl,
  Tabs,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBookmark, IconCaretDownFilled, IconColumns3 } from '@tabler/icons-react';
import { useIntl } from 'react-intl';
import TopStocks from '@app/components/FlavoursTable/flavours';
import StockScreening from '@app/components/StockScreening/stock-screening';
import Selectable from '@app/components/SingleSelectCombobox/Select';
import appLayoutConfig, { innerLayout } from '@app/consts/app-layout';
import data from '../../../../mocks/Dropdowns.json';

export const Route = createFileRoute('/(app)/analyze/$portfolioId/idea-generation')({
  component: IdeaGeneration,
});

const tabs = [
  { label: 'Top Stocks by Flavour/Factor', value: 'top-stocks' },
  { label: 'Stock Screening', value: 'screening' },
  { label: 'Economic Regimes', value: 'regimes' },
  { label: 'Visualize(Scatter Plot)', value: 'scatter', disabled: true },
];
const options = ['All universe', 'Universe 1', 'Universe 3'];

function IdeaGeneration() {
  const [value, setValue] = useState<string>('');
  const { spacing } = useMantineTheme();
  const { formatMessage } = useIntl();
  const selectedLabel = value || 'Universe (None)';
  return (
    <Paper
      withBorder
      p="md"
      mt="md"
      h={`calc(100vh - ${appLayoutConfig.header.height} - ${innerLayout.buttonSetHeight} - ${spacing.xl} - ${spacing.xl})`}
    >
      <Group align="flex-start" justify="space-between">
        <Tabs defaultValue="top-stocks" w="96%">
          <Tabs.List>
            <Title order={5} style={{ alignSelf: 'center' }}>
              {formatMessage({ id: 'IDEA_GENERATION' })}
            </Title>
            {tabs.map((tab) => (
              <Tabs.Tab key={tab.value} value={tab.value} disabled={tab.disabled}>
                {tab.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

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

          <Tabs.Panel value="regimes" pt="md">
            <Text>Economic Regimes explanation and logic.</Text>
          </Tabs.Panel>

          <Tabs.Panel value="scatter" pt="md">
            <Text>Scatter plot visualization canvas or chart here.</Text>
          </Tabs.Panel>
        </Tabs>
        <CloseButton
          onClick={() => {
            window.history.back();
          }}
        />
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
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
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
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
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
