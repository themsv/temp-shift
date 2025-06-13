import { Card, Text, Anchor, Group, Stack } from '@mantine/core';
import { useIntl } from 'react-intl';

interface ArticleCardProps {
  title: string;
  description: string;
  showLinks?: boolean;
}

export const ArticleCard = ({ title, description, showLinks = false }: ArticleCardProps) => {
  const { formatMessage } = useIntl();

  return (
    <Card withBorder p="sm" shadow="sm" component={Stack} gap="md">
      <Stack gap="xs" m={0}>
        <Text fw={500} size="sm">
          {title}
        </Text>
        <Text size="xs">{description}</Text>
      </Stack>

      {showLinks && (
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
      )}
    </Card>
  );
};
