import { createLazyFileRoute } from '@tanstack/react-router';
import { Card, Stack, Text } from '@mantine/core';
import { IconHelp } from '@tabler/icons-react';

export const Route = createLazyFileRoute('/(app)/help')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack align="center" component={Card}>
      <Text>Under Construction</Text>
      <IconHelp size={68} />
      <Text>Welcome to Help Section. </Text>
    </Stack>
  );
}
