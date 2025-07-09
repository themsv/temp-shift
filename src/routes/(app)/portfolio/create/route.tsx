import { Center, Stack } from '@mantine/core';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/portfolio/create')({
  component: RouteComponent,
});

const STEPS = [
  { label: 'INFO', step: 1 },
  { label: 'HOLDINGS', step: 2 },
  { label: 'BENCHMARKS', step: 3 },
  { label: 'UNIVERSE', step: 4 },
  { label: 'REGIME', step: 5 },
];

function RouteComponent() {
  return (
    <Center>
      <Stack w="70%">
        <Outlet />
      </Stack>
    </Center>
  );
}
