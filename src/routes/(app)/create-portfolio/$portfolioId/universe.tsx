import { createFileRoute } from '@tanstack/react-router';
import { Button, Drawer, Group, Select, Stack, Text, TextInput } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { CustomButtonLink, CustomHeading } from '@app/ui-core/custom';

export const Route = createFileRoute('/(app)/create-portfolio/$portfolioId/universe')({
  component: Universe,
});

function Universe() {
  const { portfolioId } = Route.useParams();
  const [opened, { close, open }] = useDisclosure();
  return (
    <Stack h="80vh" justify="space-between">
      <Stack>
        <CustomHeading
          title="Investable Universe"
          description={
            'By default all securities in the benchmark selected for analysis are considered as Investable Universe. Please select a custom universe if you would like to change the default'
          }
        />
        <Select />
        <Stack gap={0}>
          <Text>Default Inclusions*</Text>
          <Text>
            By default, all securities in the uploaded portfolio are considered part of the
            investable universe. Including any Off Benchmark Stocks
          </Text>
        </Stack>
        <Button
          style={{ alignSelf: 'flex-start' }}
          leftSection={<IconPlus size={18} />}
          onClick={open}
        >
          Add Custom Benchmark
        </Button>
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

      <Drawer opened={opened} onClose={close} position="right" withCloseButton={false}>
        <Stack>
          <Stack>
            <CustomHeading title="Add Custom Universe" description="Set up your universe" />
            <TextInput label="Name" required />
            <Select />
            <Select />
            <Select />
          </Stack>
        </Stack>
      </Drawer>
    </Stack>
  );
}
