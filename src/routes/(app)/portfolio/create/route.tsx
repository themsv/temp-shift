import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Breadcrumbs, Center, Stack } from '@mantine/core';
import { CustomButtonLink } from '@app/ui-core/custom';

export const Route = createFileRoute('/(app)/portfolio/create')({
  component: RouteComponent,
});

//TODO: Use URL routes to dynamically construct the breadcrumbs
const items = [
  { id: 'dashboard', title: 'Dashboard', to: '/dashboard' },
  { id: 'create-portfolio', title: 'Create Portfolio', to: '' },
  { id: 'portfolio-upload', title: 'Portfolio Upload', to: '' },
  { id: 'benchmark', title: 'Benchmark', to: '' },
  { id: 'universe', title: 'Investable Universe', to: '' },
].map(({ id, title, to }) => (
  <CustomButtonLink to={to} key={id} size="xs" variant="white">
    {title}
  </CustomButtonLink>
));
function RouteComponent() {
  return (
    <Stack>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Center>
        <Stack w="70%">
          <Outlet />
        </Stack>
      </Center>
    </Stack>
  );
}
