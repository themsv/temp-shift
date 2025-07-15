import { createFileRoute, useParams } from '@tanstack/react-router';
import {
  ActionIcon,
  Button,
  Card,
  Group,
  Modal,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Dropzone, MS_EXCEL_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { IconChevronRight, IconX, IconCloudUpload } from '@tabler/icons-react';
import { currencyOptions, investmentOptions, strategyOptions } from '@app/consts/portfolio-create';
import { CustomButtonLink } from '@app/ui-core/link-button';
import { CustomHeading } from '../basic-info';

export const Route = createFileRoute('/(app)/portfolio/create/$portfolioId/submit')({
  component: SubmitPortfolio,
});

function SubmitPortfolio() {
  const [opened, { open, close }] = useDisclosure(false);
  const { portfolioId } = useParams({ strict: false });
  //TODO: prefetch or API call to get portfolio passing portfolioId
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
  });
  return (
    <>
      <Stack>
        <CustomHeading
          title="Welcome to Style Counsel Tool"
          description="Please complete the sections highlighted in yellow to start the analysis"
        />
        <SimpleGrid cols={2}>
          <TextInput {...form.getInputProps('name')} label="Portfolio Name" required readOnly />
          <Select
            {...form.getInputProps('currency')}
            label="Currency"
            required
            data={currencyOptions}
            readOnly
          />
        </SimpleGrid>
        <SimpleGrid cols={2}>
          <Select
            {...form.getInputProps('strategy')}
            label="Strategy"
            required
            data={strategyOptions}
            readOnly
          />
          <Select
            {...form.getInputProps('style')}
            label="Investment Style"
            required
            data={investmentOptions}
            readOnly
          />
        </SimpleGrid>
        <Textarea
          {...form.getInputProps('description')}
          label="Description"
          minRows={3}
          autosize
          readOnly
        />

        <ActionCard
          title="Upload Portfolio Holdings"
          description="Upload your portfolio by adding holdings and weights."
          isRequired
          onClick={open}
        />
        <ActionCard
          title="Select Base Benchmarks"
          description="Select a benchmark for analysis."
          isRequired
          onClick={() => {}}
        />
        <ActionCard
          title="Investable Universe"
          description="Define your Investable universe."
          isRequired={false}
          onClick={() => {}}
        />
        <ActionCard
          title="Regime Region & Calculation Settings"
          description="Define your Calculation settings."
          isRequired={false}
          onClick={() => {}}
        />
      </Stack>

      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <Stack gap="sm">
          <Dropzone
            onDrop={(files) => {
              console.log('accepted files', files);
            }}
            onReject={(files) => {
              console.log('rejected files', files);
            }}
            maxSize={5 * 1024 ** 2} //5MB
            accept={MS_EXCEL_MIME_TYPE}
          >
            <Stack align="center" style={{ pointerEvents: 'none' }}>
              <div>
                <Dropzone.Accept>
                  <IconCloudUpload size={48} color="var(--mantine-color-skyblue-5)" stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX size={48} color="var(--mantine-color-red-6)" stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconCloudUpload color="var(--mantine-color-skyblue-5)" size={48} stroke={1.5} />
                </Dropzone.Idle>
              </div>

              <Stack gap="sm" align="center">
                <Text size="xl" inline>
                  Select a file or drag & drop here
                </Text>
                <Text size="sm" c="dimmed">
                  .CSV or .XLS file size not more than 5mb
                </Text>
              </Stack>
            </Stack>
          </Dropzone>

          <Group justify="flex-end">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <CustomButtonLink
              to="/portfolio/create/$portfolioId/corrections"
              //TODO: Validate portfolioId + prefetch portfolio data using portfolioId
              params={{ portfolioId: portfolioId?.toString() }}
            >
              Next
            </CustomButtonLink>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}

type ActionCardProps = {
  title: string;
  description: string;
  onClick: () => void;
  isRequired: boolean;
};
function ActionCard({ title, description, onClick, isRequired }: ActionCardProps) {
  return (
    <Card
      withBorder
      bg={isRequired ? 'yellow.1' : 'none'}
      p="sm"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <Group justify="space-between">
        <Stack gap="xs">
          <Text size="lg">
            {title}
            {isRequired && '*'}
          </Text>
          <Text>{description}</Text>
        </Stack>
        <ActionIcon variant="transparent">
          <IconChevronRight />
        </ActionIcon>
      </Group>
    </Card>
  );
}
