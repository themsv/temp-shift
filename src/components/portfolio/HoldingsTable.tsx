import { useMemo, useState } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { ActionIcon, Group, NumberInput, Select, Text, TextInput } from '@mantine/core';
import { IconCircleX, IconTrash } from '@tabler/icons-react';
import type { MetaColAlignType } from 'src/types/tanstack-table';
import { CustomTable } from '@app/ui-core/custom';
import { useGetUserSettings } from '@app/data/api';
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
  const { data: userPreferences } = useGetUserSettings();

  const columns = useMemo<ColumnDef<Holding>[]>(
    () => [
      {
        accessorKey: 'effectiveDate',
        header: 'Effective Date',
        meta: {
          align: 'center',
        },
      },
      {
        accessorKey: 'sedol',
        header: 'Sedol',
        meta: {
          align: userPreferences?.transformed.numericAlignment as MetaColAlignType,
        },
      },
      {
        accessorKey: 'bbTicker',
        header: 'Bbg Ticker',
        meta: {
          align: userPreferences?.transformed.textAlignment as MetaColAlignType,
        },
      },
      {
        accessorKey: 'isin',
        header: 'ISIN',
        meta: {
          align: userPreferences?.transformed.textAlignment as MetaColAlignType,
        },
      },
      {
        accessorKey: 'ticker',
        header: 'Ticker',
        meta: {
          align: userPreferences?.transformed.textAlignment as MetaColAlignType,
        },
      },
      {
        accessorKey: 'weight',
        header: 'Weight',
        meta: {
          align: userPreferences?.transformed.numericAlignment as MetaColAlignType,
        },
      },
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
      withColumnBorders
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
        cell: ({ row }) => (
          <Text c="red.9" size="sm">
            {row.original.reason}
          </Text>
        ),
      },
      {
        accessorKey: 'effectiveDate',
        header: 'Effective Date',
        cell: ({ row }) => (
          <TextInput
            w={120}
            value={row.original.effectiveDate}
            size="xs"
            error={!row.original.effectiveDate}
          />
        ),
      },
      {
        accessorKey: 'sedol',
        header: 'Sedol',
        cell: ({ row }) => (
          <Select
            rightSection={null}
            data={[
              { value: '0263494', label: 'HSBC Holdings PLC' },
              { value: '0884709', label: 'BP PLC' },
              { value: '0798059', label: 'Vodafone Group PLC' },
              { value: '2000019', label: 'Unilever PLC' },
              { value: '2316978', label: 'GlaxoSmithKline PLC' },
              { value: '0540528', label: 'AstraZeneca PLC' },
              { value: '0818133', label: 'Barclays PLC' },
              { value: '0925288', label: 'Tesco PLC' },
              { value: '0569010', label: 'Diageo PLC' },
              { value: '2378534', label: 'Royal Dutch Shell PLC' },
            ]}
            comboboxProps={{
              width: 180,
            }}
            value={row.original.sedol}
            w={120}
            size="xs"
            error={!row.original.sedol}
          />
        ),
      },
      { accessorKey: 'bbTicker', header: 'Bbg Ticker' },
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
            size="xs"
            error={!row.original.weight}
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
        meta: { align: 'center' },
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
