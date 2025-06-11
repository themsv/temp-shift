import { Card, Text, Box, Anchor, Group, Stack } from '@mantine/core';
import { useIntl } from 'react-intl';

interface ResearchcardProps {
  title: string;
  description: string;
}

export const ResearchCard = ({ title, description }: ResearchcardProps) => {
  const { formatMessage } = useIntl();

  return (
    <Card withBorder p="sm" shadow="sm">
      <Stack gap="xs" m={0}>
        <Text fw={500} size="sm">
          {title}
        </Text>
        <Text size="xs">{description}</Text>
      </Stack>

      <Box mt="sm">
        <Group gap={12} wrap="wrap">
          <Anchor
            href="#"
            size="xs"
            c="#007859"
            underline="always"
            fw={400}
            style={{ cursor: 'pointer' }}
          >
            {formatMessage({ id: 'READ_MORE' })}
          </Anchor>

          <Anchor
            href="#"
            size="xs"
            c="#007859"
            underline="always"
            fw={400}
            style={{ cursor: 'pointer' }}
          >
            {formatMessage({ id: 'DOWNLOAD' })}
          </Anchor>
        </Group>
      </Box>
    </Card>
  );
};
