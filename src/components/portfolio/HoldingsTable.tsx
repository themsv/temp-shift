import { useMemo, useState } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { ActionIcon, Group, NumberInput, Select, Text } from '@mantine/core';
import { IconCircleX, IconTrash } from '@tabler/icons-react';
import { CustomTable } from '@app/ui-core/custom';
import { valid, invalid } from '../../mocks/holdings-upload.json';

interface Holding {
  uuid: string;
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
  const [holdings, setHoldings] = useState<InvalidHolding[]>(invalid);

  const handleDeleteAll = () => {
    setHoldings([]);
  };
  const handleDeleteHolding = (uuid: string) => {
    const updated = holdings.filter((h) => h.uuid !== uuid);
    setHoldings(updated);
  };

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
          <Group align="center" gap={0} c="red.9" onClick={handleDeleteAll}>
            <IconTrash />
            <Text>Delete All</Text>
          </Group>
        ),
        cell: ({ row }) => (
          <ActionIcon
            variant="transparent"
            onClick={() => {
              handleDeleteHolding(row.original.uuid);
            }}
          >
            <IconCircleX color="black" />
          </ActionIcon>
        ),
      },
    ],
    [holdings],
  );
  return (
    <CustomTable
      columns={columns}
      tableData={holdings}
      isLoading={false}
      count={holdings.length}
      withPagination={false}
    />
  );
}
export { ValidHoldings, InvalidHoldings };
