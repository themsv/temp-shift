import { useState } from 'react';

import { useLocation, useNavigate } from '@tanstack/react-router';
import { Stack, Text, ActionIcon, Group, Box, Tabs, Grid, Table } from '@mantine/core';
import { IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons-react';
import { elements, flavourExposures } from '../stockProfile/StockProfileData';
import { useAnalyze } from '../../context/useAnalyze';

const rows = elements.map((element) => (
  <Table.Tr key={element.name}>
    <Table.Td>
      <Text size="xs">{element.position}</Text>
    </Table.Td>
    <Table.Td style={{ textAlign: 'center' }}>
      <Text size="xs">{element.mass}</Text>
    </Table.Td>
    <Table.Td style={{ textAlign: 'center' }}>
      <Text size="xs">{element.name}</Text>
    </Table.Td>
  </Table.Tr>
));

const renderTable = () => {
  return (
    <Table
      withColumnBorders
      withTableBorder
      verticalSpacing={1}
      horizontalSpacing={1}
      styles={{
        th: {
          textAlign: 'center',
          padding: 0,
        },
      }}
    >
      <colgroup>
        <col style={{ width: '50%' }} />
        <col style={{ width: '25%' }} />
        <col style={{ width: '25%' }} />
      </colgroup>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>
            <Text size="xs" fw={500}>
              Style Flavour
            </Text>
          </Table.Th>
          <Table.Th>
            <Text size="xs" fw={500} style={{ whiteSpace: 'nowrap' }}>
              Flavour Exp.
            </Text>
          </Table.Th>
          <Table.Th>
            <Text size="xs" fw={500} style={{ whiteSpace: 'nowrap' }}>
              Exp contrib.
            </Text>
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

interface StockOverview {
  readonly openDetailView: boolean;
  readonly setOpenDetailView: (b: boolean) => void;
  closePanelHandler: () => void;
}

export default function StockOverviewPanel({
  openDetailView,
  setOpenDetailView,
  closePanelHandler,
}: StockOverview) {
  const [activeTab, setActiveTab] = useState<string | null>('first');
  const { isExpanded, setIsExpanded, setChangeFlex, setData, data } = useAnalyze();
  const navigate = useNavigate();
  const location = useLocation();
  const fromButton = location.state.fromButton === true;

  return (
    <Box
      style={{
        width: '100%',
        height: '80vh',
        marginRight: openDetailView ? '5%' : '0',
        padding: '1% 1% 1% 2%',
        // border: '1px solid #dcdcdc',
        overflowY: 'auto',
        boxSizing: 'border-box',
        scrollbarWidth: 'none',
        backgroundColor: '#f7f7f7',
      }}
    >
      <Stack>
        <Stack gap={0}>
          <Group justify="space-between">
            {fromButton ? (
              <Text fw={500}>{data ? data.value : null}</Text>
            ) : (
              <Group gap={0}>
                {isExpanded === false ? (
                  <IconChevronLeft
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      void navigate({ to: '/analyze/stock-profile' });
                      setIsExpanded(true);
                      setChangeFlex(true);
                    }}
                  />
                ) : (
                  <IconChevronRight
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      {
                        setIsExpanded(false);
                        void navigate({ to: '/analyze/115' });
                      }
                    }}
                  />
                )}
                <Text fw={500}>{data ? data.value : null}</Text>
              </Group>
            )}

            <ActionIcon
              onClick={() => {
                setChangeFlex(false);
                setData(null);
                !fromButton && !isExpanded && closePanelHandler();
                setOpenDetailView(false);
              }}
              aria-label="Go back"
              variant="transparent"
              size="lg"
            >
              <IconX color="black" size={20} />
            </ActionIcon>
          </Group>
          <Stack>
            <Stack gap={0} ml={fromButton ? 0 : 25}>
              <Text size="xs" c="dimmed" fw={500}>
                {data ? data.label : null}
              </Text>
              <Stack>
                <Text size="10px" c="dimmed">
                  Insurance - Property and Casualty
                </Text>
                <Text size="10px" c="dimmed">
                  Close price - 652.1 AUD | Market Price - 650 AUD
                </Text>
              </Stack>
            </Stack>
            <Stack ml={fromButton ? 0 : 12}>
              <Grid align="center">
                <Grid.Col span={4}>
                  <Stack gap={2} align="center">
                    <Text size="8px" c="dimmed" ta="center">
                      Portfolio Weight
                    </Text>
                    <Text size="xs" c="blue" fw={500} ta="center">
                      3.30%
                    </Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Stack gap={2} align="center">
                    <Text size="8px" c="dimmed" ta="center">
                      Benchmark Weight
                    </Text>
                    <Text size="xs" c="blue" fw={500} ta="center">
                      2.3%
                    </Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Stack gap={2} align="center">
                    <Text size="8px" c="dimmed" ta="center">
                      Active Weight
                    </Text>
                    <Text size="xs" c="red" fw={500} ta="center">
                      1.1%
                    </Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Stack>
          </Stack>
        </Stack>

        <Box style={{ backgroundColor: '	#FFFFFF', padding: '2%' }}>
          <Text size="xs" fw={500} mb={10}>
            Flavour Exposures
          </Text>
          <Stack gap="xs">
            {flavourExposures.map((row, index) => (
              <Box
                key={row.label + index.toString()}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Text size="xs" style={{ minWidth: '45%' }}>
                  {row.label}
                </Text>
                <Box style={{ display: 'flex' }}>
                  {row.exposures.map((val, index) => (
                    <Box
                      key={(val ?? '') + index.toString()}
                      style={{
                        width: 14,
                        height: 14,
                        marginRight: 1,
                        padding: 0,
                        background: val || 'transparent',
                        border: val ? 'none' : '1px solid #eee',
                        display: 'block',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
        <Box style={{ backgroundColor: '	#FFFFFF', padding: '2%' }}>
          <Text size="xs" fw={500}>
            Top 5 Stock Flavour Exposures
          </Text>
          <Box style={{ overflowX: 'auto', maxWidth: '100%', marginTop: '2%' }}>
            {renderTable()}
          </Box>
        </Box>
        <Box style={{ backgroundColor: '	#FFFFFF', padding: '2%' }}>
          <Tabs
            defaultValue="first"
            value={activeTab}
            onChange={setActiveTab}
            color="blue"
            styles={{
              tab: {
                padding: '1%',
              },
            }}
          >
            <Tabs.List grow justify="flex-start">
              <Tabs.Tab value="first">
                <Text size="xs" c={activeTab === 'second' ? 'dimmed' : ''}>
                  Top 5 contributors
                </Text>
              </Tabs.Tab>
              <Tabs.Tab value="second">
                <Text size="xs" c={activeTab === 'first' ? 'dimmed' : ''}>
                  Bottom 5 contributors
                </Text>
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="first" pt="xs">
              <Box style={{ overflowX: 'auto', maxWidth: '100%', marginTop: '0' }}>
                {renderTable()}
              </Box>
            </Tabs.Panel>
            <Tabs.Panel value="second" pt="xs">
              <Box style={{ overflowX: 'auto', maxWidth: '100%', marginTop: '0' }}>
                {renderTable()}
              </Box>
            </Tabs.Panel>
          </Tabs>
        </Box>
      </Stack>
    </Box>
  );
}
