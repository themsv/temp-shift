import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  ActionIcon,
  Badge,
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
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Dropzone, MS_EXCEL_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { IconChevronRight, IconX, IconCloudUpload } from '@tabler/icons-react';
import { currencyOptions, investmentOptions, strategyOptions } from '@app/consts/portfolio-create';
import { portfolioByIdQueryOptions } from '@app/data/api';
import { CustomButtonLink, CustomHeading } from '@app/ui-core/custom';

export const Route = createFileRoute('/(app)/create-portfolio/$portfolioId/submit')({
  component: SubmitPortfolio,
  loader: ({ context, params: { portfolioId } }) => {
    return context.queryClient.ensureQueryData(portfolioByIdQueryOptions(portfolioId));
  },
});

function SubmitPortfolio() {
  const [opened, { open, close }] = useDisclosure(false);

  const { portfolioId } = Route.useParams();
  const navigate = useNavigate();
  const { data: portfolioById } = useSuspenseQuery(portfolioByIdQueryOptions(portfolioId));

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: portfolioById,
  });

  return (
    <>
      <Stack>
        <CustomHeading
          title="Welcome to Style Counsel Tool"
          description="Please complete the sections highlighted in yellow to start the analysis"
        />
        <Group justify="space-between">
          <Group>
            <Title order={3}>{portfolioById.name}</Title>
            {portfolioById.isMultifund && <Badge>Multi-Fund</Badge>}
          </Group>
          <Button size="xs">Analyze Portfolio</Button>
        </Group>
        <SimpleGrid cols={{ md: 1, lg: 2 }}>
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
            {...form.getInputProps('investmentStyle')}
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

        {portfolioById.isMultifund ? (
          <ActionCard
            title="Configure Portfolio"
            description="Select the Portfolios to create a Multi-fund Portfolio"
            isRequired
            onClick={() =>
              void navigate({
                to: '/create-portfolio/$portfolioId/multi-fund',
                params: { portfolioId },
              })
            }
          />
        ) : (
          <>
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
              onClick={() =>
                void navigate({
                  to: '/create-portfolio/$portfolioId/benchmark',
                  params: { portfolioId },
                })
              }
            />
            <ActionCard
              title="Investable Universe"
              description="Define your Investable universe."
              isRequired={false}
              onClick={() =>
                void navigate({
                  to: '/create-portfolio/$portfolioId/universe',
                  params: { portfolioId },
                })
              }
            />
            <ActionCard
              title="Regime Region & Calculation Settings"
              description="Define your Calculation settings."
              isRequired={false}
              onClick={() =>
                void navigate({
                  to: '/create-portfolio/$portfolioId/calculations',
                  params: { portfolioId },
                })
              }
            />
          </>
        )}
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
              to="/create-portfolio/$portfolioId/corrections"
              params={{ portfolioId: portfolioId.toString() }}
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
