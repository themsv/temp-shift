import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Button, Stack } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { CustomCombobox, CustomHeading } from '@app/ui-core/custom';
import BenchmarkData from '../../../../../mocks/benchmark-data.json';

export const Route = createFileRoute('/(app)/portfolio/create/$portfolioId/benchmark')({
  component: Benchmark,
});

function Benchmark() {
  const [selectedValues, setSelectedValues] = useState<string[]>([
    'msci-world',
    'msci-em',
    'msci-100',
    'asx-growth',
    'sp-growth',
  ]);

  return (
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
      <Button style={{ alignSelf: 'flex-start' }} leftSection={<IconPlus />}>
        Add Custom Benchmark
      </Button>
    </Stack>
  );
}
