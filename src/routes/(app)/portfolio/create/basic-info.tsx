import { createFileRoute } from '@tanstack/react-router';
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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { z } from 'zod/v4';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { CustomButtonLink } from '@app/ui-core/link-button';
import { currencyOptions, investmentOptions, strategyOptions } from '@app/consts/portfolio-create';

export const Route = createFileRoute('/(app)/portfolio/create/basic-info')({
  component: PortfolioInfo,
});

const schema = z.object({
  name: z.string().min(5, { message: 'Portfolio Name should have at least 5 letters' }),
  currency: z.enum(currencyOptions.map((_) => _.value)),
  strategy: z.enum(strategyOptions.map((_) => _.value)),
  style: z.enum(investmentOptions.map((_) => _.value)),
  description: z.string().optional(),
});

function PortfolioInfo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: 'Parag Parikh Flexi Cap Fund Direct Growth',
      currency: 'USD',
      strategy: 'Long',
      style: 'Growth',
      description:
        'Parag Parikh Flexi Cap Fund Direct-Growth is a Flexi Cap mutual fund scheme from Ppfas Mutual Fund. This fund has been in existence for 12 yrs 1 m, having been launched on 13/05/2013. Parag Parikh Flexi Cap Fund Direct-Growth has ₹1,03,868 Crores worth of assets under management (AUM) as on 31/03/2025 and is medium-sized fund of its category.',
    },
    validateInputOnBlur: true,
    validate: zod4Resolver(schema),
  });

  return (
    <Stack>
      <CustomHeading title="Portfolio Details" description="Set up your portfolio" />
      <SimpleGrid cols={2}>
        {/* TODO: Ideally this should undergo validation on blur */}
        <TextInput {...form.getInputProps('name')} label="Portfolio Name" required />
        <Select
          {...form.getInputProps('currency')}
          label="Currency"
          required
          data={currencyOptions}
        />
      </SimpleGrid>
      <SimpleGrid cols={2}>
        <Select
          {...form.getInputProps('strategy')}
          label="Strategy"
          required
          data={strategyOptions}
        />
        <Select
          {...form.getInputProps('style')}
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
        {/* TODO: useMutation hook with above info and get the interm/draft portfolioId, 
        use it as dynamic route till last step */}
        <CustomButtonLink
          to="/portfolio/create/$portfolioId/submit"
          params={{ portfolioId: '1234' }}
        >
          Next
        </CustomButtonLink>
      </Group>
    </Stack>
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
