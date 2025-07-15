import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Center, Stack } from '@mantine/core';

export const Route = createFileRoute('/(app)/portfolio/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Center>
      <Stack w="70%">
        <Outlet />
      </Stack>
    </Center>
  );
}
