import { Flex, Stack, Text, ActionIcon, Group, Box, Tabs, Table } from '@mantine/core';
import { IconX, IconTriangleFilled } from '@tabler/icons-react';
import { flavourExposures, elements } from '../stockProfile/StockProfileData';

const rows = elements.map((element) => (
  <Table.Tr key={element.name}>
    <Table.Td>
      <Text size="xs">{element.position}</Text>
    </Table.Td>
    <Table.Td>
      <Text size="xs">{element.mass}</Text>
    </Table.Td>
    <Table.Td>
      <Text size="xs">{element.name}</Text>
    </Table.Td>
  </Table.Tr>
));
interface SelectValue {
  value: string;
  label: string;
}
interface StockOverview {
  readonly openDetailView: boolean;
  readonly setOpenDetailView: (b: boolean) => void;
  readonly setChangeFlex: (b: boolean) => void;
  readonly value: SelectValue | null;
  readonly setValue: (v: SelectValue | null) => void;
}

export default function StockOverview({
  openDetailView,
  setOpenDetailView,
  setChangeFlex,
  value,
  setValue,
}: StockOverview) {
  return (
    <Flex align="center" style={{ width: '25%' /* 25 + 3% */ }}>
      <Box
        style={{
          width: '100%',
          height: '100%',
          marginRight: openDetailView ? '5%' : '0',
          padding: '5%',
          border: '1px solid #dcdcdc',
        }}
      >
        <Stack>
          <Group justify="space-between">
            <Text fw={500}>{value ? value.value : null}</Text>
            <ActionIcon
              onClick={() => {
                setChangeFlex(false);
                setOpenDetailView(false);
                setValue(null);
              }}
              aria-label="Go back"
              variant="transparent"
              size="lg"
            >
              <IconX color="black" size={20} />
            </ActionIcon>
          </Group>
          <Text size="sm">{value ? value.label : null}</Text>
          <Text size="xs" c="dimmed">
            Insurance - Property and Casualty <br />
            Close price - 652.1 | Market Price - 650
          </Text>
          <Box>
            <Text size="sm" fw={500} mb={16}>
              Flavour Exposures
            </Text>
            <Stack>
              {flavourExposures.map((row) => (
                <Box key={row.label} style={{ display: 'flex', alignItems: 'center' }}>
                  <Text size="xs" style={{ minWidth: '45%' }}>
                    {row.label}
                  </Text>
                  <Box style={{ display: 'flex' }}>
                    {row.exposures.map((val) => (
                      <Box
                        key={val}
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
          <Text size="xs" fw={500} style={{ marginBottom: '-4%' }}>
            Top 5 Factors
          </Text>
          <Box style={{ overflowX: 'auto', maxWidth: '100%', marginTop: '0' }}>
            <Table withColumnBorders withTableBorder verticalSpacing={1} horizontalSpacing={1}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>
                    <Text size="xs" fw={500}>
                      Style Flavour
                    </Text>
                  </Table.Th>
                  <Table.Th>
                    <Text size="xs" fw={500}>
                      Flavour Exp.
                    </Text>
                  </Table.Th>
                  <Table.Th>
                    <Text size="xs" fw={500}>
                      Exp Contribution
                    </Text>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Box>
          <Tabs
            defaultValue="first"
            color="black"
            styles={{
              tab: {
                padding: '1%',
              },
            }}
          >
            <Tabs.List grow justify="flex-start">
              <Tabs.Tab value="first">
                <Text size="xs">Top 5 contributors</Text>
              </Tabs.Tab>
              <Tabs.Tab value="second">
                <Text size="xs">Bottom 5 contributors</Text>
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="first" pt="xs">
              <Box style={{ overflowX: 'auto', maxWidth: '100%', marginTop: '0' }}>
                <Table withColumnBorders withTableBorder verticalSpacing={1} horizontalSpacing={1}>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>
                        <Text size="xs" fw={500}>
                          Style Flavour
                        </Text>
                      </Table.Th>
                      <Table.Th>
                        <Text size="xs" fw={500}>
                          Flavour Exp.
                        </Text>
                      </Table.Th>
                      <Table.Th>
                        <Text size="xs" fw={500}>
                          Exp Contribution
                        </Text>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </Box>
            </Tabs.Panel>
            <Tabs.Panel value="second" pt="xs">
              <Box style={{ overflowX: 'auto', maxWidth: '100%', marginTop: '0' }}>
                <Table withColumnBorders withTableBorder verticalSpacing={1} horizontalSpacing={1}>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>
                        <Text size="xs" fw={500}>
                          Style Flavour
                        </Text>
                      </Table.Th>
                      <Table.Th>
                        <Text size="xs" fw={500}>
                          Flavour Exp.
                        </Text>
                      </Table.Th>
                      <Table.Th>
                        <Text size="xs" fw={500}>
                          Exp Contribution
                        </Text>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </Box>
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Box>
      {!openDetailView && (
        <Box
          style={{
            backgroundColor: 'black',
            height: '66px',
            width: '16px',
            marginRight: '3%',
            cursor: 'pointer',
            padding: '0',
            clipPath: 'polygon(0 0, 100% 15%, 100% 85%, 0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => {
            setOpenDetailView(true);
          }}
        >
          <IconTriangleFilled
            size={10}
            style={{
              transform: 'rotate(90deg)',
              fill: 'white',
              stroke: 'none',
            }}
          />
        </Box>
      )}
    </Flex>
  );
}
