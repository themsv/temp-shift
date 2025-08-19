import { createFileRoute } from '@tanstack/react-router';
import {
  Stack,
  Group,
  Select,
  type ComboboxItem,
  type ComboboxLikeRenderOptionInput,
  Checkbox,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { CustomHeading, CustomButtonLink } from '@app/ui-core/custom';

export const Route = createFileRoute('/(app)/create-portfolio/$portfolioId/benchmark')({
  component: Benchmark,
});

function Benchmark() {
  const { portfolioId } = Route.useParams();

  const renderOption = (item: ComboboxLikeRenderOptionInput<ComboboxItem>) => (
    <Checkbox label={item.option.label} checked={item.checked} size="sm" />
  );
  return (
    <Stack h="80vh" justify="space-between">
      <Stack>
        <CustomHeading title="Select Base Benchmarks" description="" />
        <Select
          placeholder="Search or Select Benchmarks"
          label="Benchmarks"
          data={data}
          required
          searchable
          renderOption={renderOption}
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

const data = [
  {
    group: 'MSCI',
    items: [
      { label: 'MSCI Worlds', value: 'msci-world' },
      { label: 'MSCI Emerging Markets (EM)', value: 'msci-em' },
      { label: 'MSCI 100', value: 'msci-100' },
      { label: 'MSCI Lorem Ipsum', value: 'msci-lorem' },
    ],
  },
  {
    group: 'ASX',
    items: [{ label: 'S&P/ASX 300', value: 'asx-300', disabled: true }],
  },
  {
    group: 'Custom',
    items: [
      { label: 'ASX Growth', value: 'asx-growth' },
      { label: 'S&P Growth', value: 'sp-growth' },
    ],
  },
];
