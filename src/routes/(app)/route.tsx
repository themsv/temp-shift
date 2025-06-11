import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppShell } from '@mantine/core';

import SideNavbar from '../../components/app-layout/side-navbar';
import Header from '../../components/app-layout/header';

export const Route = createFileRoute('/(app)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppShell
      layout="alt"
      header={{ height: 64 }}
      navbar={{
        width: 64,
        breakpoint: 'xs',
      }}
      styles={{
        header: {
          borderBottom: '1px solid #000',
        },
        navbar: {
          background: '#000',
        },
      }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar>
        <SideNavbar />
      </AppShell.Navbar>

      <AppShell.Main
        m="xl"
        style={{
          backgroundImage: 'url(/background-pattern.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
