import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router';
import { Breadcrumbs, Center, Stack, Text } from '@mantine/core';
import { CustomButtonLink } from '@app/ui-core/custom';

export const Route = createFileRoute('/(app)/create-portfolio')({
  component: CreatePortfolioRoute,
});

function CreatePortfolioRoute() {
  const {
    location: { pathname },
  } = useRouterState();

  const crumbs = findBreadcrumb(pathname);

  return (
    <Stack>
      {crumbs && (
        <Breadcrumbs>
          {crumbs.map((label) =>
            label === 'Dashboard' ? (
              <CustomButtonLink variant="white" p="0" key={label} to="/dashboard">
                <Text c="black">{label}</Text>
              </CustomButtonLink>
            ) : (
              <Text key={label}>{label}</Text>
            ),
          )}
        </Breadcrumbs>
      )}
      <Center>
        <Stack w="75%">
          <Outlet />
        </Stack>
      </Center>
    </Stack>
  );
}

const breadcrumbsMap = [
  {
    path: ['/create-portfolio/metadata', '/create-portfolio/:id/submit'],
    crumb: ['Dashboard', 'Create Portfolio'],
  },
  {
    path: ['/create-portfolio/:id/corrections', '/create-portfolio/:id/preview'],
    crumb: ['Dashboard', 'Create Portfolio', 'Portfolio Upload'],
  },
  {
    path: [
      '/create-portfolio/:id/benchmark',
      '/create-portfolio/:id/create-benchmark/metadata',
      '/create-portfolio/:id/create-benchmark/corrections',
      '/create-portfolio/:id/create-benchmark/preview',
    ],
    crumb: ['Dashboard', 'Create Portfolio', 'Benchmark'],
  },
  {
    path: ['/create-portfolio/:id/universe'],
    crumb: ['Dashboard', 'Create Portfolio', 'Investable Universe'],
  },
  {
    path: ['/create-portfolio/:id/calculations'],
    crumb: ['Dashboard', 'Create Portfolio', 'Regime Region & Calculation Settings'],
  },
];

// Convert path patterns to regex for matching dynamic IDs
const findBreadcrumb = (pathname: string) => {
  for (const entry of breadcrumbsMap) {
    for (const pattern of entry.path) {
      // Replace `:id` with a wildcard regex
      const regex = new RegExp('^' + pattern.replace(':id', '[^/]+') + '$');
      if (regex.test(pathname)) {
        return entry.crumb;
      }
    }
  }
  return null;
};
