import { Accordion, Flex, Text, Box, Tabs, Table } from '@mantine/core';
import { IconTriangleFilled } from '@tabler/icons-react';
import { data, tableGroups } from '../stockProfile/StockProfileData';

interface StockDetailProps {
  readonly setOpenDetailView: (b: boolean) => void;
}

export default function StockDetail({ setOpenDetailView }: StockDetailProps) {
  const items = data.map((item) => (
    <Box key={item.value} style={{ overflowX: 'auto', maxWidth: '100%', marginTop: '0' }}>
      <Accordion.Item key={item.value} value={item.value}>
        <Accordion.Control>{item.value}</Accordion.Control>
        <Accordion.Panel style={{ backgroundColor: 'white' }}>
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
              <col /> {/* 1st column: default width (auto or flexible) */}
              <col style={{ width: '40%' }} /> {/* 2nd column */}
              <col style={{ width: '18%' }} /> {/* 3rd column */}
              <col style={{ width: '18%' }} /> {/* 4th column */}
              <col style={{ width: '18%' }} /> {/* 5th column */}
            </colgroup>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Text size="xs" fw={500}></Text>
                </Table.Th>
                <Table.Th>
                  <Text size="xs" fw={500}></Text>
                </Table.Th>
                <Table.Th>
                  <Text size="xs" fw={500}>
                    Flavour Exp.
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text size="xs" fw={500}>
                    Exp. Contrib.
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text size="xs" fw={500}>
                    Prtf. Flavour
                  </Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {tableGroups.map((group) =>
                group.rows.map((row, idx) => {
                  const getBackgroundColor = (val: string) => {
                    const numericValue = parseFloat(val);
                    if (numericValue >= 40 && numericValue <= 89)
                      return '#e5faf6'; // light green
                    else if (numericValue >= 90 && numericValue <= 100)
                      return '#22cfa7'; // green
                    else if (numericValue >= 0 && numericValue <= 20)
                      return '#ffd0db'; // light red/pink
                    else if (numericValue < 0) return '#df2d41'; // dark red
                    return ''; // default transparent or no color
                  };

                  const bgColor1 = getBackgroundColor(row.value1);
                  const bgColor2 = getBackgroundColor(row.value2);
                  const bgColor3 = getBackgroundColor(row.value3);

                  return (
                    <Table.Tr key={row.factor}>
                      {idx === 0 && (
                        <Table.Td rowSpan={group.rows.length}>
                          <Text
                            style={{
                              writingMode: 'vertical-rl',
                              transform: 'rotate(180deg)',
                              whiteSpace: 'nowrap',
                              textAlign: 'center',
                              fontWeight: 600,
                              display: 'block',
                              lineHeight: 1,
                              padding: '0 4px',
                            }}
                            size="xs"
                          >
                            {group.group}
                          </Text>
                        </Table.Td>
                      )}
                      <Table.Td>
                        <Text size="xs">{row.factor}</Text>
                      </Table.Td>
                      <Table.Td style={{ backgroundColor: bgColor1, textAlign: 'center' }}>
                        <Text size="xs">{row.value1}</Text>
                      </Table.Td>
                      <Table.Td style={{ backgroundColor: bgColor2, textAlign: 'center' }}>
                        <Text size="xs">{row.value2}</Text>
                      </Table.Td>
                      <Table.Td style={{ backgroundColor: bgColor3, textAlign: 'center' }}>
                        <Text size="xs">{row.value3}</Text>
                      </Table.Td>
                    </Table.Tr>
                  );
                }),
              )}
            </Table.Tbody>
          </Table>
        </Accordion.Panel>
      </Accordion.Item>
    </Box>
  ));

  return (
    <Flex
      align="center"
      style={{
        width: '45%',
        backgroundColor: '#F7F7F7',
        borderRight: '1px solid #dcdcdc',
        marginRight: '1%',
      }}
    >
      <Box
        style={{
          width: '100%',
          height: '80vh',
          padding: '1%',
          overflowY: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        <Tabs color="black" defaultValue="exposure">
          <Tabs.List
            style={{
              backgroundColor: '#f0f0f0',
            }}
          >
            <Tabs.Tab value="exposure">
              <Text size={'xs'} c="dimmed" fw={500}>
                Exposures
              </Text>
            </Tabs.Tab>
            <Tabs.Tab value="exposure_input">
              {' '}
              <Text size={'xs'} c="dimmed" fw={500}>
                Exposures Input
              </Text>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="exposure" pt="xs">
            <Accordion
              styles={{
                label: {
                  padding: 2,
                },
                control: {
                  fontSize: 14,
                  padding: 0,
                },
                content: {
                  padding: 0,
                },
              }}
              defaultValue="Factor"
            >
              {items}
            </Accordion>
          </Tabs.Panel>
        </Tabs>
      </Box>
      <Box
        style={{
          backgroundColor: 'black',
          height: '66px',
          width: '16px',
          marginLeft: '1%',
          cursor: 'pointer',
          padding: '0',
          clipPath: 'polygon(100% 0, 0 15%, 0 85%, 100% 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => {
          setOpenDetailView(false);
        }}
      >
        <IconTriangleFilled
          size={10}
          style={{
            transform: 'rotate(270deg)',
            fill: 'white',
            stroke: 'none',
          }}
        />
      </Box>
    </Flex>
  );
}
