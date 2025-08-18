import { useCallback, useEffect, useMemo, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { ActionIcon, Group, NumberInput, Stack, Text } from '@mantine/core';
import { IconCircleX, IconPercentage } from '@tabler/icons-react';
import { round } from 'lodash';
import type { SetState } from '@app/data/types';
import { CustomButtonLink, CustomMultiSelect, CustomTable } from '@app/ui-core/custom';

export const Route = createFileRoute('/(app)/create-portfolio/$portfolioId/multi-fund')({
  component: MultiFund,
});

function MultiFund() {
  const { portfolioId } = Route.useParams();
  const [portfolios, setPortfolios] = useState<string[]>([]);

  return (
    <Stack h="80vh" justify="space-between">
      <Stack>
        <CustomMultiSelect
          label="Select to Add Portfolios"
          data={mock.map((p) => ({ label: p.name, value: p.id }))}
          value={portfolios}
          setValue={setPortfolios}
        />
        <WeightsTable portfolios={portfolios} setPortfolios={setPortfolios} />
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
    </Stack>
  );
}

type WeightsTableProps = {
  portfolios: string[];
  setPortfolios: SetState<string[]>;
};

interface PortfolioWeight {
  id: string;
  name: string;
  benchmark: string;
  weight: number;
  effectiveDate: string;
}
function WeightsTable({ portfolios, setPortfolios }: WeightsTableProps) {
  const [weights, setWeights] = useState<PortfolioWeight[]>([]);

  // Load portfolio weights from mock data based on selected portfolio IDs
  useEffect(() => {
    const updated = portfolios
      .map((id) => mock.find((p) => p.id === id))
      .filter((p): p is PortfolioWeight => !!p);
    setWeights(updated);
  }, [portfolios]);

  const totalWeight = round(
    weights.reduce((sum, w) => sum + w.weight, 0),
    3,
  );

  const totalWeightError = totalWeight !== 100;

  const handleDelete = useCallback(
    (id: string) => {
      const updatedState = portfolios.filter((p) => p !== id);
      setPortfolios(updatedState);
    },
    [portfolios],
  );

  // Handle weight change
  const handleWeightChange = useCallback((id: string, value: number) => {
    setWeights((prev) => prev.map((row) => (row.id === id ? { ...row, weight: +value } : row)));
  }, []);
  const columns: ColumnDef<PortfolioWeight>[] = useMemo(
    () => [
      {
        accessorKey: 'effectiveDate',
        header: 'Effective Date',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'name',
        header: 'Portfolio Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'benchmark',
        header: 'Benchmark',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'weight',
        header: 'Portfolio Weight',
        cell: ({ row }) => (
          <NumberInput
            value={row.original.weight}
            rightSection={<IconPercentage size={12} />}
            size="xs"
            w={64}
            error={totalWeightError && !row.original.weight}
            onChange={(value) => {
              handleWeightChange(row.original.id, Number(value));
            }}
          />
        ),
      },
      {
        id: 'delete',
        header: '',
        cell: ({ row }) => (
          <ActionIcon
            variant="transparent"
            onClick={() => {
              handleDelete(row.original.id);
            }}
          >
            <IconCircleX color="black" />
          </ActionIcon>
        ),
      },
    ],
    [handleDelete, handleWeightChange, totalWeightError],
  );

  const effectiveDates = weights.map((w) => w.effectiveDate);
  const hasMismatch = new Set(effectiveDates).size > 1;

  return (
    <Stack>
      {weights.length > 0 ? (
        <>
          <CustomTable
            columns={columns}
            tableData={weights}
            isLoading={false}
            count={weights.length}
            withPagination={false}
          />
          <Stack gap={0}>
            <Text size="sm" fw={500} mt="xs">
              Total Weight:{' '}
              <Text span c={totalWeightError ? 'red' : 'green'}>
                {totalWeight}%
              </Text>
            </Text>
            {hasMismatch && (
              <Text c="red" size="sm">
                *The Portfolios have different effective dates
              </Text>
            )}
          </Stack>
        </>
      ) : (
        <Text ta="center">Please select portfolios above to add</Text>
      )}
    </Stack>
  );
}
const mock = [
  {
    id: '11111',
    effectiveDate: '12.05.2025',
    name: 'ASX Quality Growth',
    benchmark: 'MSCI World',
    weight: 0,
  },
  {
    id: '11112',
    effectiveDate: '12.05.2025',
    name: 'S&P Growth',
    benchmark: 'MSCI Global',
    weight: 0,
  },
  {
    id: '11113',
    effectiveDate: '02.05.2025',
    name: 'S&P Quality',
    benchmark: 'ASX 300',
    weight: 0,
  },
];
