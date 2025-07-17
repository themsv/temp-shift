import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Text,
  Stack,
  Group,
  Divider,
  useMantineTheme,
  SimpleGrid,
  TextInput,
  Select,
  Textarea,
  SegmentedControl,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { z } from 'zod/v4';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { CustomButtonLink } from '@app/ui-core/link-button';
import { currencyOptions, investmentOptions, strategyOptions } from '@app/consts/portfolio-create';
import { useCreateDraftPortfolio } from '@app/data/api';
import type { BasicPortfolioPayload } from '@app/data/types/portfolio';

export const Route = createFileRoute('/(app)/portfolio/create/basic-info')({
  component: PortfolioInfo,
});

const schema = z.object({
  isMultifund: z.boolean(),
  name: z.string().min(5, { message: 'Portfolio Name should have at least 5 letters' }),
  currency: z.enum(currencyOptions.map((_) => _.value)),
  strategy: z.enum(strategyOptions.map((_) => _.value)),
  investmentStyle: z.enum(investmentOptions.map((_) => _.value)),
  description: z.string().optional(),
});

const initialValues = {
  isMultifund: false,
  name: '',
  currency: '',
  strategy: '',
  investmentStyle: '',
  description: '',
};

function PortfolioInfo() {
  const { mutate } = useCreateDraftPortfolio();
  const navigate = useNavigate();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: initialValues,
    validateInputOnBlur: true,
    validate: zod4Resolver(schema),
  });

  const handleSubmit = (values: BasicPortfolioPayload) => {
    mutate(values, {
      onSuccess: (portfolio) => {
        void navigate({
          to: '/portfolio/create/$portfolioId/submit',
          params: { portfolioId: portfolio.id.toString() },
        });
      },
    });
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Group justify="space-between">
          <CustomHeading title="Portfolio Details" description="Set up your portfolio" />
          <SegmentedControl
            size="md"
            color="dark"
            data={[
              { value: 'single', label: 'Single Portfolio' },
              { value: 'multi', label: 'Multi-fund Portfolio' },
            ]}
            value={form.getValues().isMultifund ? 'multi' : 'single'}
            onChange={(value) => {
              form.setFieldValue('isMultifund', value === 'multi');
            }}
          />
        </Group>
        <SimpleGrid cols={{ sm: 1, md: 2 }}>
          {/* TODO: Ideally this should undergo validation on blur */}
          <TextInput {...form.getInputProps('name')} label="Portfolio Name" required />
          <Select
            {...form.getInputProps('currency')}
            label="Currency"
            required
            data={currencyOptions}
            searchable
          />
        </SimpleGrid>
        <SimpleGrid cols={{ sm: 1, md: 2 }}>
          <Select
            {...form.getInputProps('strategy')}
            label="Strategy"
            required
            data={strategyOptions}
          />
          <Select
            {...form.getInputProps('investmentStyle')}
            label="Investment Style"
            required
            data={investmentOptions}
          />
        </SimpleGrid>
        <Textarea {...form.getInputProps('description')} label="Description" minRows={3} autosize />
        <Group justify="flex-end">
          <CustomButtonLink to="/dashboard" variant="outline">
            Cancel
          </CustomButtonLink>
          <Button type="submit">Next</Button>
        </Group>
      </Stack>
    </form>
  );
}

type CustomHeadingProps = { title: string; description: string };

export function CustomHeading({ title, description }: CustomHeadingProps) {
  const { primaryColor } = useMantineTheme();
  return (
    <Group>
      <Divider size="lg" orientation="vertical" color={primaryColor} />
      <Stack gap={0}>
        <Text fw={700}>{title}</Text>
        <Text>{description}</Text>
      </Stack>
    </Group>
  );
}
