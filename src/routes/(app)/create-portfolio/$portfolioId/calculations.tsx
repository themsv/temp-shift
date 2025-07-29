import { createFileRoute } from '@tanstack/react-router';
import { Group, Select, Stack, Text } from '@mantine/core';
import { CustomButtonLink, CustomHeading } from '@app/ui-core/custom';

export const Route = createFileRoute('/(app)/create-portfolio/$portfolioId/calculations')({
  component: CalculationSettings,
});

function CalculationSettings() {
  const { portfolioId } = Route.useParams();
  return (
    <Stack h="80vh" justify="space-between">
      <Stack>
        <CustomHeading
          title="Regime Region & Calculation Settings"
          description="Please select your preferences"
        />
        <Select
          label="Regime Region Reference Universe"
          data={regionReference}
          defaultValue="default"
          required
        />
        <Text>
          By default, the Backtest Reference Universe is resolved automatically based on the
          constituents of the benchmark
        </Text>

        <Group>
          <Stack>
            <Text>Monthly Return Type</Text>
            <Text>Summary Return Static</Text>
          </Stack>
          <Stack>
            <Select
              data={[
                {
                  label: 'Equal Weighted',
                  value: 'equal',
                },
                {
                  label: 'Cap Weighted',
                  value: 'cap',
                },
                {
                  label: 'Combined Weighted',
                  value: 'combined',
                },
              ]}
              defaultValue="combined"
            />
            <Select
              data={[
                {
                  label: 'Average',
                  value: 'average',
                },
                {
                  label: 'Median',
                  value: 'median',
                },
              ]}
              defaultValue="median"
            />
          </Stack>
        </Group>
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

const regionReference = [
  { label: 'Default', value: 'default' },
  { label: 'Small Ordinaries', value: 'small_ordinaries' },
  { label: 'MSCI World', value: 'msci_world' },
  { label: 'MSCI NAM', value: 'msci_nam' },
  { label: 'MSCI Europe', value: 'msci_europe' },
  { label: 'FTSE 350', value: 'ftse_350' },
  { label: 'Topix 500', value: 'topix_500' },
  { label: 'MSCI AC AxJ', value: 'msci_ac_axj' },
  { label: 'MSCI AC AxJ ex CN', value: 'msci_ac_axj_ex_cn' },
  { label: 'MSCI EM', value: 'msci_em' },
  { label: 'S&P BMI Korea', value: 'snp_bmi_korea' },
  { label: 'Macq China Board', value: 'macq_china_board' },
  { label: 'MSCI CNX-BSE India', value: 'msci_cnx_bse_india' },
];
