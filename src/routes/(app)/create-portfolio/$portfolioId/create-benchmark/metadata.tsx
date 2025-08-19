import { createFileRoute } from '@tanstack/react-router';
import { Group, Stack, Text, TextInput } from '@mantine/core';
import { Dropzone, MS_EXCEL_MIME_TYPE } from '@mantine/dropzone';
import { IconCloudUpload, IconX } from '@tabler/icons-react';
import { CustomButtonLink, CustomHeading } from '@app/ui-core/custom';

export const Route = createFileRoute(
  '/(app)/create-portfolio/$portfolioId/create-benchmark/metadata',
)({
  component: CustomBenchmark,
});

function CustomBenchmark() {
  const { portfolioId } = Route.useParams();

  return (
    <Stack h="80vh" justify="space-between">
      <Stack>
        <CustomHeading title="Create Custom Benchmark" description="Set up a Custom Benchmark" />
        <TextInput label="Benchmark Name" value="ASX 300" />
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
                .CSV or .XLS file size not more than 5MB
              </Text>
            </Stack>
          </Stack>
        </Dropzone>
      </Stack>
      <Group style={{ alignSelf: 'flex-end' }}>
        <CustomButtonLink
          to="/create-portfolio/$portfolioId/benchmark"
          params={{ portfolioId }}
          variant="outline"
        >
          Previous
        </CustomButtonLink>
        <CustomButtonLink
          to="/create-portfolio/$portfolioId/create-benchmark/corrections"
          params={{ portfolioId }}
        >
          Next
        </CustomButtonLink>
      </Group>
    </Stack>
  );
}
