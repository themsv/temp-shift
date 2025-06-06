import { Button, Group, Text } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Group>
      <Text>Hello</Text>
      <Button>Click</Button>
    </Group>
  );
}
