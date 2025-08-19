import { useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { type ColumnDef } from '@tanstack/react-table';
import {
  ActionIcon,
  Button,
  Divider,
  Drawer,
  Group,
  Paper,
  Select,
  Stack,
  Tabs,
  Text,
  TextInput,
} from '@mantine/core';
import {
  IconChevronDown,
  IconCircleX,
  IconPlus,
  IconSearch,
  IconUpload,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { CustomButtonLink, CustomHeading, CustomTable } from '@app/ui-core/custom';

export const Route = createFileRoute('/(app)/create-portfolio/$portfolioId/universe')({
  component: Universe,
});

function Universe() {
  const { portfolioId } = Route.useParams();
  const [opened, { close, open }] = useDisclosure();
  return (
    <Stack h="80vh" justify="space-between">
      <Stack>
        <CustomHeading
          title="Investable Universe"
          description={`By default all securities in the benchmark selected for analysis are considered as Investable Universe. \nPlease select a custom universe if you would like to change the default`}
        />
        <Select
          defaultValue={'msci'}
          data={[
            { group: '', items: [{ label: 'Default (MSCI World)', value: 'msci' }] },
            {
              group: 'Custom',
              items: [
                { label: 'ASX Top 200 Excluding IT', value: 'asx' },
                {
                  label: 'MSCI All World Excluding Consumer Discretionary',
                  value: 'msciExConsumer',
                },
              ],
            },
          ]}
        />
        <Stack gap={0}>
          <Text>Default Inclusions*</Text>
          <Text>
            By default, all securities in the uploaded portfolio are considered part of the
            investable universe. Including any Off Benchmark Stocks
          </Text>
          <DefaultInclusionPicker />
        </Stack>
        <Button
          style={{ alignSelf: 'flex-start' }}
          leftSection={<IconPlus size={18} />}
          onClick={open}
        >
          Add Custom Universe
        </Button>
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
          to="/create-portfolio/$portfolioId/submit"
          params={{ portfolioId: portfolioId }}
        >
          Next
        </CustomButtonLink>
      </Group>

      <Drawer opened={opened} onClose={close} position="right" withCloseButton={false} size="lg">
        <Stack justify="space-between" h="90vh">
          <Stack gap="lg">
            <CustomHeading title="Add Custom Universe" description="Set up your universe" />
            <TextInput label="Name" required />
            <BenchmarkPicker />
            <StockInclusionPicker />
            <StockExclusionPicker />
          </Stack>
          <Group justify="end">
            <Button variant="outline" onClick={close}>
              Previous
            </Button>
            <CustomButtonLink
              to="/create-portfolio/$portfolioId/submit"
              params={{ portfolioId: portfolioId }}
            >
              Next
            </CustomButtonLink>
          </Group>
        </Stack>
      </Drawer>
    </Stack>
  );
}

interface BenchmarkPickProps {
  benchmark: string;
  benchmarkId: string;
}

function BenchmarkPicker() {
  const [opened, { toggle }] = useDisclosure();
  const columns = useMemo<ColumnDef<BenchmarkPickProps>[]>(
    () => [
      {
        accessorKey: 'benchmark',
        header: 'Selected Benchmarks',
      },
      {
        accessorKey: 'isDelete',
        header: '',
        cell: ({ row }) => (
          <ActionIcon
            variant="transparent"
            onClick={() => {
              console.log(row);
            }}
          >
            <IconCircleX color="black" size={16} />
          </ActionIcon>
        ),
      },
    ],
    [],
  );
  return (
    <Stack gap="sm">
      <Select
        value="Benchmark"
        readOnly
        data={['Benchmark']}
        rightSection={<IconChevronDown />}
        onClick={toggle}
      />
      {opened && (
        <Paper withBorder p="xs">
          <Stack gap="xs" mb="sm">
            <Group justify="space-between">
              <TextInput size="xs" variant="unstyled" placeholder="Search" />
              <Group>
                <IconSearch size={16} />
                <IconUpload size={16} />
              </Group>
            </Group>
            <Divider />
            <Group justify="space-between">
              <Text size="sm">Selected</Text>
              <Text td="underline" size="sm">
                Clear All
              </Text>
            </Group>
          </Stack>
          <CustomTable
            columns={columns}
            tableData={[
              { benchmark: 'MSCI World', benchmarkId: '3200' },
              { benchmark: 'S&P 200', benchmarkId: '3210' },
            ]}
            isLoading={false}
            count={2}
            withPagination={false}
            withColumnBorders
          />
        </Paper>
      )}
    </Stack>
  );
}

interface StockPicker {
  ticker: string;
  tickerCompany: string;
}
function StockInclusionPicker() {
  const [opened, { toggle }] = useDisclosure();
  const columns = useMemo<ColumnDef<StockPicker>[]>(
    () => [
      {
        accessorKey: 'ticker',
        header: 'Select Stocks to include',
      },
      {
        accessorKey: 'tickerCompany',
        header: 'Company Name',
      },
      {
        accessorKey: 'isDelete',
        header: '',
        cell: ({ row }) => (
          <ActionIcon
            variant="transparent"
            onClick={() => {
              console.log(row);
            }}
          >
            <IconCircleX color="black" size={16} />
          </ActionIcon>
        ),
      },
    ],
    [],
  );
  return (
    <Stack>
      <Select
        value="Stock Inclusion"
        readOnly
        data={['Stock Inclusion']}
        rightSection={<IconChevronDown />}
        onClick={toggle}
      />
      {opened && (
        <Paper withBorder p="xs">
          <Stack gap="xs" mb="sm">
            <Group justify="space-between">
              <TextInput size="xs" variant="unstyled" placeholder="Search" />
              <Group>
                <IconSearch size={16} />
                <IconUpload size={16} />
              </Group>
            </Group>
            <Divider />
            <Group justify="space-between">
              <Text size="sm">Selected</Text>
              <Text size="sm" td="underline">
                Clear All
              </Text>
            </Group>
          </Stack>
          <CustomTable
            columns={columns}
            tableData={[
              { ticker: 'AMO', tickerCompany: 'Aurelia Metals Ltd.' },
              { ticker: 'STX', tickerCompany: 'Strike Energy Ltd.' },
            ]}
            isLoading={false}
            count={1}
            withPagination={false}
            withColumnBorders
          />
        </Paper>
      )}
    </Stack>
  );
}

function StockExclusionPicker() {
  const [opened, { toggle }] = useDisclosure();
  const columns = useMemo<ColumnDef<StockPicker>[]>(
    () => [
      {
        accessorKey: 'ticker',
        header: 'Select Stocks to include',
      },
      {
        accessorKey: 'tickerCompany',
        header: 'Company Name',
      },
      {
        accessorKey: 'isDelete',
        header: '',
        cell: ({ row }) => (
          <ActionIcon
            variant="transparent"
            onClick={() => {
              console.log(row);
            }}
          >
            <IconCircleX color="black" size={16} />
          </ActionIcon>
        ),
      },
    ],
    [],
  );
  return (
    <Stack gap="sm">
      <Select
        value="Stock Exclusion"
        readOnly
        data={['Stock Exclusion']}
        rightSection={<IconChevronDown />}
        onClick={toggle}
      />
      {opened && (
        <Paper withBorder p="xs">
          <Stack gap="xs" mb="sm">
            <Group justify="space-between">
              <TextInput size="xs" variant="unstyled" placeholder="Search" />
              <Group>
                <IconSearch size={16} />
                <IconUpload size={16} />
              </Group>
            </Group>
            <Divider />
            <Group justify="space-between">
              <Text size="sm">Selected</Text>
              <Text size="sm" td="underline">
                Clear All
              </Text>
            </Group>
          </Stack>
          <CustomTable
            columns={columns}
            tableData={[
              { ticker: 'TWR', tickerCompany: 'Tower Ltd.' },
              { ticker: 'RMD', tickerCompany: 'Resmed Inc.' },
            ]}
            isLoading={false}
            count={2}
            withPagination={false}
            withColumnBorders
          />
        </Paper>
      )}
    </Stack>
  );
}

function DefaultInclusionPicker() {
  const [opened, { toggle }] = useDisclosure();
  const columns = useMemo<ColumnDef<StockPicker>[]>(
    () => [
      {
        accessorKey: 'sedol',
        header: 'Select Stocks to include',
      },
      { accessorKey: 'bbgCode', header: 'BBG' },
      {
        accessorKey: 'tickerCompany',
        header: 'Company Name',
      },
      {
        accessorKey: 'isDelete',
        header: '',
        cell: ({ row }) => (
          <ActionIcon
            variant="transparent"
            onClick={() => {
              console.log(row);
            }}
          >
            <IconCircleX color="black" size={16} />
          </ActionIcon>
        ),
      },
    ],
    [],
  );
  return (
    <Stack gap="sm">
      <Select
        value="Portfolio Stocks(120)"
        readOnly
        data={['Portfolio Stocks(120)']}
        rightSection={<IconChevronDown />}
        onClick={toggle}
      />
      {opened && (
        <Paper withBorder p="xs">
          <Tabs defaultValue="benchmark">
            <Tabs.List>
              <Tabs.Tab value="benchmark">Benchmark Portfolio Stocks(118)</Tabs.Tab>
              <Tabs.Tab value="off-benchmark">Off Benchmark Portfolio Stocks(2)</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="benchmark">
              <CustomTable
                columns={columns}
                tableData={sampleData}
                isLoading={false}
                count={2}
                withPagination
                withColumnBorders
              />
            </Tabs.Panel>
            <Tabs.Panel value="off-benchmark">
              <CustomTable
                columns={columns}
                tableData={[
                  { sedol: '38838', bbgCode: 'REA', tickerCompany: 'REA Group Ltd.' },
                  { sedol: '47747', bbgCode: 'RIO', tickerCompany: 'RIO Tinto Ltd.' },
                ]}
                isLoading={false}
                count={2}
                withPagination={false}
                withColumnBorders
              />
            </Tabs.Panel>
          </Tabs>
        </Paper>
      )}
    </Stack>
  );
}

const sampleData = [
  { sedol: '38838', bbgCode: 'REA', tickerCompany: 'REA Group Ltd.' },
  { sedol: '47747', bbgCode: 'RIO', tickerCompany: 'RIO Tinto Ltd.' },
  { sedol: '38838', bbgCode: 'REA', tickerCompany: 'REA Group Ltd.' },
  { sedol: '47747', bbgCode: 'RIO', tickerCompany: 'RIO Tinto Ltd.' },
  { sedol: '38838', bbgCode: 'REA', tickerCompany: 'REA Group Ltd.' },
  { sedol: '47747', bbgCode: 'RIO', tickerCompany: 'RIO Tinto Ltd.' },
  { sedol: '38838', bbgCode: 'REA', tickerCompany: 'REA Group Ltd.' },
  { sedol: '47747', bbgCode: 'RIO', tickerCompany: 'RIO Tinto Ltd.' },
  { sedol: '38838', bbgCode: 'REA', tickerCompany: 'REA Group Ltd.' },
  { sedol: '47747', bbgCode: 'RIO', tickerCompany: 'RIO Tinto Ltd.' },
  { sedol: '38838', bbgCode: 'REA', tickerCompany: 'REA Group Ltd.' },
  { sedol: '47747', bbgCode: 'RIO', tickerCompany: 'RIO Tinto Ltd.' },
  { sedol: '38838', bbgCode: 'REA', tickerCompany: 'REA Group Ltd.' },
  { sedol: '47747', bbgCode: 'RIO', tickerCompany: 'RIO Tinto Ltd.' },
  { sedol: '38838', bbgCode: 'REA', tickerCompany: 'REA Group Ltd.' },
  { sedol: '47747', bbgCode: 'RIO', tickerCompany: 'RIO Tinto Ltd.' },
  { sedol: '38838', bbgCode: 'REA', tickerCompany: 'REA Group Ltd.' },
  { sedol: '47747', bbgCode: 'RIO', tickerCompany: 'RIO Tinto Ltd.' },
];
