import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Stack, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { CustomHeading, CustomCombobox, CustomButtonLink } from '@app/ui-core/custom';
import BenchmarkData from './../../../../mocks/benchmark-data.json';

export const Route = createFileRoute('/(app)/create-portfolio/$portfolioId/benchmark')({
  component: Benchmark,
});

function Benchmark() {
  const { portfolioId } = Route.useParams();

  const [selectedValues, setSelectedValues] = useState<string[]>([
    'msci-world',
    'msci-em',
    'msci-100',
    'asx-growth',
    'sp-growth',
  ]);

  return (
    <Stack h="80vh" justify="space-between">
      <Stack>
        <CustomHeading title="Select Base Benchmarks" description="" />
        <CustomCombobox
          data={BenchmarkData}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
          placeholder="Search or Select Benchmarks"
          label="Benchmarks"
          required
        />
        <CustomButtonLink
          to={'/create-portfolio/$portfolioId/create-benchmark/metadata'}
          params={{ portfolioId }}
          style={{ alignSelf: 'flex-start' }}
          leftSection={<IconPlus />}
        >
          Add Custom Benchmark
        </CustomButtonLink>
      </Stack>
      <Group style={{ alignSelf: 'flex-end' }}>
        <CustomButtonLink
          to="/create-portfolio/$portfolioId/submit"
          params={{ portfolioId }}
          variant="outline"
        >
          Previous
        </CustomButtonLink>
        <CustomButtonLink to="/create-portfolio/$portfolioId/submit" params={{ portfolioId }}>
          Next
        </CustomButtonLink>
      </Group>
    </Stack>
  );
}
