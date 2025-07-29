import { useMemo, useState } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { ActionIcon, Group, NumberInput, Select, Text } from '@mantine/core';
import { IconCircleX, IconTrash } from '@tabler/icons-react';
import { CustomTable } from '@app/ui-core/custom';
import { valid, invalid } from '../../mocks/holdings-upload.json';

interface Holding {
  effectiveDate: string;
  sedol: string;
  bbTicker: string;
  isin: string;
  ticker: string;
  weight: string;
}
function ValidHoldings() {
  const columns = useMemo<ColumnDef<Holding>[]>(
    () => [
      { accessorKey: 'effectiveDate', header: 'Effective Date' },
      { accessorKey: 'sedol', header: 'Sedol' },
      { accessorKey: 'bbTicker', header: 'Bloomberg Ticker' },
      { accessorKey: 'isin', header: 'ISIN' },
      { accessorKey: 'ticker', header: 'Ticker' },
      { accessorKey: 'weight', header: 'Weight' },
    ],
    [],
  );

  return (
    <CustomTable
      columns={columns}
      tableData={valid}
      isLoading={false}
      count={valid.length}
      withPagination={false}
    />
  );
}

interface InvalidHolding extends Holding {
  reason: string;
}
function InvalidHoldings() {
  const [data] = useState<InvalidHolding[]>(invalid);

  const columns = useMemo<ColumnDef<InvalidHolding>[]>(
    () => [
      {
        accessorKey: 'reason',
        header: 'Reasons',
        cell: ({ row }) => <Text c="red.9">{row.original.reason}</Text>,
      },
      {
        accessorKey: 'effectiveDate',
        header: 'Effective Date',
      },
      {
        accessorKey: 'sedol',
        header: 'Sedol',
        cell: () => (
          <Select
            rightSection={null}
            data={[
              { value: '0263494', label: 'HSBC Holdings plc' },
              { value: 'B1YW440', label: 'AstraZeneca plc' },
            ]}
            w={120}
          />
        ),
      },
      { accessorKey: 'bbTicker', header: 'Bloomberg Ticker' },
      { accessorKey: 'isin', header: 'ISIN' },
      { accessorKey: 'ticker', header: 'Ticker' },
      {
        accessorKey: 'weight',
        header: 'Weight',
        cell: ({ row }) => (
          <NumberInput
            value={parseFloat(row.original.weight)}
            onChange={() => () => {}}
            hideControls
            w={64}
          />
        ),
      },
      {
        accessorKey: 'isDelete',
        header: () => (
          <Group align="center" gap={0} c="red.9">
            <IconTrash />
            <Text>Delete All</Text>
          </Group>
        ),
        cell: () => (
          <ActionIcon variant="transparent">
            <IconCircleX />
          </ActionIcon>
        ),
      },
    ],
    [data],
  );
  return (
    <CustomTable
      columns={columns}
      tableData={invalid}
      isLoading={false}
      count={invalid.length}
      withPagination={false}
    />
  );
}
export { ValidHoldings, InvalidHoldings };
