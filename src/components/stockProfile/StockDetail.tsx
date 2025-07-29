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
        <Accordion.Panel>
          <Table withColumnBorders withTableBorder verticalSpacing={1} horizontalSpacing={1}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Text size="xs" fw={500}>
                    Group
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text size="xs" fw={500}>
                    Factor
                  </Text>
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
                    Prtf. Flavour Exp.
                  </Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {tableGroups.map((group) =>
                group.rows.map((row, idx) => (
                  <Table.Tr key={row.factor}>
                    {/* Render group name only for the first row of each group, with rowSpan */}
                    {idx === 0 && (
                      <Table.Td rowSpan={group.rows.length}>
                        <Text
                          style={{
                            writingMode: 'vertical-rl', // vertical text from top to bottom, right to left
                            transform: 'rotate(180deg)', // rotate so that text reads bottom-up
                            whiteSpace: 'nowrap',
                            textAlign: 'center',
                            fontWeight: 600,
                            display: 'block',
                            lineHeight: 1,
                            padding: '0 4px', // optional padding for spacing
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
                    <Table.Td>
                      <Text size="xs">{row.value}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="xs">{row.value}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="xs">{row.value}</Text>
                    </Table.Td>
                  </Table.Tr>
                )),
              )}
            </Table.Tbody>
          </Table>
        </Accordion.Panel>
      </Accordion.Item>
    </Box>
  ));

  return (
    <Flex align="center" style={{ width: '40%' /* 25 + 3% */ }}>
      <Box
        style={{
          width: '100%',
          height: '100%',
          // marginRight: '3%',
          padding: '1%',
          border: '1px solid #dcdcdc',
        }}
      >
        <Tabs color="black" defaultValue="exposure">
          <Tabs.List
            style={{
              backgroundColor: '#f0f0f0',
            }}
          >
            <Tabs.Tab value="exposure">Exposures</Tabs.Tab>
            <Tabs.Tab value="exposure_input">Exposure Input</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="exposure" pt="xs">
            <Accordion defaultValue="Factor">{items}</Accordion>
          </Tabs.Panel>
        </Tabs>
      </Box>
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
