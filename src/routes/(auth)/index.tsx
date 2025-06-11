import { createFileRoute } from '@tanstack/react-router';
import { Center, SimpleGrid } from '@mantine/core';
import BrandPage from '../../components/signin/brandPage';
import SignInForm from '../../components/signin/signInForm';

export const Route = createFileRoute('/(auth)/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SimpleGrid cols={2} style={{ width: '100vw', height: '100vh' }}>
      <BrandPage />
      <Center>
        <SignInForm />
      </Center>
    </SimpleGrid>
  );
}
